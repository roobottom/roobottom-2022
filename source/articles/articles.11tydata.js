const slugify = require('../../lib/filters/slugify.js')
const date = require('../../lib/filters/date.js')
const transforms = require('../../lib/shortcodes/transforms.js')
const firstSentence = require('../../lib/filters/first-sentence.js')

module.exports = {
  layout: 'article.njk',
  section_id: 'articles',
  permalink: data => `/articles/${date(data.date, 'YYYY-MM-DD')}-${slugify(data.title)}/`,
  breadcrumbs: [{
    title: 'Home',
    url: '/'
  }, {
    title: 'Articles',
    url: '/articles/'
  }],
  eleventyComputed: {
    og: data => {
      return {
        type: 'article',
        url: process.env.SITE_URL + data.page.url,
        description: data.summary === undefined ? firstSentence(data.title) : data.summary,
        image: {
          url: data.cover === undefined ? `https://ik.imagekit.io/roobottom/tr:ot-${encodeURIComponent(data.title.substring(0, 26))},otc-FFFFFF,otw-1280,ots-180,otf-Bely.ttf/og-backgrond.png` : transforms(process.env.SITE_URL + data.cover, 'og'),
          alt: data.coverAlt
        },
        date: date(data.date, 'YYYY-MM-DD[T]hh:mm:ss.SSS[Z]')
      }
    }
  }
}