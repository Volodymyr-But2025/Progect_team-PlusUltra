import { initcategories, initFurnitureList } from './js/render';
import { initAccordion } from './js/modules';
import { initCategoryClickHandler } from './js/hendlers';
import { getFurnitures } from './js/api';

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');

  // Викликаємо ініціалізацію акордеона
  initAccordion();
  initcategories();
  initCategoryClickHandler();
  initFurnitureList();
  // Сюди ж потім додаси інші модулі:
});

// const data = await getFurnitures();
// console.log(data);
