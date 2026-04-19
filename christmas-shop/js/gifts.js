const burger = document.querySelector('.burger');
const nav = document.querySelector('.navigation');
const navLinks = document.querySelectorAll('.navigation-link');
const body = document.body;

function openMenu() {
  burger.classList.add('active');
  nav.classList.add('active');
  body.classList.add('no-scroll');
}

function closeMenu() {
  burger.classList.remove('active');
  nav.classList.remove('active');
  body.classList.remove('no-scroll');
}

function toggleMenu() {
  if (burger.classList.contains('active')) {
    closeMenu();
  } else {
    openMenu();
  }
}

if (burger) {
  burger.addEventListener('click', toggleMenu);
}

navLinks.forEach((link) => {
  link.addEventListener('click', closeMenu);
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    closeMenu();
  }
});

const giftsData = window.gifts || [];
const giftsGrid = document.querySelector('.gifts-grid');
const tabs = document.querySelectorAll('.gifts-tab');
const scrollTopBtn = document.querySelector('.scroll-top');

const modal = document.querySelector('.modal');
const modalOverlay = document.querySelector('.modal-overlay');
const modalClose = document.querySelector('.modal-close');
const modalBody = document.querySelector('.modal-body');

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

function getGiftName(gift) {
  return gift.name || gift.title || 'Gift';
}

function createGiftCard(gift) {
  const name = getGiftName(gift);
  const category = gift.category;

  return `
    <article class="gift-card">
      <img class="gift-card__img" src="${getGiftImage(category)}" alt="${name}">
      <div class="gift-card__content">
        <span class="gift-card__category ${getGiftClass(category)}">${category.toUpperCase()}</span>
        <h3 class="gift-card__title">${name.toUpperCase()}</h3>
      </div>
    </article>
  `;
}

function renderGifts(selectedCategory = 'ALL') {
  if (!giftsGrid) return;

  let filteredGifts = giftsData;

  if (selectedCategory === 'FOR WORK') {
    filteredGifts = giftsData.filter((gift) => gift.category === 'For Work');
  }

  if (selectedCategory === 'FOR HEALTH') {
    filteredGifts = giftsData.filter((gift) => gift.category === 'For Health');
  }

  if (selectedCategory === 'FOR HARMONY') {
    filteredGifts = giftsData.filter((gift) => gift.category === 'For Harmony');
  }

  giftsGrid.innerHTML = filteredGifts.map(createGiftCard).join('');
}

tabs.forEach((tab) => {
  tab.addEventListener('click', (event) => {
    event.preventDefault();

    tabs.forEach((item) => item.classList.remove('active'));
    tab.classList.add('active');

    const selectedCategory = tab.textContent.trim().toUpperCase();
    renderGifts(selectedCategory);
  });
});

function getSnowflakes(value) {
  const number = parseInt(String(value).replace('+', ''), 10);
  const activeCount = Math.floor(number / 100);
  let result = '';

  for (let i = 0; i < 5; i += 1) {
    result += i < activeCount
      ? '<span class="snowflake active">❄</span>'
      : '<span class="snowflake">❄</span>';
  }

  return result;
}

function openModal(gift) {
  const name = getGiftName(gift);
  const category = gift.category;

  modalBody.innerHTML = `
    <div class="modal-card">
      <div class="modal-image">
        <img src="${getGiftImage(category)}" alt="${name}">
      </div>

      <div class="modal-info">
        <p class="modal-category ${getGiftClass(category)}">${category.toUpperCase()}</p>
        <h3 class="modal-title">${name.toUpperCase()}</h3>
        <p class="modal-description">${gift.description}</p>

        <p class="modal-powers-title">ADDS SUPERPOWERS TO:</p>

        <div class="modal-power-row">
          <span class="modal-power-name">Live</span>
          <span class="modal-power-value">${gift.superpowers.live}</span>
          <span class="modal-power-icons">${getSnowflakes(gift.superpowers.live)}</span>
        </div>

        <div class="modal-power-row">
          <span class="modal-power-name">Create</span>
          <span class="modal-power-value">${gift.superpowers.create}</span>
          <span class="modal-power-icons">${getSnowflakes(gift.superpowers.create)}</span>
        </div>

        <div class="modal-power-row">
          <span class="modal-power-name">Love</span>
          <span class="modal-power-value">${gift.superpowers.love}</span>
          <span class="modal-power-icons">${getSnowflakes(gift.superpowers.love)}</span>
        </div>

        <div class="modal-power-row">
          <span class="modal-power-name">Dream</span>
          <span class="modal-power-value">${gift.superpowers.dream}</span>
          <span class="modal-power-icons">${getSnowflakes(gift.superpowers.dream)}</span>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');
  body.classList.add('no-scroll');
}

function closeModal() {
  modal.classList.remove('active');
  body.classList.remove('no-scroll');
}

if (giftsGrid) {
  giftsGrid.addEventListener('click', (event) => {
    const card = event.target.closest('.gift-card');
    if (!card) return;

    const title = card.querySelector('.gift-card__title').textContent.trim();

    const selectedGift = giftsData.find((gift) => {
      return getGiftName(gift).toUpperCase() === title;
    });

    if (selectedGift) {
      openModal(selectedGift);
    }
  });
}

if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

if (modalOverlay) {
  modalOverlay.addEventListener('click', (event) => {
    if (event.target === modalOverlay) {
      closeModal();
    }
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

function toggleScrollButton() {
  if (!scrollTopBtn) return;

  if (window.innerWidth <= 768 && window.scrollY > 300) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
}

if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

window.addEventListener('scroll', toggleScrollButton);
window.addEventListener('resize', toggleScrollButton);

renderGifts('ALL');
toggleScrollButton();