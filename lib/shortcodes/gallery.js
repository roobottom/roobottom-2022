const img = require('./img.js')

/**
 * Renders a gallery element
 * @param {Object[]} images - The images that appear in this gallery
 * @param {String} images[].url - The url for an image
 * @param {String} [images[].alt] - The alt text for the image, optional
 * @param {String} [images[].frame] - A frame around the image - one of the following [laptop, phone, tablet], optional
 * @param {String} [caption] - The caption for the gallery, optional
 * @param {String} [layout] - One of the following [full, right, left, text], optional - although the default isn't pretty at the moment
 * @param {String} [style] - One of the following [shadow, stage], optional
 */
module.exports = function(images, caption, layout, style) {

  let styleClass = style ? `gallery--${style}` : ''
  let layoutClass = layout ? `gallery--${layout}` : ''

  let alignSingleImageRight = layout === 'right' ? 'max-bleed-left-s' : ''
  let alignSingleImageWithText = layout === 'text' ? 'max-bleed-right-xl' : ''
  let galleryOfImagesWithFramesClass = images[0].frame ? 'list--overlap' : ''
  let wrapperClassNames = images.length > 1 ? `gallery-images list list--grid-gallery ${galleryOfImagesWithFramesClass}` : `gallery-single-image ${alignSingleImageRight} ${alignSingleImageWithText}`

  const imagesHtml = (images) => {
    let html = ''
    for (let image of images) {
      let wrapperClass = image.frame ? `frame frame--${image.frame} list-item` : 'list-item'
      html = html + `<div class="${wrapperClass}">` + img(image.url, null, image.alt) + '</div>'
    }
    return html
  }

  const figcaptionHtml = caption ? `<figcaption class="gallery-caption">${caption}</figcaption>` : ''

  return `
<figure class="gallery ${styleClass} ${layoutClass}">
  <div class="${wrapperClassNames}">
    ${imagesHtml(images)}
  </div>
  ${figcaptionHtml}
</figure>
  `
}