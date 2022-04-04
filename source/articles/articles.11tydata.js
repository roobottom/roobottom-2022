const slugify = require('../../lib/filters/slugify.js')
const date = require('../../lib/filters/date.js')

module.exports = {
  layout: 'article.njk',
  section_id: 'articles',
  permalink: data => `/articles/${date(data.date, 'YYYY-MM-DD')}-${slugify(data.title)}/`
}