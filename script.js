// Footer year
const yearEl = document.getElementById('year');
if(yearEl) yearEl.textContent = new Date().getFullYear();

// Scroll-to-top button
const scrollBtn = document.getElementById('scrollTopBtn');
if(scrollBtn){
  window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('show-scroll', window.scrollY > 200);
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
