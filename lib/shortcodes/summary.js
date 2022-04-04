const markdown = require('markdown-it')()
const formatDate = require('../filters/date.js')
const smartypants = require('../filters/smartypants.js')
/**
 * 
 * @param {String} url 
 * @param {String} title 
 * @param {Markdown} content - optional
 * @param {String} date - optional
 * @param {Object[]} meta - optional
 * @param {String} meta[].key
 * @param {String} meta[].value
 */
module.exports = function (url, title, content, date, meta) {

  const contentHtml = content ? `<div class="summary-content prose">${smartypants(markdown.render(content))}</div>` : ''
  const dateHtml = date ? `<time datetime="" class="summary-date">${formatDate(date)}</time>` : ''
  var metaHtml = ''
  if (meta) {
    for (let item of meta) {
      metaHtml = metaHtml + `<span class="summary-meta">${item.key}:${item.value}</span>`
    }
  }

  return `
<article class="summary">
  <header class="summary-title"><a href="${url}" class="summary-link">${title}</a></header>
    ${contentHtml}
  <footer class="summary-footer">
    ${dateHtml}
    ${metaHtml}
  </footer>
</article>`

}