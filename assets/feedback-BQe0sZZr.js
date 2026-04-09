import{a as d,S as l,N as u,P as f}from"./vendor-uxFXHuDx.js";import{r as n}from"../index.js";function g(){return n.loaderFeedback.classList.add("loader")}function i(){return n.loaderFeedback.classList.remove("loader")}const a=document.querySelector(".swiper-buttons");function h(t){const s=[...t];for(let e=s.length-1;e>0;e-=1){const r=Math.floor(Math.random()*(e+1));[s[e],s[r]]=[s[r],s[e]]}return s}function p(t){const s=t%1,e=Math.floor(t);return s>=.3&&s<=.7?e+.5:s>=.8?e+1:s<=.2?e:t}function w(){document.querySelectorAll(".star-rating").forEach(s=>{const e=parseFloat(s.dataset.rating);v(s,e)})}function v(t,s){let e="";for(let r=1;r<=5;r++)r<=Math.floor(s)?e+=`
        <svg class="icon-star star-filled" width="20" height="20">

          <use href="./star-rating.icons.svg#star-filled"></use>

        </svg>`:r-.5===s?e+=`
        <svg class="icon-star star-half" width="20" height="20">

          <use href="./star-rating.icons.svg#star-half"></use>

        </svg>`:e+=`
        <svg class="icon-star star-empty" width="20" height="20">
          <use href="./star-rating.icons.svg#star-empty"></use>
        </svg>`;t.innerHTML=e}function b(t){const s=document.querySelector("#reviews-container"),e=t.map(({name:r,descr:o,rate:c})=>`
      <div class="swiper-slide review-card">
        <div class="star-rating" data-rating="${p(c)}"></div>
        <p class="feedback-text">${o}</p>
        <h3 class="feedback-user-name">${r}</h3>
      </div>`).join("");s.innerHTML=e,w()}function m(){new l(".reviews-swiper",{modules:[u,f],observer:!0,observeParents:!0,slidesPerView:1,spaceBetween:10,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev",disabledClass:"button-disabled"},pagination:{el:".swiper-pagination",clickable:!0},breakpoints:{768:{slidesPerView:2},1440:{slidesPerView:3}}})}async function k(){g(),a==null||a.classList.add("hidden");try{const e=(await d.get("https://furniture-store-v2.b.goit.study/api/feedbacks")).data.feedbacks;if(e&&Array.isArray(e)){const r=h(e);b(r.slice(0,10)),m(),a==null||a.classList.remove("hidden")}else iziToast.show({message:"Не вдалося завантажити дані. Перевірте з'єднання та спробуйте знову",color:"red",position:"topCenter"}),i()}catch{i(),iziToast.show({message:"Не вдалося завантажити дані. Перевірте з'єднання та спробуйте знову",color:"red",position:"topCenter"})}i()}k();
//# sourceMappingURL=feedback-BQe0sZZr.js.map
