const tabs = document.querySelectorAll('.tab');
const cards = document.querySelectorAll('.gift-card');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const category = tab.textContent.trim();

    cards.forEach(card => {
      if (category === 'ALL') {
        card.style.display = 'block';
      } else {
        const text = card.textContent;
        card.style.display = text.includes(category) ? 'block' : 'none';
      }
    });
  });
});