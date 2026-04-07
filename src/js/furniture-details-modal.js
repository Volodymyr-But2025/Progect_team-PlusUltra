import { getFurnitureById } from './api';
import { openOrderModal, setSelectedProduct } from './order-modal';
import { lockBodyScroll, unlockBodyScroll } from './scroll-lock';

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

const STAR_PATH =
  'M8.688 19.097l-1.987 8.603c-0.062 0.261-0.043 0.533 0.053 0.783s0.265 0.465 0.485 0.617c0.22 0.152 0.481 0.235 0.749 0.236s0.53-0.078 0.752-0.227l7.26-4.84 7.26 4.84c0.227 0.151 0.495 0.228 0.768 0.222s0.537-0.095 0.757-0.256c0.22-0.161 0.386-0.385 0.475-0.642s0.097-0.536 0.023-0.799l-2.439-8.533 6.048-5.443c0.194-0.174 0.332-0.402 0.398-0.654s0.056-0.518-0.027-0.765-0.238-0.464-0.444-0.624c-0.206-0.16-0.454-0.256-0.714-0.277l-7.601-0.605-3.289-7.281c-0.105-0.234-0.275-0.434-0.491-0.573s-0.467-0.214-0.724-0.214c-0.257 0-0.508 0.074-0.724 0.214s-0.386 0.339-0.491 0.573l-3.289 7.281-7.601 0.604c-0.255 0.020-0.5 0.114-0.703 0.269s-0.358 0.366-0.445 0.607c-0.087 0.241-0.103 0.502-0.046 0.752s0.185 0.478 0.369 0.656l5.619 5.476zM12.492 13.329c0.238-0.019 0.467-0.101 0.662-0.239s0.35-0.325 0.448-0.543l2.399-5.308 2.399 5.308c0.098 0.218 0.252 0.405 0.448 0.543s0.424 0.22 0.662 0.239l5.296 0.42-4.361 3.925c-0.379 0.341-0.529 0.867-0.391 1.357l1.671 5.847-4.981-3.321c-0.219-0.147-0.476-0.225-0.739-0.225s-0.521 0.078-0.739 0.225l-5.205 3.471 1.4-6.061c0.051-0.223 0.044-0.455-0.020-0.675s-0.184-0.419-0.348-0.579l-4.051-3.949 5.453-0.435z';

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

function createRatingMarkup(rate = 0) {
  const roundedRate = Math.round(rate);

  return Array.from({ length: 5 }, (_, index) => {
    const isFilled = index < roundedRate;

    return `
      <svg viewBox="0 0 32 32" class="${isFilled ? 'star-filled' : 'star-empty'}">
        <path
          d="${STAR_PATH}"
          ${isFilled ? 'fill="currentColor"' : 'fill="none" stroke="currentColor" stroke-width="2"'}
        ></path>
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

  mainImage.src = src;
  mainImage.alt = alt;
}

function createThumbnailsMarkup(images = [], name = '') {
  return images
    .slice(1)
    .map(
      (image, index) => `
        <button type="button" class="product-modal__thumb" data-image="${image}">
          <img src="${image}" alt="${name} ${index + 2}" />
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
    console.error('Fetch furniture error:', error);
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
