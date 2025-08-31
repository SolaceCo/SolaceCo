/* ---------------------
   Utility & State
----------------------*/
const state = {
  utm: new URLSearchParams(window.location.search), // capture incoming UTM for link propagation
};

function appendUTM(url) {
  if (!state.utm || [...state.utm].length === 0) return url;
  try {
    const u = new URL(url);
    state.utm.forEach((v, k) => u.searchParams.set(k, v));
    return u.toString();
  } catch {
    // If it's not a valid URL (shouldn’t happen), return original
    return url;
  }
}

function formatMoney(value) {
  return Number(value).toLocaleString(undefined, { style: 'currency', currency: 'USD' });
}

/* ---------------------
   Year in Footer
----------------------*/
document.getElementById('year').textContent = new Date().getFullYear();

/* ---------------------
   Lead Capture (no backend)
   - Stores email locally and shows success.
----------------------*/
const leadForm = document.getElementById('leadForm');
const leadEmail = document.getElementById('leadEmail');
const leadSuccess = document.getElementById('leadSuccess');

leadForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = (leadEmail.value || '').trim();
  if (!email) return;
  try {
    // Store to localStorage so you can export later if needed
    const key = 'dealcraft_leads';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    existing.push({ email, ts: Date.now() });
    localStorage.setItem(key, JSON.stringify(existing));
  } catch {}
  leadForm.reset();
  leadSuccess.hidden = false;
  setTimeout(() => (leadSuccess.hidden = true), 3500);
});

/* ---------------------
   Product Controls: Search / Filter / Sort
----------------------*/
const searchInput = document.getElementById('searchInput');
const categorySelect = document.getElementById('categorySelect');
const sortSelect = document.getElementById('sortSelect');
const cards = [...document.querySelectorAll('.products .card')];

function applyFilters() {
  const term = (searchInput.value || '').toLowerCase();
  const category = categorySelect.value;

  let visible = cards;

  // Filter by term & category
  visible.forEach(card => {
    const title = (card.dataset.title || '').toLowerCase();
    const cat = (card.dataset.category || 'all').toLowerCase();
    const matchesTerm = !term || title.includes(term);
    const matchesCat = (category === 'all') || (category === cat);
    card.style.display = (matchesTerm && matchesCat) ? '' : 'none';
  });

  // Sort visible cards
  const sortVal = sortSelect.value;
  const container = document.querySelector('.products');
  const toSort = cards.filter(c => c.style.display !== 'none');

  toSort.sort((a, b) => {
    const pa = parseFloat(a.dataset.price || '0');
    const pb = parseFloat(b.dataset.price || '0');
    const ra = parseFloat(a.dataset.rating || '0');
    const rb = parseFloat(b.dataset.rating || '0');

    switch (sortVal) {
      case 'price-asc': return pa - pb;
      case 'price-desc': return pb - pa;
      case 'rating-desc': return rb - ra;
      case 'popularity':
      default:
        // default: by rating desc, then price asc
        if (rb !== ra) return rb - ra;
        return pa - pb;
    }
  });

  // Re-append in sorted order
  toSort.forEach(card => container.appendChild(card));
}

searchInput.addEventListener('input', applyFilters);
categorySelect.addEventListener('change', applyFilters);
sortSelect.addEventListener('change', applyFilters);
applyFilters();

/* ---------------------
   Outbound Click Handling
   - Tracks clicks (console + localStorage)
   - Ensures all outbound links/buttons get UTM appended
----------------------*/
function trackClick(sku) {
  try {
    const key = 'dealcraft_clicks';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    existing.push({ sku, ts: Date.now() });
    localStorage.setItem(key, JSON.stringify(existing));
  } catch {}
  console.log('[track]', sku);
}

// Convert <a> and <button> with class "outbound"
document.querySelectorAll('.outbound').forEach(el => {
  const sku = el.getAttribute('data-sku') || 'unknown';
  let link = el.tagName === 'A' ? el.getAttribute('href') : el.getAttribute('data-link');
  link = appendUTM(link);

  if (el.tagName === 'A') {
    el.setAttribute('href', link);
  } else {
    el.addEventListener('click', () => {
      trackClick(sku);
      window.open(link, '_blank', 'noopener,noreferrer');
    });
  }

  // Track clicks for <a> too
  el.addEventListener('click', () => trackClick(sku));
});

/* ---------------------
   Price prettifier (optional):
   If you edit prices in data-price only, this makes the .price reflect locale.
----------------------*/
document.querySelectorAll('.card').forEach(card => {
  const priceEl = card.querySelector('.price');
  const raw = card.dataset.price;
  if (priceEl && raw) priceEl.textContent = formatMoney(raw);
});
