const { marked } = require('marked')
const transforms = require('./transforms.js')
/**
 * 
 * @param {String} title  - optional
 * @param {String} url - required
 * @param {String} cover - optional
 * @param {String} date - optional
 * @param {String} badge - optional
 * @param {String} hlevel  - optional, defaults to 'h2'
 */
module.exports = function (title, url, cover, date, badge, hlevel = 'h2') {

  const coverInline = cover ? `style="--cover: url(${transforms(cover, 'card')});"` : ''
  const dateHtml = date ? `<div class="card-date">${date}</div>` : ''
  const badgeHtml = badge ? `<div class="card-badge">${badge}</div>` : ''

  return `
<article class="card">
  <header class="card-cover" ${coverInline}>${badgeHtml}</header>
  <${hlevel} class="card-title"><a href="${url}" class="card-link">${title}</a></${hlevel}>
  ${dateHtml}
</article>`
}
