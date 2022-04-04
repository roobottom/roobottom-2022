const { marked } = require('marked')
/**
 * 
 * @param {String} title 
 * @param {Markdown} content - optional
 * @param {String} url
 * @param {String} cover - optional
 * @param {String} hlevel  
 */
module.exports = function (title, content, url, cover, hlevel = 'h2') {

  const coverInline = cover ? `style="--cover: url(${cover});"` : ''
  const noContentClass = content ? '' : 'card-no-content'
  const contentHtml = content ? `<div class="card-content">${marked.parse(content)}</div>` : ''

  return `
<article class="card ${noContentClass}">
  <header class="card-cover" ${coverInline}>
    <${hlevel} class="card-title"><a href="${url}">${title}</a></${hlevel}>
  </header>
  ${contentHtml}
</article>`
}
