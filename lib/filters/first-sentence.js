module.exports = html => {
  var regexp = RegExp(/(.*?)[\.!\?;]/, 'm')
  return (regexp.exec(html) === null) ? html : regexp.exec(html)[0]
}