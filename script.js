// Footer year
const yearEl = document.getElementById('year');
if(yearEl) yearEl.textContent = new Date().getFullYear();

// Scroll-to-top button
const scrollBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
  if(window.scrollY > 200) scrollBtn.classList.add('show-scroll');
  else scrollBtn.classList.remove('show-scroll');
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
