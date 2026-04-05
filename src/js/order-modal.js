import axios from "axios"
import iziToast from "izitoast";

let formData = {};

const formEl = document.querySelector('.order-form');
const backdropEl = document.querySelector('.order-backdrop');
const closeBtn = document.querySelector('.modal-close-button');
const phoneInput = document.getElementById('phone');

  phoneInput.addEventListener('input', () => {
    // прибираємо все, крім цифр
    let digits = phoneInput.value.replace(/\D/g, '');

    // якщо починається з 8 або 0 — приводимо до 380
    if (digits.startsWith('0')) {
      digits = '38' + digits;
    } else if (digits.startsWith('8')) {
      digits = '3' + digits;
    }

    // обмежуємо до 12 цифр
    digits = digits.slice(0, 12);

    phoneInput.value = digits;
  });

  // фінальна перевірка при сабміті
//   phoneInput.form?.addEventListener('submit', (e) => {
//     const valid = /^380\d{9}$/.test(phoneInput.value);
//     if (!valid) {
//       e.preventDefault();
//       alert('Введіть номер у форматі 380XXXXXXXXX');
//     }
//   }
//   );

console.log(formEl);

// Функція для блокування скролювання
function disableBodyScroll() {
  document.body.style.overflow = 'hidden';
}

// Функція для дозволу скролювання
function enableBodyScroll() {
  document.body.style.overflow = '';
}

// Відкриття модального вікна
function openModal() {
  backdropEl.classList.add('is-open');
  disableBodyScroll();
}

// Закриття модального вікна
function closeModal() {
  backdropEl.classList.remove('is-open');
  enableBodyScroll();
}

// Закриття при кліку на кнопку закриття
closeBtn.addEventListener('click', closeModal);

// Закриття при кліку на backdrop (за межами модального вікна)
backdropEl.addEventListener('click', (e) => {
  if (e.target === backdropEl) {
    closeModal();
  }
});

formEl.addEventListener('submit', async e => {
    e.preventDefault();

    
    const { name, phone, comment } = e.target.elements;
    formData = {
        name: name.value,
        phone: phone.value,
        comment: comment.value,
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
    Вже телефонуємо Вам 🫶`
                });
    e.target.reset();
    closeModal();
    
}
catch (error) {
        console.log(error.message);
        iziToast.show({
            message: `error`
                });
}
});

// Закриття при натисканні на ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && backdropEl.classList.contains('is-open')) {
    closeModal();
  }
});

