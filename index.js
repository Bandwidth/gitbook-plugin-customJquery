var cheerio = require('cheerio');
var fs = require('fs');
var url = require('url');
var path = require('path');

var urls = [];

module.exports = {
	// Map of hooks
	hooks: {

		"page": function (page) {

			if (this.output.name != 'website') return page;

			var lang = this.isLanguageBook() ? this.config.values.language : '';
			if (lang) lang = lang + '/';

			var outputUrl = this.output.toURL('_book/' + lang + page.path);

			urls.push({
				url: outputUrl + (outputUrl.substr(-5, 5) !== '.html' ? 'index.html' : '')
			});
			return page;

		},

		"finish" : function () {
			var modifyPage;
			var $, $el, html;
			var pathFile = this.options.pluginsConfig && this.options.pluginsConfig.customJquery && this.options.pluginsConfig.customJquery.js;
			var js = path.join(process.cwd(), pathFile);
			if (pathFile && fs.existsSync(pathFile)) {
				modifyPage = require(js);
			}
			else {
				modifyPage = function ($) {
					return $.html();
				}
			}

			urls.forEach(item => {
				html = fs.readFileSync(item.url, {encoding: 'utf-8'});
				$ = cheerio.load(html);
				var newPage = modifyPage($);
				fs.writeFileSync(item.url, newPage);
			});
		}

	},

	// Map of new blocks
	blocks: {},

	// Map of new filters
	filters: {}
};
