const offers = [
  {
    title: "Summer Sunglasses",
    category: "Summer Special",
    categoryClass: "summer",
    image: "images/Beach Reflection in Sunglasses.png",
    gallery: [
      "images/Elegant Gold Sunglasses.png",
      "images/Geometric Sunglasses with Terrazzo Block.png",
      "images/Cherries with Sunglasses.png"
    ],
    description: "Stay cool with UV-protected stylish shades.",
    oldPrice: "$80",
    newPrice: "$49",
    discount: "35% OFF"
  },
  {
    title: "Winter Jacket",
    category: "Winter Deal",
    categoryClass: "winter",
    image: "images/Colorful Winter Jacket Portrait.png",
    gallery: [
      "images/Fashionable Winter Jacket Portrait.png",
      "images/Urban Fashion Statement.png"
    ],
    description: "Keep warm in style this winter season.",
    oldPrice: "$150",
    newPrice: "$99",
    discount: "34% OFF"
  },
  {
    title: "Festive Lights Pack",
    category: "Festive Offer",
    categoryClass: "festive",
    image: "images/Snow-Covered Christmas Tree with Lights.png",
    gallery: [
      "images/Colorful Beach Huts at Dusk.png",
      "images/Festive Winter Scene.png"
    ],
    description: "Brighten up your celebrations with LED lights.",
    oldPrice: "$60",
    newPrice: "$39",
    discount: "35% OFF"
  }
];

const offersContainer = document.getElementById("offers-container");
const modal = document.getElementById("product-modal");
const modalClose = document.getElementById("modal-close");

// Modal Elements
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalGallery = document.getElementById("modal-gallery");
const modalOldPrice = document.getElementById("modal-old-price");
const modalNewPrice = document.getElementById("modal-new-price");

const modalMainImg = document.getElementById("modal-main-img");

offers.forEach((offer, index) => {
  const card = document.createElement("div");
  card.classList.add("offer-card");

  card.innerHTML = `
    <span class="discount-badge">${offer.discount}</span>
    <img src="${offer.image}" alt="${offer.title}">
    <div class="offer-category ${offer.categoryClass}">${offer.category}</div>
    <h3>${offer.title}</h3>
    <p>${offer.description}</p>
    <div class="offer-prices">
      <span class="old-price">${offer.oldPrice}</span>
      <span class="new-price">${offer.newPrice}</span>
    </div>
    <button class="show-details" data-index="${index}">Show Details</button>
  `;

  offersContainer.appendChild(card);
});

// Handle Show Details

// Handle Show Details
document.querySelectorAll(".show-details").forEach(btn => {
  btn.addEventListener("click", () => {
    const index = btn.dataset.index;
    const product = offers[index];

    modalTitle.textContent = product.title;
    modalDescription.textContent = product.description;
    modalOldPrice.textContent = product.oldPrice;
    modalNewPrice.textContent = product.newPrice;

    // Set the first image as main preview
    modalMainImg.src = product.gallery[0];

    // Load thumbnails
    modalGallery.innerHTML = "";
    product.gallery.forEach((img, i) => {
      const imageEl = document.createElement("img");
      imageEl.src = img;
      if (i === 0) imageEl.classList.add("active");

      imageEl.addEventListener("click", () => {
        modalMainImg.src = img;

        // Update active thumbnail
        document.querySelectorAll(".modal-gallery img").forEach(el => el.classList.remove("active"));
        imageEl.classList.add("active");
      });

      modalGallery.appendChild(imageEl);
    });

    modal.style.display = "flex";
  });
});

// Close modal
modalClose.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});
