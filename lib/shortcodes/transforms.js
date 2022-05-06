const transforms = {
  default: '?tr=w-780',
  wide: '?tr=w-1200',
  card: '?tr=w-420,h-420,fo-auto',
  og: '?tr=w-1280,h-680,fo-auto',
  small: '?tr-w100,h-100,fo-auto'
}
module.exports = function(url, transform, server=process.env.IMG_SERVER) {
  return server + url + transforms[transform]
}