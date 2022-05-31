const _ = require('lodash')

class Tags {
  
  data() {
    return {
      eleventyExcludeFromCollections: true,
      permalink: "/subjects.json",
    }
  }

  render({ collections: {tags} }) {
    const tagNames = tags.map(tag => tag.title)
    return JSON.stringify(_.sortedUniq(tagNames))
  }
 
}

module.exports = Tags