const attrs = require('./attrs.js')
const transforms = {
  default: '?tr=w-780',
  wide: '?tr=w-1200'
}

module.exports = function(url, attrsObj, transform="default") {
  return `<img src="${process.env.IMG_SERVER + url + transforms[transform]}" ${attrs(attrsObj)}>`
}