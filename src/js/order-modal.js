import axios from "axios"
import iziToast from "izitoast";
import 'izitoast/dist/css/iziToast.min.css';

let formData = {};

const refs = {
formEl: document.querySelector('.order-form'),
backdropEl:document.querySelector('.order-backdrop'),
closeBtn: document.querySelector('.modal-close-button'),
phoneInput: document.getElementById('phone'),
}

  refs.phoneInput.addEventListener('input', () => {
    let digits = refs.phoneInput.value.replace(/\D/g, '');

    if (digits.startsWith('0')) {
      digits = '38' + digits;
    } else if (digits.startsWith('8')) {
      digits = '3' + digits;
      }

    digits = digits.slice(0, 12);

      refs.phoneInput.value = digits;
  });


refs.closeBtn.addEventListener('click', closeOrderModal);

refs.backdropEl.addEventListener('click', (e) => {
  if (e.target === refs.backdropEl) {
    closeOrderModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && refs.backdropEl.classList.contains('is-open')) {
    closeOrderModal();
  }
});

refs.formEl.addEventListener('submit', async e => {
    e.preventDefault();
      
    const { name, phone, comment } = e.target.elements;

    const validNumber = /^380\d{9}$/.test(phone.value);
    if (!validNumber) {
    e.preventDefault();
      iziToast.show({ 
    message: 'Введіть номер у форматі 380XXXXXXXXX'
});
      return; 
    }

    if (name.value.length === 1) {
        iziToast.show({ 
            message: `Ім'я має бути мінімум 2 символи!`,
            color: 'red'
                });
    }

    const commentValue = commentValidator(comment.value);

    formData = {
        name: name.value,
        phone: phone.value,
        comment: commentValue,
        modelId: "682f9bbf8acbdf505592ac36",
  color: "#1212ca"
    };

    console.log(formData);
    
    try {
        const response = await axios.post('https://furniture-store-v2.b.goit.study/api/orders', formData);
    const orderData = response.data;

    console.log(orderData);
iziToast.show({ 
    message: `Ви замовили ${orderData.model}! 
    Hомер замовлення ${orderData.orderNum}. 
    Вже телефонуємо Вам 🫶`,
    color: 'green'
                });
    e.target.reset();
    closeOrderModal();
    
}
    catch (error) {
            e.preventDefault();
        console.log(error.message);
        iziToast.show({
            message: `Некорректні дані, будь ласка, перевірте форму на помилки!`,
            color: 'red'
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

function commentValidator(str) {
    if (str.length > 256) {
        return str.slice(0, 255);
        
    };
  while (str.length < 5) {
    str += ' ';
  }
  return str;
}