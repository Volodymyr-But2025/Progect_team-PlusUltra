import Accordion from 'accordion-js';
// import 'accordion-js/dist/accordion.min.css'; // Не забудь імпортувати стилі бібліотеки тут

export function initAccordion() {
  const container = document.querySelector('.accordion');

  // Перевірка, щоб скрипт не падав, якщо акордеона немає на конкретній сторінці
  if (container) {
    new Accordion(container, {
      duration: 300,
      showMultiple: false,
      collapse: true,
    });
  }
}
