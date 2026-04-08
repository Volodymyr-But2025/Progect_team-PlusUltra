import { getFurnitureById } from './api';
import { openOrderModal, setSelectedProduct } from './order-modal';
import { lockBodyScroll, unlockBodyScroll } from './scroll-lock';
import iziToast from 'izitoast';

const productModal = document.querySelector('#productModal');
const closeBtn = document.querySelector('.product-modal__close');
const mainImage = document.querySelector('.product-modal__main-image');
const thumbnailsContainer = document.querySelector('.product-modal__thumbnails');
const titleEl = document.querySelector('.product-modal__title');
const categoryEl = document.querySelector('.product-modal__category');
const priceEl = document.querySelector('.product-modal__price');
const ratingEl = document.querySelector('.product-modal__rating');
const colorsListEl = document.querySelector('.product-modal__colors-list');
const descriptionEl = document.querySelector('.product-modal__description');
const sizeEl = document.querySelector('.product-modal__size');
const orderBtn = document.querySelector('.product-modal__btn');
let currentProduct = null;

function openProductModal() {
  const currentScrollY = window.scrollY;

  if (!productModal.open) {
    productModal.showModal();
  }

  window.scrollTo({
    top: currentScrollY,
    left: 0,
    behavior: 'auto',
  });

  closeBtn?.focus({ preventScroll: true });
  lockBodyScroll();
}

function closeProductModal() {
  if (productModal.open) {
    productModal.close();
  }

  unlockBodyScroll();
}

function roundRating(rate = 0) {
  const fraction = rate % 1;
  const integer = Math.floor(rate);

  if (fraction >= 0.3 && fraction <= 0.7) return integer + 0.5;
  if (fraction >= 0.8) return integer + 1;
  if (fraction <= 0.2) return integer;

  return rate;
}

function createRatingMarkup(rate = 0) {
  const roundedRate = roundRating(rate);

  return Array.from({ length: 5 }, (_, index) => {
    const starNumber = index + 1;

    if (starNumber <= Math.floor(roundedRate)) {
      return `
        <svg class="icon-star star-filled" width="18" height="18" viewBox="0 0 34 32" aria-hidden="true">
          <use href="./star-rating.icons.svg#star-filled"></use>
        </svg>`;
    }

    if (starNumber - 0.5 === roundedRate) {
      return `
        <svg class="icon-star star-half" width="18" height="18" viewBox="0 0 34 32" aria-hidden="true">
          <use href="./star-rating.icons.svg#star-half"></use>
        </svg>`;
    }

    return `
      <svg class="icon-star star-empty" width="18" height="18" viewBox="0 0 34 32" aria-hidden="true">
        <use href="./star-rating.icons.svg#star-empty"></use>
      </svg>`;
  }).join('');
}

function createColorMarkup(colors = []) {
  return colors
    .map(
      (hex, index) => `
        <label class="color-option">
          <input type="radio" name="color" value="${hex}" ${index === 0 ? 'checked' : ''} />
          <span class="color-swatch" style="background-color: ${hex}"></span>
        </label>`
    )
    .join('');
}

function updateMainImage(src, alt) {
  if (!mainImage) return;

  mainImage.decoding = 'async';
  mainImage.src = src;
  mainImage.alt = alt;
}

function createThumbnailsMarkup(images = [], name = '') {
  return images
    .slice(1)
    .map(
      (image, index) => `
        <button type="button" class="product-modal__thumb" data-image="${image}">
          <img src="${image}" alt="${name} ${index + 2}" loading="lazy" decoding="async" />
        </button>`
    )
    .join('');
}

function renderProductModal(product) {
  const {
    name,
    description,
    images = [],
    rate = 0,
    price,
    sizes,
    color = [],
    type,
    category,
  } = product;

  const [firstImage = ''] = images;
  currentProduct = product;

  updateMainImage(firstImage, name);

  if (thumbnailsContainer) {
    thumbnailsContainer.innerHTML = createThumbnailsMarkup(images, name);
  }

  if (titleEl) titleEl.textContent = name;
  if (categoryEl) categoryEl.textContent = type || category?.name || '';
  if (priceEl) priceEl.textContent = `${price.toLocaleString()} грн`;
  if (ratingEl) {
    ratingEl.innerHTML = createRatingMarkup(rate);
    ratingEl.setAttribute('aria-label', `${rate} out of 5 stars`);
  }
  if (colorsListEl) colorsListEl.innerHTML = createColorMarkup(color);
  if (descriptionEl) descriptionEl.textContent = description;
  if (sizeEl) sizeEl.textContent = `Розмір: ${sizes}`;
}

function getSelectedColor() {
  const checkedColor = colorsListEl?.querySelector('input[name="color"]:checked');
  return checkedColor?.value || currentProduct?.color?.[0] || '#1212ca';
}

async function handleDetailsClick(event) {
  const detailsBtn = event.target.closest('.details-btn');

  if (!detailsBtn) return;

  const productId = detailsBtn.dataset.id;

  if (!productId) return;

  try {
    const product = await getFurnitureById(productId);
    renderProductModal(product);
    openProductModal();
  } catch (error) {
    // console.error('Fetch furniture error:', error);
    iziToast.show({
      message: `Error fetching furnitures: ${error}`,
        color: 'red',
       position: 'topCenter'
    });
  }
}

if (closeBtn) {
  closeBtn.addEventListener('click', closeProductModal);
}

if (productModal) {
  productModal.addEventListener('click', event => {
    if (event.target === productModal) {
      closeProductModal();
    }
  });

  productModal.addEventListener('cancel', event => {
    event.preventDefault();
    closeProductModal();
  });
}

if (thumbnailsContainer) {
  thumbnailsContainer.addEventListener('click', event => {
    const thumbBtn = event.target.closest('.product-modal__thumb');

    if (!thumbBtn || !mainImage) return;

    updateMainImage(
      thumbBtn.dataset.image,
      thumbBtn.querySelector('img')?.alt || mainImage.alt
    );
  });
}

document.addEventListener('click', handleDetailsClick);

if (orderBtn) {
  orderBtn.addEventListener('click', event => {
    event.preventDefault();

    if (!currentProduct) return;

    setSelectedProduct({
      modelId: currentProduct._id,
      color: getSelectedColor(),
    });

    openOrderModal();
    closeProductModal();
  });
}
