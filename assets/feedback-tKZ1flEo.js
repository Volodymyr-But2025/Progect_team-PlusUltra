import{a as c,S as d,N as l,P as f}from"./vendor-uxFXHuDx.js";import{r as i}from"../index.js";function u(){return i.loaderFeedback.classList.add("loader")}function a(){return i.loaderFeedback.classList.remove("loader")}function g(t){const e=[...t];for(let s=e.length-1;s>0;s-=1){const r=Math.floor(Math.random()*(s+1));[e[s],e[r]]=[e[r],e[s]]}return e}function h(t){const e=t%1,s=Math.floor(t);return e>=.3&&e<=.7?s+.5:e>=.8?s+1:e<=.2?s:t}function p(){document.querySelectorAll(".star-rating").forEach(e=>{const s=parseFloat(e.dataset.rating);v(e,s)})}function v(t,e){let s="";for(let r=1;r<=5;r++)r<=Math.floor(e)?s+=`
        <svg class="icon-star star-filled" width="20" height="20">

          <use href="./star-rating.icons.svg#star-filled"></use>

        </svg>`:r-.5===e?s+=`
        <svg class="icon-star star-half" width="20" height="20">

          <use href="./star-rating.icons.svg#star-half"></use>

        </svg>`:s+=`
        <svg class="icon-star star-empty" width="20" height="20">
          <use href="./star-rating.icons.svg#star-empty"></use>
        </svg>`;t.innerHTML=s}function b(t){const e=document.querySelector("#reviews-container"),s=t.map(({name:r,descr:n,rate:o})=>`
      <div class="swiper-slide review-card">
        <div class="star-rating" data-rating="${h(o)}"></div>
        <p class="feedback-text">${n}</p>
        <h3 class="feedback-user-name">${r}</h3>
      </div>`).join("");e.innerHTML=s,p()}function w(){new d(".reviews-swiper",{modules:[l,f],observer:!0,observeParents:!0,slidesPerView:1,spaceBetween:10,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev",disabledClass:"button-disabled"},pagination:{el:".swiper-pagination",clickable:!0},breakpoints:{768:{slidesPerView:2},1440:{slidesPerView:3}}})}async function m(){u();try{const e=(await c.get("https://furniture-store-v2.b.goit.study/api/feedbacks")).data,s=e.feedbacks;if(s&&Array.isArray(s)){const r=g(s);b(r.slice(0,10)),w()}else iziToast.show({message:`Масив не знайдено в data.feedbacks: ${e}`,color:"red",position:"topCenter"}),a()}catch(t){a(),iziToast.show({message:`Помилка при отриманні відгуків: ${t}`,color:"red",position:"topCenter"})}a()}m();
//# sourceMappingURL=feedback-tKZ1flEo.js.map
