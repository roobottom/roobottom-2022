const _ = require('lodash')
const site_url = 'https://roobottom.com'

class Feed {
  data() {
    return {
      eleventyExcludeFromCollections: true,
      permalink: "/feed.json",
    }
  }

  render({ collections: { diary, articles }, global: global }) {
    const allItems = [
      ...diary,
      ...articles
    ]
    const items = _.orderBy(allItems, 'date', 'desc').slice(0, 50)
    const feed = {
      version: 'https://jsonfeed.org/version/1.1',
      title: 'Jon’s website',
      description: 'My website, which is probably of little interest to anyone.',
      home_page_url: `${site_url}/`,
      feed_url: `${site_url}/feed.json`,
      icon: `${site_url}/assets/images/appicon.png`,
      language: 'en-GB',
      authors: [{
        name: 'Jon Roobottom',
        url: `${site_url}/`,
        avatar: `${site_url}/assets/images/appicon.png`,
      }],
      items: []
    }

    for (let item of items) {

      let content = item.templateContent
      //in post images
      if (item.data.photo) {
        for (let photo of item.data.photo) {
          content = content + `<figure><img src="${site_url}${photo.url}"></figure>`
        }
      }

      let cover
      if (item.data.cover) {
        cover = site_url + item.data.cover
      }
      else if (item.data.photo) {
        cover = site_url + item.data.photo[0].url
      }
      else {
        cover = ''
      }

      feed.items.push({
        id: item.url,
        url: `https://roobottom.com${item.url}`,
        content_html: content,
        date_published: item.date,
        image: cover
      })
    }

    return JSON.stringify(feed, null, 2)
  }
}

module.exports = Feed
