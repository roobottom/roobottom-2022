const smartypants = require('smartypants')
const date = require('../../lib/filters/date.js')
const transforms = require('../../lib/shortcodes/transforms.js')

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
    },
    og: data => {
      return {
        type: 'article',
        url: process.env.SITE_URL + data.page.url,
        description: `A diary entry I posted on ${date(data.date, 'dddd D MMMM YYYY [at] h:mm a')}`,
        image: {
          url: data.photo === undefined ? `https://ik.imagekit.io/roobottom/tr:ot-${encodeURIComponent(data.title.substring(0, 26))},otc-FFFFFF,otw-1280,ots-180,otf-Bely.ttf/og-backgrond.png` : transforms(data.photo[0].url, 'og'),
          alt: data.photo === undefined ? `The words “${data.title.substring(0, 26)}” on a orange background` : data.photo[0].alt
        },
        date: date(data.date, 'YYYY-MM-DD[T]hh:mm:ss.SSS[Z]')
      }
    }
  }
}