const attrs = require('./attrs.js')
const transforms = require('./transforms.js')

module.exports = function(url, attrsObj, transform="default") {
  return `<img src="${transforms(url, transform)}" ${attrs(attrsObj)} loading="lazy" decoding="async">`
}