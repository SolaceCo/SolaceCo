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
    // Optional: send to Google Analytics
    if(typeof gtag === 'function'){
      gtag('event', 'click', {
        'event_category': 'Affiliate',
        'event_label': link.href
      });
    }
  });
});
