const filters = require("./utils/filters.js");
const transforms = require("./utils/transforms.js");
const collections = require("./utils/collections.js");
const { DateTime } = require("luxon");
const embedYouTube = require("eleventy-plugin-youtube-embed");

module.exports = function (eleventyConfig) {
	// integrate Alpine.js 
	eleventyConfig.addPassthroughCopy({
		"./node_modules/alpinejs/dist/alpine.js": "./js/alpine.js",
	});
	
	// excerpt extraction from content
	eleventyConfig.setFrontMatterParsingOptions({
		excerpt: true,
		excerpt_separator: "---",
		excerpt_alias: 'myExcerpt'
	});

	// Folders to copy to build dir (See. 1.1)
	eleventyConfig.addPassthroughCopy("src/static");
	eleventyConfig.addPlugin(embedYouTube);

	// Filters
	Object.keys(filters).forEach((filterName) => {
		eleventyConfig.addFilter(filterName, filters[filterName]);
	});

	eleventyConfig.addFilter("readableDate", dateObj => {
		return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("LLL dd, yyyy");
	 });
	eleventyConfig.addFilter("upcomingDate", dateObj => {
		return DateTime.fromISO(dateObj, {zone: 'utc'}).toFormat("ff");
	 });

	// Transforms
	Object.keys(transforms).forEach((transformName) => {
		eleventyConfig.addTransform(transformName, transforms[transformName]);
	});

	// Collections
	Object.keys(collections).forEach((collectionName) => {
		eleventyConfig.addCollection(collectionName, collections[collectionName]);
	});

	
	// This allows Eleventy to watch for file changes during local development.
	eleventyConfig.setUseGitIgnore(false);

	return {
		dir: {
			input: "src/",
			output: "dist",
			includes: "_includes",
			layouts: "_layouts",
		},
		templateFormats: ["html", "md", "njk"],
		htmlTemplateEngine: "njk",

		// 1.1 Enable eleventy to pass dirs specified above
		passthroughFileCopy: true,
	};
};
