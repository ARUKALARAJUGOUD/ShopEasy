const upcomingProducts = [
  {
    name: "Smartwatch Pro X",
    image: "images/Elegant Luxury Wristwatch.png",
    description: "Next-gen smartwatch with AI health tracking and 7-day battery life.",
    releaseDate: "2025-09-15"
  },
  {
    name: "UltraNoise Headphones",
    image: "images/Modern White Headphones.png",
    description: "Premium noise-cancelling headphones with studio sound quality.",
    releaseDate: "2025-09-25"
  },
  {
    name: "Eco-Friendly Sneakers",
    image: "images/Stylish Orange Shoe on Peach Background.png",
    description: "Sustainable sneakers made from 100% recycled materials.",
    releaseDate: "2025-10-05"
  }
];

const upCommmingContainer = document.getElementById("upcoming-container");

function renderUpcoming() {
  upCommmingContainer.innerHTML = "";

  upcomingProducts.forEach((product, index) => {
    const card = document.createElement("div");
    card.classList.add("upcoming-card");

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <div class="release-date">Release: ${product.releaseDate}</div>
      <div class="countdown" data-date="${product.releaseDate}">Loading...</div>
      
      <!-- Notify Me Form -->
      <form class="notify-form" data-product="${product.name}">
        <input type="email" placeholder="Enter your email" required>
        <button type="submit">Notify Me</button>
      </form>
      <div class="notify-message">✅ You’ll be notified for ${product.name}!</div>
    `;

    upCommmingContainer.appendChild(card);
  });

  startCountdowns();
  handleNotifyForms();
}

// Countdown Timer
function startCountdowns() {
  const countdowns = document.querySelectorAll(".countdown");

  countdowns.forEach(el => {
    const targetDate = new Date(el.dataset.date).getTime();

    function updateTimer() {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        el.innerHTML = "Available Now 🎉";
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      el.innerHTML = `⏳ ${days}d ${hours}h ${minutes}m`;
    }

    updateTimer();
    setInterval(updateTimer, 60000); // update every minute
  });
}

// Handle Notify Form Submissions
function handleNotifyForms() {
  const forms = document.querySelectorAll(".notify-form");

  forms.forEach(form => {
    form.addEventListener("submit", e => {
      e.preventDefault();

      const emailInput = form.querySelector("input");
      const message = form.nextElementSibling;

      if (emailInput.value.trim() === "") {
        alert("Please enter a valid email.");
        return;
      }

      // Simulated saving process
      message.style.display = "block";
      emailInput.value = "";

      setTimeout(() => {
        message.style.display = "none";
      }, 4000);
    });
  });
}

renderUpcoming();
