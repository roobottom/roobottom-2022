const img = require('./img.js')
const attrs = require('./attrs.js')
const path = require('path')

module.exports = function(url, caption, classnames, link) {
  return `
<figure ${attrs({'class':classnames})}>
  ${link ? '<a href="' + link + '">' : ''}
  ${img(url,{
    id: path.basename(url, path.extname(url))
  },classnames)}
  ${link ? '</a>' : ''}
  ${figcaption(caption)}
</figure>
  `
}

const figcaption = (caption) => {
  return caption ? `<figcaption>${caption}</figcaption>` : ''
}