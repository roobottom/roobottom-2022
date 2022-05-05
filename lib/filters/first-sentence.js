module.exports = html => {
  var regexp = RegExp(/^.*?[.!?](?:\s|$)(?!.*\))/, 'm')
  return (regexp.exec(html) === null) ? html : regexp.exec(html)[0]
}