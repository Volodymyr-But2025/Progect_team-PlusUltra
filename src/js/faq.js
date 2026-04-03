const items = document.querySelectorAll('.faq-div li');

items.forEach(item => {
  const title = item.querySelector('h3');

  title.addEventListener('click', () => {
    items.forEach(i => {
      if (i !== item) {
        i.classList.remove('active');
      }
    });

    item.classList.toggle('active');
  });
});
