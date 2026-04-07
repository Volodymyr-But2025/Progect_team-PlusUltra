import { initcategories, initFurnitureList } from './js/render';
import { initAccordion } from './js/modules';

import { initCategoryClickHandler, initHeaderMenuHandler } from './js/hendlers';
import { getFurnitures } from './js/api';

import { initCategoryClickHandler, initLoadMoreHandler } from './js/hendlers'; // перевірити


document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');

  // Викликаємо ініціалізацію акордеона
  initAccordion();
  initcategories();
  initCategoryClickHandler();
  initLoadMoreHandler();
  initFurnitureList();
  initHeaderMenuHandler();
  // Сюди ж потім додаси інші модулі:
});

// const data = await getFurnitures();
// console.log(data);
