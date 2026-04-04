import Accordion from 'accordion-js';

document.addEventListener('DOMContentLoaded', () => {
  new Accordion('.accordion', {
    duration: 300,
    showMultiple: false,
    collapse: true,
  });
});
