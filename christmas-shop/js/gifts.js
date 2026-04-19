document.addEventListener('DOMContentLoaded', () => {
  const giftsData = window.gifts || [];
  const giftsGrid = document.querySelector('.gifts-grid');
  const tabs = document.querySelectorAll('.tab');

  function getGiftImage(category) {
    if (category === 'For Work') return './assets/images/gift-for-work.png';
    if (category === 'For Health') return './assets/images/gift-for-health.png';
    return './assets/images/gift-for-harmony.png';
  }

  function getGiftClass(category) {
    if (category === 'For Work') return 'work';
    if (category === 'For Health') return 'health';
    return 'harmony';
  }

  function createGiftCard(gift) {
    return `
      <article class="gift-card">
        <img class="gift-card__img" src="${getGiftImage(gift.category)}" alt="${gift.name}">
        <div class="gift-card__content">
          <span class="gift-card__category ${getGiftClass(gift.category)}">${gift.category.toUpperCase()}</span>
          <h3 class="gift-card__title">${gift.name.toUpperCase()}</h3>
        </div>
      </article>
    `;
  }

  function renderAllGifts() {
    if (!giftsGrid) return;
    giftsGrid.innerHTML = giftsData.map(createGiftCard).join('');
  }

  function renderByCategory(category) {
    if (!giftsGrid) return;

    if (category === 'ALL') {
      renderAllGifts();
      return;
    }

    const filtered = giftsData.filter((gift) => {
      return gift.category.toUpperCase() === category;
    });

    giftsGrid.innerHTML = filtered.map(createGiftCard).join('');
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', (event) => {
      event.preventDefault();

      tabs.forEach((item) => item.classList.remove('active'));
      tab.classList.add('active');

      renderByCategory(tab.textContent.trim().toUpperCase());
    });
  });

  renderAllGifts();
});
const scrollTopBtn = document.querySelector('.scroll-top');

function toggleScrollButton() {
  if (!scrollTopBtn) return;

  if (window.innerWidth <= 768 && window.scrollY > 300) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
}

window.addEventListener('scroll', toggleScrollButton);
window.addEventListener('resize', toggleScrollButton);

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

toggleScrollButton();