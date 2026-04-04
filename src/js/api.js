import axios from 'axios';

const url = 'https://furniture-store-v2.b.goit.study/api/categories';

export async function getCategories() {
  const { data } = await axios.get(url);
  return data;
}
