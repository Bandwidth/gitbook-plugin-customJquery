var cheerio = require('cheerio');
var glob = require('glob');
var fs = require('fs');

var modifyPage = function (data) {
	var $ = cheerio.load(data);
	//console.log($.html());
	$('.articles li.chapter').each(function (i, elem) {
		var li = $(elem);
		if (li.text().indexOf('GET') > 0) {
			//console.log(li.children().first().html());
			var newTxt = li.children().first().html().replace("GET", "<code class=\"get\">GET</code>");
			li.children().first().html(newTxt);
		}
		else if (li.text().indexOf('POST') > 0) {
			//console.log(li.children().first().html());
			var newTxt = li.children().first().html().replace("POST", "<code class=\"post\">POST</code>");
			li.children().first().html(newTxt);
		}
		else if (li.text().indexOf('DELETE') > 0) {
			//console.log(li.children().first().html());
			var newTxt = li.children().first().html().replace("DELETE", "<code class=\"delete\">DELETE</code>");
			li.children().first().html(newTxt);
		}
		else if (li.text().indexOf('PUT') > 0) {
			//console.log(li.children().first().html());
			var newTxt = li.children().first().html().replace("PUT", "<code class=\"put\">PUT</code>");
			li.children().first().html(newTxt);
		}
	})
	return $.html();
}

module.exports = {
	// Map of hooks
	hooks: {
		"finish" : function () {
			glob("_book/*.html", function (err, files) {
				files.forEach(function (file) {
					fs.readFile(file, 'utf8', function (err, data) {
						if (err) throw err;
						var newPage = modifyPage(data);
						fs.writeFile(file, newPage, function (err) {
							if (err) throw err;
						})
					})
				})
			});
			glob("_book/methods/**/*.html", function (err, files) {
				files.forEach(function (file) {
					fs.readFile(file, 'utf8', function (err, data) {
						if (err) throw err;
						var newPage = modifyPage(data);
						fs.writeFile(file, newPage, function (err) {
							if (err) throw err;
						})
					})
				})
			})
		}

	},

	// Map of new blocks
	blocks: {},

	// Map of new filters
	filters: {}
};