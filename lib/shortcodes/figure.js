const img = require('./img.js')
const attrs = require('./attrs.js')

module.exports = function(url, caption, classnames, link) {
  return `
<figure ${attrs({'class':classnames})}>
  ${link ? '<a href="' + link + '">' : ''}
  ${img(url,{},classnames)}
  ${link ? '</a>' : ''}
  ${figcaption(caption)}
</figure>
  `
}

const figcaption = (caption) => {
  if(caption === undefined) return ''
  else return `<figcaption>${caption}</figcaption>`
}