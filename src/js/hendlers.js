import { refs } from './refs';

export function initCategoryClickHandler() {
  if (!refs.furnitureCategoryList) return;

  refs.furnitureCategoryList.addEventListener('click', event => {
    const clickedItem = event.target.closest('.furniture-category__item');
    if (!clickedItem) return;

    // Видаляємо клас з усіх елементів
    const allItems = refs.furnitureCategoryList.querySelectorAll(
      '.furniture-category__item'
    );
    allItems.forEach(item => item.classList.remove('akcent-item-color'));

    // Додаємо клас до клікнутого елемента
    clickedItem.classList.add('akcent-item-color');
  });
}
