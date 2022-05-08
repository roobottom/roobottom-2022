const _ = require('lodash')
const RSS = require('rss')
const formatDate = require('../lib/filters/date.js')
const transform = require('../lib/shortcodes/transforms.js')
const site_url = process.env.SITE_URL

class Feed {
  data() {
    return {
      eleventyExcludeFromCollections: true,
      permalink: "/feed.xml",
    }
  }

  render({ collections: { diary, articles }, global: global }) {
    const allItems = [
      ...diary,
      ...articles
    ]
    const items = _.orderBy(allItems, 'date', 'desc').slice(0, 50)
    const feed = new RSS({
      title: 'Jon’s website',
      description: 'My website, which is probably of little interest to anyone.',
      feed_url: `${site_url}/feed.xml`,
      site_url: `${site_url}/`,
      image_url: `${site_url}/assets/images/appicon.png`,
      language: 'en-gb',
      pubDate: formatDate(items[0].date, 'ddd, DD MMM YYYY HH:mm:ss ZZ'),
      copyright: 'Jon J Roobottom'
    })

    for (let item of items) {

      let postImages = ''
      if (item.data.photo) {
        for (let photo of item.data.photo) {
          postImages += `<figure><img src="${transform(photo.url, 'rss')}"></figure>`
        }
      }

      feed.item({
        title: item.data.title,
        description: item.templateContent + postImages,
        guid: formatDate(item.date, 'YYYY-MM-DD-') + item.fileSlug,
        date: formatDate(item.date, 'ddd, DD MMM YYYY HH:mm:ss ZZ')
      })
    }

    return feed.xml({ indent: true })
  }
}

module.exports = Feed
