const attrs = require('./attrs.js')

module.exports = function(url, attrsObj, alt) {
  return `<img src="${url}" ${attrs(attrsObj)} alt="${alt}">`
}