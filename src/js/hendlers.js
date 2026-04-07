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

export function initHeaderMenuHandler() {
  if (!refs.header) return;

  const menuModal = refs.header.querySelector('.header_menu_svg');
  const xModal = refs.header.querySelector('.header_x_svg');
  const navList = refs.header.querySelector('.nav_list');
  const shopLink = refs.header.querySelector('.button_list_items a');
  const furnitureSection = document.querySelector('#furniture-category');

  if (!menuModal || !xModal || !navList) return;

  const closeMenu = () => {
    xModal.classList.add('hide');
    xModal.classList.remove('show');

    menuModal.classList.add('show');
    menuModal.classList.remove('hide');

    navList.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  };

  menuModal.addEventListener('click', () => {
    menuModal.classList.add('hide');
    menuModal.classList.remove('show');

    xModal.classList.add('show');
    xModal.classList.remove('hide');

    navList.classList.add('is-open');
    document.body.classList.add('menu-open');
  });

  xModal.addEventListener('click', closeMenu);

  navList.addEventListener('click', event => {
    if (event.target.closest('a')) {
      closeMenu();
    }
  });

  if (shopLink && furnitureSection) {
    shopLink.addEventListener('click', event => {
      event.preventDefault();
      furnitureSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }
}
