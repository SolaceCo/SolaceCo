document.addEventListener("DOMContentLoaded", () => {
  const timerEl = document.getElementById("timer");
  let countdown = 60 * 60 * 3; // 3 hours

  function updateCountdown() {
    const h = String(Math.floor(countdown / 3600)).padStart(2, "0");
    const m = String(Math.floor((countdown % 3600) / 60)).padStart(2, "0");
    const s = String(countdown % 60).padStart(2, "0");
    timerEl.textContent = `${h}:${m}:${s}`;
    if (countdown > 0) countdown--;
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // Amazon-style featured products
  const products = [
    {
      name: "Echo Dot (5th Gen) Smart Speaker",
      image: "https://m.media-amazon.com/images/I/61ZbH1pU3PL._AC_SX679_.jpg",
      link: "https://www.amazon.com/dp/B09B8V1GF9?tag=youraffiliatetag",
      rating: 4.7,
      reviews: "21,842",
      prime: true,
      price: "$49.99"
    },
    {
      name: "Fire TV Stick 4K Streaming Device",
      image: "https://m.media-amazon.com/images/I/71XnN3GZ3zL._AC_SX679_.jpg",
      link: "https://www.amazon.com/dp/B08XVYZ1Y5?tag=youraffiliatetag",
      rating: 4.6,
      reviews: "109,234",
      prime: true,
      price: "$39.99"
    },
    {
      name: "Anker Wireless Charger, Qi-Certified",
      image: "https://m.media-amazon.com/images/I/61RHOZZgrlL._AC_SX679_.jpg",
      link: "https://www.amazon.com/dp/B07THHQMHM?tag=youraffiliatetag",
      rating: 4.5,
      reviews: "45,673",
      prime: false,
      price: "$19.99"
    }
  ];

  const carousel = document.getElementById("product-carousel");

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <div class="price">${product.price}</div>
      <div class="rating">
        ${'★'.repeat(Math.floor(product.rating))}${product.rating % 1 >= 0.5 ? '½' : ''} 
        <small>(${product.reviews})</small>
      </div>
      ${product.prime ? '<div class="prime-badge">✔️ Prime</div>' : ''}
      <a href="${product.link}" target="_blank" class="buy-btn">Buy on Amazon</a>
    `;
    carousel.appendChild(card);
  });
});
