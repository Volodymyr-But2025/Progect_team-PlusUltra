import { initcategories, initFurnitureList } from './js/render';
import { initAccordion } from './js/modules';

import { initCategoryClickHandler, initHeaderMenuHandler, initLoadMoreHandler } from './js/hendlers';

function runWhenIdle(callback, timeout = 1500) {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(callback, { timeout });
    return;
  }

  window.setTimeout(callback, timeout);
}

function initDeferredFeedback() {
  const feedbackSection = document.querySelector('#feedback');

  if (!feedbackSection) return;

  let isLoaded = false;

  const loadFeedback = async () => {
    if (isLoaded) return;
    isLoaded = true;
    await import('./js/feedback.js');
  };

  if (!('IntersectionObserver' in window)) {
    runWhenIdle(loadFeedback, 2000);
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      const [entry] = entries;

      if (!entry?.isIntersecting) return;

      observer.disconnect();
      loadFeedback();
    },
    {
      rootMargin: '300px 0px',
    }
  );

  observer.observe(feedbackSection);
}

function initDeferredProductModal() {
  let isLoaded = false;

  const loadProductModal = async () => {
    if (isLoaded) return;
    isLoaded = true;
    await import('./js/furniture-details-modal.js');
  };

  runWhenIdle(loadProductModal, 1200);

  document.addEventListener(
    'pointerover',
    event => {
      if (!event.target.closest('.details-btn')) return;
      loadProductModal();
    },
    { once: true, passive: true }
  );

  document.addEventListener(
    'focusin',
    event => {
      if (!event.target.closest('.details-btn')) return;
      loadProductModal();
    },
    { once: true }
  );

  document.addEventListener(
    'click',
    async event => {
      const detailsButton = event.target.closest('.details-btn');

      if (!detailsButton || isLoaded) return;

      event.preventDefault();
      await loadProductModal();
      detailsButton.click();
    },
    true
  );
}




document.addEventListener('DOMContentLoaded', () => {

  // Викликаємо ініціалізацію акордеона
  initAccordion();
  initcategories();
  initCategoryClickHandler();
  initLoadMoreHandler();
  initFurnitureList();
  initHeaderMenuHandler();
  initDeferredFeedback();
  initDeferredProductModal();
  // Сюди ж потім додаси інші модулі:
});

