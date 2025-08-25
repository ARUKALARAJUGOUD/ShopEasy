
const formTitle = document.getElementById("form-title");
const authBtn = document.getElementById("auth-btn");
const toggleSignup = document.getElementById("toggle-signup");
const signupOnlyFields = document.querySelectorAll(".signup-only");
let isSignup = false;

// Toggle between Login and Signup
toggleSignup.addEventListener("click", (e) => {
  e.preventDefault();
  isSignup = !isSignup;
  formTitle.textContent = isSignup ? "Sign Up for ShopEase" : "Login to ShopEase";
  authBtn.textContent = isSignup ? "Sign Up" : "Login";
  toggleSignup.textContent = isSignup ? "Login" : "Sign Up";
  signupOnlyFields.forEach(field => field.style.display = isSignup ? "block" : "none");
});

// Handle Login/Signup
document.getElementById("auth-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email")?.value.trim();
  const phone = document.getElementById("phone")?.value.trim();
  const password = document.getElementById("password").value.trim();
  const address = document.getElementById("address")?.value.trim();

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (isSignup) {
    if (users.find(user => user.username === username)) {
      alert("Username already taken!");
      return;
    }
    // users.push({ username, email, phone, password });
    users.push({ username, email, phone, address, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("✅ Account created! Please log in.");
    isSignup = false;
    toggleSignup.click();
  } else {
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      alert(`✅ Welcome back, ${username}!`);
      window.location.href = "index.html"; // Redirect to homepage
    } else {
      alert("❌ Invalid username or password.");
    }
  }
});

// Forgot Password Modal
const forgotLink = document.getElementById("forgot-link");
const modal = document.getElementById("forgot-modal");
const closeModal = document.getElementById("close-modal");

forgotLink.addEventListener("click", (e) => {
  e.preventDefault();
  modal.style.display = "block";
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// Reset Password
document.getElementById("reset-btn").addEventListener("click", function() {
  const resetEmail = document.getElementById("reset-email").value.trim();
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users.find(u => u.email === resetEmail);

  if (user) {
    const newPass = prompt("Enter your new password:");
    if (newPass) {
      user.password = newPass;
      localStorage.setItem("users", JSON.stringify(users));
      alert("✅ Password updated successfully!");
      modal.style.display = "none";
    }
  } else {
    alert("❌ Email not found.");
  }
});



function loginUser(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Example: Check if the admin is logging in
    if (username === "admin" && password === "admin123") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", "admin"); // Save role
        alert("Welcome Admin!");
        window.location.href = "admin-messages.html";
    }
    else {
        // Example for customer login
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", "customer");
        alert("Login Successful!");
        window.location.href = "index.html";
    }
}
