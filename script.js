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

// Track clicks on affiliate links
const affiliateLinks = document.querySelectorAll('.actions .btn-primary');
affiliateLinks.forEach(link => {
  link.addEventListener('click', () => {
    console.log(`Affiliate clicked: ${link.href}`);
  });
});

/* NEW: Generate mini star graphs dynamically */
document.querySelectorAll('.rating').forEach(ratingEl => {
  const rating = parseFloat(ratingEl.dataset.rating);
  const maxStars = 5;

  for (let i = 1; i <= maxStars; i++) {
    const star = document.createElement('span');
    star.classList.add('star');

    if (i <= Math.floor(rating)) {
      star.classList.add('filled'); // full star
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      // half star using gradient
      star.style.background = 'linear-gradient(90deg, #ffd166 50%, #444 50%)';
      star.style['-webkit-background-clip'] = 'text';
      star.style['-webkit-text-fill-color'] = 'transparent';
    }

    star.textContent = '★';
    ratingEl.appendChild(star);
  }
});
