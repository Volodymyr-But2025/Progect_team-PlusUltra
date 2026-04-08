import axios from 'axios';
import iziToast from 'izitoast';

const categoriesUrl = 'https://furniture-store-v2.b.goit.study/api/categories';
const furnituresUrl = 'https://furniture-store-v2.b.goit.study/api/furnitures';
const feedbackUrl = 'https://furniture-store-v2.b.goit.study/api/feedbacks';

export async function getCategories() {
  try {
    const { data } = await axios.get(categoriesUrl);
    return data;
  } catch (error) {
    // console.error('Error fetching categories:', error);
    iziToast.show({
      message: `Error fetching categories: ${error}`,
        color: 'red',
       position: 'topCenter'
    });
    return [];
  }
}

export async function getFurnitures({ page = 1, limit = 8, category = '' } = {}) {
  const { data } = await axios.get(furnituresUrl, {
    params: {
      page,
      limit,
      ...(category ? { category } : {}),
    },
  });

  return data;
}

export async function getFurnitureById(id) {
  const { data } = await axios.get(`${furnituresUrl}/${id}`);
  return data;
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
