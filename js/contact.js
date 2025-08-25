
document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !phone || !message) {
    alert("Please fill in all fields.");
    return;
  }

  const contactMessages = JSON.parse(localStorage.getItem("contactMessages")) || [];

  contactMessages.push({
    name,
    email,
    phone,
    message,
    date: new Date().toLocaleString()
  });

  localStorage.setItem("contactMessages", JSON.stringify(contactMessages));

  document.getElementById("contact-form").reset();

  // Show Popup
  document.getElementById("popup").style.display = "flex";

  // Close Popup and redirect
  document.getElementById("popup-close").onclick = function() {
    document.getElementById("popup").style.display = "none";
    window.location.href = "index.html"; // ✅ redirect to main page
  };
});
