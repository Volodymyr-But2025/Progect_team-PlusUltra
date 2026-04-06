import { initFurnitureList } from './render';
import { refs } from './refs';
import { loadMoreFurniture } from './render';

export function initCategoryClickHandler() {
  if (!refs.furnitureCategoryList) return;

  refs.furnitureCategoryList.addEventListener('click', async event => {
    const clickedLink = event.target.closest('.furniture-category__link');
    const clickedItem = event.target.closest('.furniture-category__item');

    if (!clickedItem || !clickedLink) return;

    event.preventDefault();

    const allItems = refs.furnitureCategoryList.querySelectorAll(
      '.furniture-category__item'
    );
    allItems.forEach(item => item.classList.remove('akcent-item-color'));

    clickedItem.classList.add('akcent-item-color');

    const categoryId = clickedItem.dataset.id;

    if (!categoryId) {
      await initFurnitureList();
      return;
    }

    await initFurnitureList({ category: categoryId });
  });
}

export function initLoadMoreHandler() {
  if (!refs.loadMoreBtn) return;

  refs.loadMoreBtn.addEventListener('click', async () => {
    await loadMoreFurniture();
  });
}
