require('dotenv').config()
const markdownIt = require("markdown-it")
const markdownItAttrs = require("markdown-it-attrs")
const markdownItAnchor = require("markdown-it-anchor")
const markdownItDiv = require("markdown-it-div")
const markdownItAbbr = require("markdown-it-abbr")
const markdownItFootnote = require("markdown-it-footnote")
const moment = require("moment")
const _ = require('lodash')

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
            .use(markdownItFootnote)

  //11ty md eleventyConfig
  eleventyConfig.setLibrary("md", md)

  //watch changes in library
  eleventyConfig.addWatchTarget("./lib/**/*.js")

  // copy static files
  eleventyConfig.addPassthroughCopy("./source/assets/fonts/**/*")
  eleventyConfig.addPassthroughCopy("./source/assets/images/**/*")

  //filters
  eleventyConfig.addFilter("date", require('./lib/filters/date.js'))
  eleventyConfig.addFilter("dateDiff", require('./lib/filters/date-diff.js'))
  eleventyConfig.addFilter("daysToPeriod", require('./lib/filters/days-to-period.js'))
  eleventyConfig.addFilter("plural", require('./lib/filters/plural.js'))
  eleventyConfig.addFilter("smartypants", require('./lib/filters/smartypants.js'))
  eleventyConfig.addFilter("firstSentence", require('./lib/filters/first-sentence.js'))
  eleventyConfig.addFilter("transform", require('./lib/filters/image-transform.js'))
  eleventyConfig.addFilter("numberToWords", require('./lib/filters/number-to-words.js'))
  eleventyConfig.addFilter("basename", require('./lib/filters/basename.js'))
  eleventyConfig.addFilter("similarPosts", require('./lib/filters/similar-posts.js'))
  eleventyConfig.addFilter("alphabetFromTags", require('./lib/filters/alphabet-from-tags.js'))

  //shortcodes (AKA components) used in Nunjucks and Markdown
  eleventyConfig.addShortcode("figure", require('./lib/shortcodes/figure.js'))
  eleventyConfig.addShortcode("img", require('./lib/shortcodes/img.js'))

  //collections
  eleventyConfig.addCollection("tags", require('./lib/collections/tags.js'))
  eleventyConfig.addCollection("articles", require('./lib/collections/articles.js'))
  eleventyConfig.addCollection("diary", require('./lib/collections/diary.js'))
  eleventyConfig.addCollection("posts", require('./lib/collections/posts.js')) //articles AND diary posts

  //archive helper collections
  eleventyConfig.addCollection("years", require('./lib/collections/years.js'))
  eleventyConfig.addCollection("stats", require('./lib/collections/stats.js'))

  //diary archives
  const makeDiaryArchive = (posts) => {
    
    //create a unique array of every possible month
    let allMonths = []
    for (let post of posts) {
      allMonths.push({
        id: moment(post.date).format('YYYY-MM'),
        year: moment(post.date).format('YYYY'),
        title: moment(post.date).format('MMMM YYYY'),
        posts: [],
        days: []
      })
    }
    let months = _.uniqBy(allMonths, 'id')

    //now populate the months with data
    for (let post of posts) {
      
      //find the target month for this post
      let targetMonth = _.find(months, obj => {
        return obj.id == moment(post.date).format('YYYY-MM')
      })
      targetMonth.posts.push(post)
      
      //is this day in the days array? if not, push it in!
      let dayId = moment(post.date).format('YYYY-MM-DD')
      if(targetMonth.days.indexOf(dayId) === -1) {
        targetMonth.days.push(dayId)
      }
    }

    //now enhance the months object
    for (let item of months) {
      item.count = item.posts.length
    }

    return months
  }

  eleventyConfig.addCollection("diaryArchive", collectionApi => {
    const diaryPosts = collectionApi.getFilteredByGlob("./source/diary/*.md").sort((a, b) => {
      return b.date - a.date
    })
    return makeDiaryArchive(diaryPosts)
  })

  return {
    templateFormats: ['njk','md','11ty.js'],
    markdownTemplateEngine: 'njk',
    dir: {
      input: "source",
      includes: "includes",
      layouts: "layouts",
      data: "data"
    }
  }
}