class Tags {
  
  data() {
    return {
      eleventyExcludeFromCollections: true,
      permalink: "/subjects.json",
    }
  }

  render({ collections: {tags} }) {
    const tagNames = tags.map(tag => tag.title)
    return JSON.stringify(tagNames)
  }
 
}

module.exports = Tags