import { initcategories } from './js/category';
import { initAccordion } from './js/modules';

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');

  // Викликаємо ініціалізацію акордеона
  initAccordion();
  initcategories();
  // Сюди ж потім додаси інші модулі:
});
