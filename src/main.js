import { initcategories, initFurnitureList } from './js/render';
import { initAccordion } from './js/modules';
import { initCategoryClickHandler, initHeaderMenuHandler, initLoadMoreHandler } from './js/hendlers';
import { initFeedbacks } from './js/feedback';




document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');

  // Викликаємо ініціалізацію акордеона
  initAccordion();
  initcategories();
  initCategoryClickHandler();
  initLoadMoreHandler();
  initFurnitureList();
  initHeaderMenuHandler();
  initFeedbacks();
  // Сюди ж потім додаси інші модулі:
});

// const data = await getFurnitures();
// console.log(data);
