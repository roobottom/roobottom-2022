const smartypants = require('smartypants')
const date = require('../../lib/filters/date.js')

module.exports = {
  layout: 'article.njk',
  section_id: 'diary',
  eleventyComputed: {
    title: data => { 
      return data.summary === undefined || data.summary === '' ? `Diary entry for ${date(data.date)}` : smartypants.smartypants(data.summary, 1)
    }
  }
}