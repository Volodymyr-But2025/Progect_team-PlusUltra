import axios from 'axios';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { refs } from './refs';
import { hideLoaderFeedback, showLoaderFeedback } from './loader';
const btnNav = document.querySelector('.swiper-buttons');


function shuffleFeedbacks(feedbacks) {
  const shuffled = [...feedbacks];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }

  return shuffled;
}

function roundRating(rating) {
  const fraction = rating % 1;
  const integer = Math.floor(rating);

  if (fraction >= 0.3 && fraction <= 0.7) return integer + 0.5;
  if (fraction >= 0.8) return integer + 1;
  if (fraction <= 0.2) return integer;
  return rating;
}

function initStars() {
  const ratingContainers = document.querySelectorAll('.star-rating');

  ratingContainers.forEach(container => {
    const rating = parseFloat(container.dataset.rating);
    renderStarIcons(container, rating);
  });
}

function renderStarIcons(containers, rate) {
  let starsMarkup = '';

  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rate)) {
      starsMarkup += `
        <svg class="icon-star star-filled" width="20" height="20">

          <use href="./star-rating.icons.svg#star-filled"></use>

        </svg>`;
    } else if (i - 0.5 === rate) {
      starsMarkup += `
        <svg class="icon-star star-half" width="20" height="20">

          <use href="./star-rating.icons.svg#star-half"></use>

        </svg>`;
    } else {
      starsMarkup += `
        <svg class="icon-star star-empty" width="20" height="20">
          <use href="./star-rating.icons.svg#star-empty"></use>
        </svg>`;
    }
  }
  containers.innerHTML = starsMarkup;
}

function renderReviews(reviews) {
  const container = document.querySelector('#reviews-container');
  const markup = reviews
    .map(({ name, descr, rate }) => {
      const finalRating = roundRating(rate);
      return `
      <div class="swiper-slide review-card">
        <div class="star-rating" data-rating="${finalRating}"></div>
        <p class="feedback-text">${descr}</p>
        <h3 class="feedback-user-name">${name}</h3>
      </div>`;
    })
    .join('');

  container.innerHTML = markup;
  initStars();
}

function initSwiper() {
  new Swiper('.reviews-swiper', {
    modules: [Navigation, Pagination],
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      disabledClass: 'button-disabled',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      768: { slidesPerView: 2 },
      1440: { slidesPerView: 3 },
    },
  });
}

async function fetchFeedbacks() {
  showLoaderFeedback();
 
   btnNav?.classList.add('hidden');
  try {
    const response = await axios.get(
      'https://furniture-store-v2.b.goit.study/api/feedbacks'
    );
    const data = response.data;

    const feedbacksList = data.feedbacks;

    if (feedbacksList && Array.isArray(feedbacksList)) {
      const randomizedFeedbacks = shuffleFeedbacks(feedbacksList);

      renderReviews(randomizedFeedbacks.slice(0, 10));
      initSwiper();
    
       btnNav?.classList.remove('hidden');
    } else {
      // console.error("Масив не знайдено в data.feedbacks:", data);
      iziToast.show({
        message: `Масив не знайдено в data.feedbacks: ${data}`,
        color: 'red',
        position: 'topCenter',
      });
      hideLoaderFeedback();
      
    }
  } catch (error) {
    hideLoaderFeedback();
    // console.error("Помилка при отриманні відгуків:", error);
    iziToast.show({
      message: `Помилка при отриманні відгуків: ${error}`,
      color: 'red',
      position: 'topCenter',
    });
  }
  hideLoaderFeedback();
  
}

fetchFeedbacks();
