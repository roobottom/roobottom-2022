const slugify = require('@sindresorhus/slugify')

class SiteMap {
  data() {
    return {
      eleventyExcludeFromCollections: true,
      permalink: function (data) {
        return data.global.sitemap
      },
    };
  }

  render({ collections: { articles, diary, tags }, global: { base_url } }) {
    const navigation = require('./data/navigation.js')['footer'].map(item => `${base_url}${item.url}`)
    const diaryPosts = diary.map(post => `${base_url}${post.url}/`)
    const articlePosts = articles.map(article => `${base_url}${article.url}/`)
    const subjects = tags.map(tag => `${base_url}/tags/${slugify(tag.title)}/`)
    const urls = [...navigation, ...diaryPosts, ...articlePosts, ...subjects]
    urls.sort()
    return urls.join("\n")
  }
}

module.exports = SiteMap