const smartypants = require('smartypants')
const date = require('../../lib/filters/date.js')

module.exports = {
  layout: 'diary-item.njk',
  section_id: 'diary',
  breadcrumbs: [{
      title: 'Home',
      url: '/'
    }, {
      title: 'Diary',
      url: '/diary/'
    }],
  eleventyComputed: {
    title: data => { 
      return data.summary === undefined || data.summary === '' ? `Diary entry for ${date(data.date)}` : smartypants.smartypants(data.summary, 1)
    }
  }
}