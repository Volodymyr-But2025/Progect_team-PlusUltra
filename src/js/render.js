import { getCategories, getFurnitures } from './api';
import { refs } from './refs';

//#region render category
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

// 2. Шаблон для однієї картки
function categoryTemplate({ id, name }) {
  // Шукаємо клас у мапі, якщо не знайшли — залишаємо порожньо
  const categoryClass = categoryClassMap[name] || '';

  return `
    <li class="furniture-category__item ${categoryClass}" data-id="${id}">
      <a href="#" class="furniture-category__link">${name}</a>
    </li>`;
}

// 3. Функція створення всієї розмітки
function categoriesTemplate(categories) {
  return categories.map(categoryTemplate).join('');
}

// 4. Логіка рендеру
export function renderGallery(categories) {
  if (!refs.furnitureCategoryList) {
    console.error('Елемент .furniture-category__list не знайдено!');
    return;
  }

  const markup = categoriesTemplate(categories);
  refs.furnitureCategoryList.insertAdjacentHTML('beforeend', markup); // Вставляємо розмітку в кінець списку
}

// 5. Запуск всього процесу
export async function initcategories() {
  const categories = await getCategories();
  if (categories.length > 0) {
    renderGallery(categories);
  }
}
//#endregion render category

//#region render furniture list
// Темплейт для однієї картки меблів
function furnitureTemplate({ _id, name, price, images, color }) {
  // Рендеримо крапки кольорів динамічно
  const colorsMarkup = color
    .map(
      hex => `<span class="color-dot" style="background-color: ${hex}"></span>`
    )
    .join('');

  return `
    <li class="furniture-card" data-id="${_id}">
      <img
        src="${images[0]}" 
        alt="${name}"
        class="card-image"
        loading="lazy"
      />
      <h2 class="card-title">${name}</h2>
      <div class="card-colors">
        ${colorsMarkup}
      </div>
      <p class="card-price">${price.toLocaleString()} грн</p>
      <button class="details-btn" type="button" data-id="${_id}">Детальніше</button>
    </li>`;
}

// Функция створення всієї розмітки меблів
function furnitureListTemplate(furnitures) {
  return furnitures.map(furnitureTemplate).join('');
}

// Логіка рендеру меблів
export function renderFurnitureList(furnitures) {
  if (!refs.furnitureList) {
    console.error('Елемент .furniture-list не знайдено!');
    return;
  }

  const markup = furnitureListTemplate(furnitures);
  refs.furnitureList.insertAdjacentHTML('beforeend', markup);
}

// Запуск рендеру меблів
export async function initFurnitureList() {
  const results = await getFurnitures();
  if (results && results.length > 0) {
    renderFurnitureList(results);
  }
  console.log(results);
}
//#endregion render furniture list
