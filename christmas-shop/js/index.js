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
  console.log('click');
  console.log(nav);

  if (burger.classList.contains('active')) {
    closeMenu();
  } else {
    openMenu();
  }
}

burger.addEventListener('click', toggleMenu);

navLinks.forEach((link) => {
  link.addEventListener('click', closeMenu);
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    closeMenu();
  }
});
function updateTimer() {
    const now = new Date();
    const nextYear = now.getUTCFullYear() + 1;
    const newYear = new Date(Date.UTC(nextYear, 0, 1, 0, 0, 0));
  
    const diff = newYear - now;
  
    if (diff <= 0) {
      return;
    }
  
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
  
    const numbers = document.querySelectorAll('.cta-number');
  
    if (numbers.length < 4) return;
  
    numbers[0].textContent = days;
    numbers[1].textContent = hours;
    numbers[2].textContent = minutes;
    numbers[3].textContent = seconds;
  }
  
  updateTimer();
  setInterval(updateTimer, 1000);

  const sliderRow = document.querySelector('.slider-row');
  const sliderTrack = document.querySelector('.slider-track');
  const prev = document.querySelector('.slider-btn--prev');
  const next = document.querySelector('.slider-btn--next');
  
  let currentClick = 0;
  let maxClicks = 0;
  let step = 0;
  let maxScroll = 0;
  
  function initSlider() {
    currentClick = 0;
    sliderRow.scrollLeft = 0;
  
    if (window.innerWidth >= 769) {
      maxClicks = 3;
    } else {
      maxClicks = 6;
    }
  
    maxScroll = sliderTrack.scrollWidth - sliderRow.clientWidth;
    step = maxScroll / maxClicks;
  
    if (window.innerWidth >= 1440) {
      step += 40;
    }
  
    updateButtons();
  }
  
  function updateButtons() {
    prev.disabled = currentClick === 0;
    next.disabled = currentClick === maxClicks;
  }
  
  next.addEventListener('click', () => {
    if (currentClick < maxClicks) {
      currentClick += 1;
  
      const target = Math.min(step * currentClick, maxScroll);
  
      sliderRow.scrollTo({
        left: target,
        behavior: 'smooth'
      });
  
      updateButtons();
    }
  });
  
  prev.addEventListener('click', () => {
    if (currentClick > 0) {
      currentClick -= 1;
  
      const target = Math.min(step * currentClick, maxScroll);
  
      sliderRow.scrollTo({
        left: target,
        behavior: 'smooth'
      });
  
      updateButtons();
    }
  });
  
  window.addEventListener('resize', initSlider);
  window.addEventListener('load', initSlider);
  
  initSlider();

const giftsData = window.gifts || [];
const container = document.querySelector('.best-gifts .gifts-grid');

function getGiftImage(category) {
  if (category === 'For Work' || category === 'FOR WORK') {
    return './assets/images/gift-for-work.png';
  }

  if (category === 'For Health' || category === 'FOR HEALTH') {
    return './assets/images/gift-for-health.png';
  }

  return './assets/images/gift-for-harmony.png';
}

function getGiftClass(category) {
  if (category === 'For Work' || category === 'FOR WORK') {
    return 'work';
  }

  if (category === 'For Health' || category === 'FOR HEALTH') {
    return 'health';
  }

  return 'harmony';
}

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function createGiftCard(gift) {
  const name = gift.name ? gift.name : gift.title;
  const category = gift.category;

  return `
    <article class="gift-card">
      <img class="gift-card__img" src="${getGiftImage(category)}" alt="${name}">
      <div class="gift-card__content">
        <span class="gift-card__category ${getGiftClass(category)}">${category}</span>
        <h3 class="gift-card__title">${name}</h3>
      </div>
    </article>
  `;
}

function renderRandomGifts() {
  if (!container) return;
  if (!Array.isArray(giftsData)) return;
  if (giftsData.length === 0) return;

  const randomGifts = shuffleArray(giftsData).slice(0, 4);
  container.innerHTML = randomGifts.map(createGiftCard).join('');
}

renderRandomGifts();

const modal = document.querySelector('.modal');
const modalOverlay = document.querySelector('.modal-overlay');
const modalClose = document.querySelector('.modal-close');
const modalBody = document.querySelector('.modal-body');


function getSnowflakes(value) {
    const number = parseInt(value.replace('+', ''), 10);
    const activeCount = Math.floor(number / 100);
    let snowflakes = '';
  
    for (let i = 0; i < 5; i += 1) {
      snowflakes += i < activeCount
        ? '<span class="snowflake active">❄</span>'
        : '<span class="snowflake">❄</span>';
    }
  
    return snowflakes;
  }
  
  function openModal(gift) {
    const name = gift.name ? gift.name : gift.title;
    const category = gift.category;
  
    modalBody.innerHTML = `
      <div class="modal-card">
        <div class="modal-image">
          <img src="${getGiftImage(category)}" alt="${name}">
        </div>
  
        <div class="modal-info">
          <p class="modal-category ${getGiftClass(category)}">${category.toUpperCase()}</p>
          <h3 class="modal-title">${name.toUpperCase()}</h3>
          <p class="modal-description">${gift.description || ''}</p>
  
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
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });

  container.addEventListener('click', (event) => {
    const card = event.target.closest('.gift-card');
    if (!card) return;
  
    const title = card.querySelector('.gift-card__title').textContent;
  
    const selectedGift = giftsData.find((gift) => {
      const name = gift.name ? gift.name : gift.title;
      return name.toUpperCase() === title.toUpperCase();;
    });
  
    if (selectedGift) {
      openModal(selectedGift);
    }
  });

  function closeModal() {
    modal.classList.remove('active');
    body.classList.remove('no-scroll');
  }
  
  modalClose.addEventListener('click', closeModal);
  
  modalOverlay.addEventListener('click', (event) => {
    if (event.target === modalOverlay) {
      closeModal();
    }
  });