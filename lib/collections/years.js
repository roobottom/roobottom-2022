const moment = require('moment')
const _ = require('lodash')

const uniqueYearsInPosts = (posts) => {
  let years = []
  for (let post of posts) {
    years.push(moment(post.date).format('YYYY'))
  }
  return _.uniq(years)
}

module.exports = collectionApi => {

  const articlePosts = collectionApi.getFilteredByGlob("./source/articles/*.md").sort((a, b) => {
    return b.date - a.date
  })

  const diaryPosts = collectionApi.getFilteredByGlob("./source/diary/*.md").sort((a, b) => {
    return b.date - a.date
  })
  
  return {
    articles: uniqueYearsInPosts(articlePosts),
    diary: uniqueYearsInPosts(diaryPosts)
  }
  
}