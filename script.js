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

// Affiliate link click tracking
const affiliateLinks = document.querySelectorAll('.actions .btn-primary');
affiliateLinks.forEach(link => {
  link.addEventListener('click', () => {
    console.log(`Affiliate clicked: ${link.href}`);
  });
});

/* SVG star rating with partial stars */
document.querySelectorAll('.rating').forEach(ratingEl => {
  const rating = parseFloat(ratingEl.dataset.rating);
  const maxStars = 5;

  for (let i = 1; i <= maxStars; i++) {
    const svgNS = "http://www.w3.org/2000/svg";
    const star = document.createElementNS(svgNS, "svg");
    star.setAttribute("viewBox", "0 0 24 24");

    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", "M12 .587l3.668 7.431L24 9.168l-6 5.848 1.417 8.255L12 18.896 4.583 23.27 6 15.016 0 9.168l8.332-1.15z");

    if (i <= Math.floor(rating)) {
      // full star
      star.appendChild(path);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      // partial star using clipPath
      const percent = rating - Math.floor(rating);
      path.setAttribute("clip-path", `inset(0 ${100 - percent*100}% 0 0)`);
      star.appendChild(path);
    } else {
      // empty star
      star.classList.add("empty");
      star.appendChild(path);
    }

    ratingEl.appendChild(star);
  }
});
