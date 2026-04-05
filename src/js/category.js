import axios from 'axios';

const url = 'https://furniture-store-v2.b.goit.study/api/categories';

// 1. Отримуємо дані
export async function getCategories() {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

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
function categoryTemplate({ name }) {
  // Шукаємо клас у мапі, якщо не знайшли — залишаємо порожньо
  const categoryClass = categoryClassMap[name] || '';

  return `
    <li class="furniture-category__item ${categoryClass}">
      <a href="#" class="furniture-category__link">${name}</a>
    </li>`;
}

// 3. Функція створення всієї розмітки
function categoriesTemplate(categories) {
  return categories.map(categoryTemplate).join('');
}

// 4. Логіка рендеру
export function renderGallery(categories) {
  const ulGallery = document.querySelector('.furniture-category__list');

  if (!ulGallery) {
    console.error('Елемент .furniture-category__list не знайдено!');
    return;
  }

  const markup = categoriesTemplate(categories);
  ulGallery.insertAdjacentHTML('beforeend', markup); // Вставляємо розмітку в кінець списку
}

// 5. Запуск всього процесу
export async function initcategories() {
  const categories = await getCategories();
  if (categories.length > 0) {
    renderGallery(categories);
  }
}
