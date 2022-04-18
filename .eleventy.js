require('dotenv').config()
const markdownIt = require("markdown-it")
const markdownItAttrs = require("markdown-it-attrs")
const markdownItAnchor = require("markdown-it-anchor")
const markdownItDiv = require("markdown-it-div")
const markdownItAbbr = require("markdown-it-abbr")

module.exports = function(eleventyConfig) {
  eleventyConfig.setBrowserSyncConfig({
      files: './_site/css/**/*.css'
  })

  let mdOptions = {
    typographer: true,
    quotes: '“”‘’',
    html: true
  }
  let md =  markdownIt(mdOptions)
            .use(markdownItAttrs)
            .use(markdownItAnchor)
            .use(markdownItDiv)
            .use(markdownItAbbr)

  //11ty md eleventyConfig
  eleventyConfig.setLibrary("md", md)

  //watch changes in library
  eleventyConfig.addWatchTarget("./lib/**/*.js")

  // copy static files
  eleventyConfig.addPassthroughCopy("./source/assets/fonts/**/*")
  eleventyConfig.addPassthroughCopy("./source/assets/images/**/*")

  //filters
  eleventyConfig.addFilter("date", require('./lib/filters/date.js'))
  eleventyConfig.addFilter("slugify", require('./lib/filters/slugify.js'))
  eleventyConfig.addFilter("plural", require('./lib/filters/plural.js'))
  eleventyConfig.addFilter("smartypants", require('./lib/filters/smartypants.js'))
  eleventyConfig.addFilter("firstSentence", require('./lib/filters/first-sentence.js'))

  //shortcodes (AKA components)
  eleventyConfig.addShortcode("gallery", require('./lib/shortcodes/gallery.js'))
  eleventyConfig.addShortcode("outcomes", require('./lib/shortcodes/outcomes.js'))
  eleventyConfig.addShortcode("card", require('./lib/shortcodes/card.js'))
  eleventyConfig.addShortcode("quote", require('./lib/shortcodes/quote.js'))
  eleventyConfig.addShortcode("summary", require('./lib/shortcodes/summary.js'))
  eleventyConfig.addShortcode("figure", require('./lib/shortcodes/figure.js'))

  //collections
  eleventyConfig.addCollection("tags", require('./lib/collections/tags.js'))
  eleventyConfig.addCollection("articles", require('./lib/collections/articles.js'))
  eleventyConfig.addCollection("diary", require('./lib/collections/diary.js'))

  //archive helper collections
  eleventyConfig.addCollection("years", require('./lib/collections/years.js'))

  return {
    templateFormats: ['njk','md'],
    dir: {
      input: "source",
      includes: "includes",
      layouts: "layouts",
      data: "data"
    }
  }
}