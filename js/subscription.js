// Popup Elements
const subscribeModal = document.getElementById("subscribe-modal");
const closeModal = document.getElementById("close-modal");

// Flag to ensure it shows only once
let popupShown = false;

// Show modal when user scrolls halfway
window.addEventListener("scroll", () => {
  if (!popupShown) {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const fullHeight = document.body.scrollHeight;

    if (scrollTop + windowHeight >= fullHeight / 2) {
      subscribeModal.style.display = "flex";
      popupShown = true;
    }
  }
});

// Close modal on "X"
closeModal.addEventListener("click", () => {
  subscribeModal.style.display = "none";
});

// Close modal if clicking outside the box
window.addEventListener("click", (e) => {
  if (e.target === subscribeModal) {
    subscribeModal.style.display = "none";
  }
});

// Handle subscription form
const popupForm = document.getElementById("popup-subscribe-form");
const popupEmail = document.getElementById("popup-subscribe-email");
const popupMessage = document.getElementById("popup-subscribe-message");

popupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (popupEmail.value.trim() === "") {
    popupMessage.style.display = "block";
    popupMessage.style.color = "red";
    popupMessage.textContent = "⚠️ Please enter a valid email!";
    return;
  }

  popupMessage.style.display = "block";
  popupMessage.style.color = "green";
  popupMessage.textContent = `✅ Thanks for subscribing, ${popupEmail.value}!`;

  popupEmail.value = "";

  // Auto-hide modal after success
  setTimeout(() => {
    subscribeModal.style.display = "none";
    popupMessage.style.display = "none";
  }, 3000);
});
