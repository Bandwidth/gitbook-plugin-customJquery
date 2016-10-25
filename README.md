## customJquery
After each page is renedered, allows you to modify the raw HTML with jquery before serving.  Use this instead of running javascript on each page load to add/remove HTML for each page.

## Book.json

Require this by adding `customJquery@git+https://github.com/dtolb/gitbook-plugin-customJquery.git` to the plugins

customJquery requies a `.js` file to be passed as the object for `pluginsConfig`

```json
{
    "plugins": ["customJquery@git+https://github.com/dtolb/gitbook-plugin-customJquery.git" ],
    "pluginsConfig": {
      "customJquery": {
        "js": "js/custom.js"
      }
    }
}
```

## js file.

The `.js` file should export a single function. The plugin will call the function with `$` as the only parameter.
The `.js` file should return the renderened `$.html();` when complete

### Example `.js` file

```js
module.exports = function ($) {
	// Do jquery here
	return $.html();
}
```
