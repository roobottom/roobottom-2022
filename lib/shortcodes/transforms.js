const transforms = {
  default: '?tr=w-780',
  wide: '?tr=w-1200',
  card: '?tr=w-420,h-420,fo-auto'
}
module.exports = function(url, transform, server=process.env.IMG_SERVER) {
  return server + url + transforms[transform]
}