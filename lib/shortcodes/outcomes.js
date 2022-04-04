const { marked } = require('marked')
/**
 * 
 * @param {Object[]} outcomes - A number of outcomes
 * @param {String} outcomes[].title - The title of the outcome
 * @param {Markdown} outcomes[].content - The content of the outcome
 * @param {Markdown} footnote - The footnote, optional
 */
module.exports = function(outcomes, footnote) {
  
  const outcomesHtml = (outcomes) => {
    let html = ''
    for (let outcome of outcomes) {
      html = html + `
<div class="outcomes-content prose">
  <h3>${outcome.title}</h3>
  ${marked.parse(outcome.content)}
</div>`
    }
    return html
  }

  const footnoteHtml = footnote ? `<div class="outcomes-footnote">${marked.parse(footnote)}</div>` : ''

  return `
<div class="outcomes">
  <div class="outcomes-items">
    ${outcomesHtml(outcomes)}
  </div>
  ${footnoteHtml}
</div>`

}
