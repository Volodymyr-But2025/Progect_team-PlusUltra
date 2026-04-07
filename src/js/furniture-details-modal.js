const productModal = document.querySelector('#productModal');
const closeBtn = document.querySelector('.product-modal__close');
const testOpenBtn = document.querySelector('.js-test-open-modal');

function openProductModal() {
  productModal.showModal();
  document.body.classList.add('modal-open');
}

function closeProductModal() {
  productModal.close();
  document.body.classList.remove('modal-open');
}

if (testOpenBtn) {
  testOpenBtn.addEventListener('click', openProductModal);
}

closeBtn.addEventListener('click', closeProductModal);

productModal.addEventListener('click', event => {
  if (event.target === productModal) {
    closeProductModal();
  }
});

productModal.addEventListener('cancel', closeProductModal);

const BASE_URL = 'YOUR_WORKING_URL';

async function fetchFurnitureById(id) {
  try {
    const response = await fetch(`${BASE_URL}/furniture/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch furniture error:', error);
    return null;
  }
}
