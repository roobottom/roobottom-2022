/**
 * 
 * @param {String} content 
 * @param {String} author - optional
 * @param {String} position - optional
 */
module.exports = function (content, author, position) {
  const authorHtml = author ? `<strong>${author}</strong>` : ''
  const positionHtml =  position ? `, ${position}`: ''

  return `
<blockquote class="quote">
  <div class="quote-content">${content}</div>
  <cite class="quote-cite">${authorHtml}${positionHtml}</cite>
</blockquote>`
}