const transforms = {
  default: '?tr=w-780',
  wide: '?tr=w-1200',
  card: '?tr=w-410,h-275,fo-auto',
  og: '?tr=w-1280,h-680,fo-auto',
  small: '?tr=w-100,h-100,fo-auto',
  rss: '?tr=w-500'
}
module.exports = function(url, transform, server=process.env.IMG_SERVER) {
  return server + url + transforms[transform]
}