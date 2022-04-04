module.exports = collectionApi => {
  return collectionApi.getFilteredByGlob("./source/diary/*.md")
    .sort((a, b) => {
      return b.date - a.date
    })
}