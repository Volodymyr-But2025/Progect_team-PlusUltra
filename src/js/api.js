import axios from 'axios';
import iziToast from 'izitoast';
import { refs } from './refs';

const categoriesUrl = 'https://furniture-store-v2.b.goit.study/api/categories';
const furnituresUrl = 'https://furniture-store-v2.b.goit.study/api/furnitures';
const feedbackUrl = 'https://furniture-store-v2.b.goit.study/api/feedbacks';

export async function getCategories() {
  showLoaderCategory();
  try {
    const { data } = await axios.get(categoriesUrl);
    hideLoaderCategory();
    return data;
  } catch (error) {
    // console.error('Error fetching categories:', error);
    hideLoaderCategory();
    iziToast.show({
      message: `Error fetching categories: ${error}`,
      color: 'red',
      position: 'topCenter',
    });
    return [];
  }
}

export async function getFurnitures({
  page = 1,
  limit = 8,
  category = '',
} = {}) {
  try {
    const { data } = await axios.get(furnituresUrl, {
      params: {
        page,
        limit,
        ...(category ? { category } : {}),
      },
    });

    return data;
  } catch (error) {
    iziToast.show({
      message: `Error fetching categories: ${error}`,
      color: 'red',
      position: 'topCenter',
    });
  }
}

export async function getFurnitureById(id) {
  try {
    const { data } = await axios.get(`${furnituresUrl}/${id}`);
    return data;
  } catch (error) {
    iziToast.show({
      message: `Error fetching furniture by ID: ${error}`,
      color: 'red',
      position: 'topCenter',
    });
  }
}

export async function getFeedbacks() {
  const { data } = await axios.get(feedbackUrl, {
    params: {
      page: 1,
      limit: 10,
    },
  });
  return data;
}

export function showLoaderCategory() {
  return refs.loaderCategory.classList.add('loader');
}

export function hideLoaderCategory() {
  return refs.loaderCategory.classList.remove('loader');
}
