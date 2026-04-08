import { getCategories, getFurnitures } from './api';
import { refs } from './refs';
import iziToast from 'izitoast';

const FURNITURE_PAGE_LIMIT = 8;
const furnitureState = {
  category: '',
  currentPage: 0,
  totalItems: 0,
  loadedItems: 0,
  isLoading: false,
};

const categoryClassMap = {
  "М'які меблі": 'soft-furniture',
  'Шафи та системи зберігання': 'storage-systems',
  'Ліжка та матраци': 'beds-mattresses',
  Столи: 'tables',
  'Стільці та табурети': 'chairs-stools',
  Кухні: 'kitchens',
  'Меблі для дитячої': 'kids-furniture',
  'Меблі для офісу': 'office-furniture',
  'Меблі для передпокою': 'hallway-furniture',
  'Меблі для ванної кімнати': 'bathroom-furniture',
  'Садові та вуличні меблі': 'garden-furniture',
  'Декор та аксесуари': 'decor-accessories',
};

function categoryTemplate({ _id, name }) {
  const categoryClass = categoryClassMap[name] || '';

  return `
    <li
      class="furniture-category__item ${categoryClass}"
      data-id="${_id}"
    >
      <a href="#" class="furniture-category__link">${name}</a>
    </li>`;
}

function categoriesTemplate(categories) {
  return categories.map(categoryTemplate).join('');
}

export function renderGallery(categories) {
  if (!refs.furnitureCategoryList) {
    console.error('Елемент .furniture-category__list не знайдено!');
    return;
  }

  const markup = categoriesTemplate(categories);
  refs.furnitureCategoryList.insertAdjacentHTML('beforeend', markup);
}

export async function initcategories() {
  const categories = await getCategories();

  if (categories.length > 0) {
    renderGallery(categories);
  }
}

function furnitureTemplate({ _id, name, price, images, color }) {
  const colorsMarkup = color
    .map(hex => `<span class="color-dot" style="background-color: ${hex}"></span>`)
    .join('');

  return `
    <li class="furniture-card" data-id="${_id}">
      <img
        src="${images[0]}"
        alt="${name}"
        class="card-image"
        loading="lazy"
        decoding="async"
      />
      <h2 class="card-title">${name}</h2>
      <div class="card-colors">
        ${colorsMarkup}
      </div>
      <p class="card-price">${price.toLocaleString()} грн</p>
      <button class="details-btn" type="button" data-id="${_id}">Детальніше</button>
    </li>`;
}

function furnitureListTemplate(furnitures) {
  return furnitures.map(furnitureTemplate).join('');
}

function scrollToFurnitureCategories() {
  refs.furnitureCategoryTitle?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}

function hasExpandableFurniture() {
  return furnitureState.totalItems > FURNITURE_PAGE_LIMIT;
}

function isCollapseState() {
  return (
    hasExpandableFurniture() &&
    furnitureState.loadedItems >= furnitureState.totalItems
  );
}

function setLoadMoreButtonState() {
  if (!refs.loadMoreBtn) return;

  if (furnitureState.isLoading) {
    refs.loadMoreBtn.disabled = true;
    refs.loadMoreBtn.textContent = 'Завантаження...';
    refs.loadMoreBtn.hidden = false;
    return;
  }

  refs.loadMoreBtn.hidden = false;
  refs.loadMoreBtn.textContent = isCollapseState()
    ? 'Згорнути'
    : 'Показати ще';
  refs.loadMoreBtn.disabled = !isCollapseState() && !hasExpandableFurniture();
}

export function renderFurnitureList(furnitures, shouldAppend = false) {
  if (!refs.furnitureList) {
    console.error('Елемент .furniture-list не знайдено!');
    return;
  }

  if (shouldAppend) {
    refs.furnitureList.insertAdjacentHTML(
      'beforeend',
      furnitureListTemplate(furnitures)
    );
    return;
  }

  refs.furnitureList.innerHTML = furnitureListTemplate(furnitures);
}

async function loadFurniturePage({
  category = furnitureState.category,
  reset = false,
} = {}) {
  if (furnitureState.isLoading) {
    return [];
  }

  if (reset) {
    furnitureState.category = category;
    furnitureState.currentPage = 0;
    furnitureState.totalItems = 0;
    furnitureState.loadedItems = 0;
  }

  furnitureState.isLoading = true;
  setLoadMoreButtonState();

  try {
    const nextPage = furnitureState.currentPage + 1;
    const { furnitures = [], totalItems = 0 } = await getFurnitures({
      page: nextPage,
      limit: FURNITURE_PAGE_LIMIT,
      ...(category ? { category } : {}),
    });

    furnitureState.category = category;
    furnitureState.currentPage = nextPage;
    furnitureState.totalItems = totalItems;
    furnitureState.loadedItems = reset
      ? furnitures.length
      : furnitureState.loadedItems + furnitures.length;

    if (furnitures.length > 0) {
      renderFurnitureList(furnitures, !reset);
    } else if (reset && refs.furnitureList) {
      refs.furnitureList.innerHTML = '';
    }

    return furnitures;
  } catch (error) {
    iziToast.show({
      message: `Error fetching furnitures: ${error}`,
        color: 'red',
       position: 'topCenter'
    });
    // console.error('Error fetching furnitures:', error);
    return [];
  } finally {
    furnitureState.isLoading = false;
    setLoadMoreButtonState();
  }
}

export async function initFurnitureList(options = {}) {
  const category = options.category ?? '';
  return loadFurniturePage({ category, reset: true });
}

export async function loadMoreFurniture() {
  if (refs.loadMoreBtn?.disabled || furnitureState.isLoading) {
    return [];
  }

  if (isCollapseState()) {
    const results = await initFurnitureList({ category: furnitureState.category });
    scrollToFurnitureCategories();
    return results;
  }

  return loadFurniturePage();
}
