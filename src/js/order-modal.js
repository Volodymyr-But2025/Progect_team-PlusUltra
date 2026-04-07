import axios from "axios";
import iziToast from "izitoast";
import 'izitoast/dist/css/iziToast.min.css';

let formData = {};

const refs = {
  formEl: document.querySelector('.order-form'),
  backdropEl: document.querySelector('.order-backdrop'),
  closeBtn: document.querySelector('.modal-close-button'),
  nameInput: document.getElementById('name'),
  phoneInput: document.getElementById('phone'),
  orderBtn: document.querySelector('.order-button'),
};

refs.phoneInput.addEventListener('input', () => {
  let digits = refs.phoneInput.value.replace(/\D/g, '');

  if (digits.startsWith('0')) {
    digits = '38' + digits;
  } else if (digits.startsWith('8')) {
    digits = '3' + digits;
  }

  digits = digits.slice(0, 12);

  refs.phoneInput.value = digits;
  toggleOrderButtonState();
});

refs.nameInput.addEventListener('input', toggleOrderButtonState);

toggleOrderButtonState();

refs.closeBtn.addEventListener('click', closeOrderModal);

refs.backdropEl.addEventListener('click', e => {
  if (e.target === refs.backdropEl) {
    closeOrderModal();
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && refs.backdropEl.classList.contains('is-open')) {
    closeOrderModal();
  }
});

refs.formEl.addEventListener('submit', async e => {
  e.preventDefault();

    refs.nameInput.classList.remove('input-error');
    refs.phoneInput.classList.remove('input-error');

    
  const { name, phone, comment } = e.target.elements;

    if (name.value.length === 1) {
      refs.nameInput.classList.add('input-error');
    iziToast.show({
      message: `Ім'я має складатись мінімум з 2 символів!`,
        color: 'red',
       position: 'topCenter'
    });
      
      return
  }

    const validNumber = /^380\d{9}$/.test(phone.value);
    if (!validNumber) {
      refs.phoneInput.classList.add('input-error');
      iziToast.show({
        color: 'red',
          message: 'Введіть номер у форматі 380XXXXXXXXX',
      position: 'topCenter'
    });
    return;
  }
    
  const commentValue = commentValidator(comment.value);

  formData = {
    name: name.value,
    phone: phone.value,
    comment: commentValue,
    modelId: "682f9bbf8acbdf505592ac36",
    color: "#1212ca"
  };

  try {
    const response = await axios.post('https://furniture-store-v2.b.goit.study/api/orders', formData);
    const orderData = response.data;

    iziToast.show({
      message: `Ви замовили ${orderData.model}! 
    Номер вашого замовлення ${orderData.orderNum}. 
    Вже телефонуємно Вам!`,
        color: 'yellow',
       position: 'bottomCenter'
    });
      
    e.target.reset();
    toggleOrderButtonState();
    closeOrderModal();
  } catch (error) {
    console.log(error.message);
    iziToast.show({
      message: `некорректні дані, будь ласка, перевірте ім'я і номер телефону!`,
        color: 'red',
       position: 'topCenter'
    });
  }
});

function disableBodyScroll() {
  document.body.style.overflow = 'hidden';
}

function enableBodyScroll() {
  document.body.style.overflow = '';
}

export function openOrderModal() {
  refs.backdropEl.classList.add('is-open');
  disableBodyScroll();
}

function closeOrderModal() {
  refs.backdropEl.classList.remove('is-open');
  enableBodyScroll();
}

function toggleOrderButtonState() {
  const hasNameValue = refs.nameInput.value.trim() !== '';
  const hasPhoneValue = refs.phoneInput.value.trim() !== '';
  refs.nameInput.classList.remove('input-error');
  refs.phoneInput.classList.remove('input-error');
  refs.orderBtn.disabled = !(hasNameValue && hasPhoneValue);
}

function commentValidator(str) {
  if (str.length > 256) {
    return str.slice(0, 255);
  }

  while (str.length < 5) {
    str += ' ';
  }
  return str;
}
