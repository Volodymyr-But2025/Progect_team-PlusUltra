<<<<<<< HEAD
import Accordion from 'accordion-js';
=======
import { initcategories } from './js/category';
import { initAccordion } from './js/modules';

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');

  // Викликаємо ініціалізацію акордеона
  initAccordion();
  initcategories();
  // Сюди ж потім додаси інші модулі:
});
>>>>>>> 54f760aa0064f976b0193835c2ef52d3f552b716
