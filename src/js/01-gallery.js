// Add imports above this line
import * as basicLightbox from 'basiclightbox';
import { galleryItems } from './gallery-items';

const galleryContainer = document.querySelector('.gallery');

const imgMarkup = createGalleryMarkup(galleryItems);
galleryContainer.insertAdjacentHTML('afterbegin', imgMarkup);

galleryContainer.addEventListener('click', onImgClick);

function createGalleryMarkup(items) {
  return items
    .map(
      ({ preview, original, description }) => `
<a class="gallery__link" href="${original}">
<img
  class="gallery__image"
  src="${preview}"
  data-source="${original}"
  alt="${description}"
/>
</a>`
    )
    .join('');
}

function onImgClick(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') {
    return;
  }

  const instance = basicLightbox.create(`
      <img src="${e.target.dataset.source}" alt ="${e.target.description}" width="800" height="600">
  `);
  instance.show();

  galleryContainer.addEventListener('keydown', e => {
    if (e.code === 'Escape') return instance.close();
  });
}
