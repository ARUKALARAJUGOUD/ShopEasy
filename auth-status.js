document.addEventListener("DOMContentLoaded", () => {
  const authLink = document.getElementById("auth-link");
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (loggedInUser) {
    // Replace login link with dropdown
    authLink.innerHTML = `
      <div class="user-dropdown">
        <button class="user-dropdown-btn">👤 ${loggedInUser.username}</button>
        <div class="user-dropdown-content">
          <a href="#" id="my-profile-btn">My Profile</a>
          <a href="account.html" id="my-profile-btn">My Account</a>

          <a href="#">Orders</a>
          <a href="#" id ="logout-btn" >Log out</a>
          
        </div>
      </div>
    `;

    // Logout functionality
    // document.getElementById("logout-btn").addEventListener("click", (e) => {
    //   e.preventDefault();
    //   localStorage.removeItem("loggedInUser");
    //   alert("You have logged out!");
    //   window.location.href = "login.html";
    // });

    
    // Logout functionality (with modal)
document.getElementById("logout-btn").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("logout-modal").style.display = "flex";
});

// Confirm logout
document.getElementById("confirm-logout").addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  alert("You have logged out!");
  window.location.href = "login.html";
});

// Cancel logout
document.getElementById("cancel-logout").addEventListener("click", () => {
  document.getElementById("logout-modal").style.display = "none";
});

    // My Profile functionality
    document.getElementById("my-profile-btn").addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById("profile-username").textContent = loggedInUser.username || "-";
      document.getElementById("profile-email").textContent = loggedInUser.email || "-";
      document.getElementById("profile-phone").textContent = loggedInUser.phone || "-";
      document.getElementById("profile-address").textContent = loggedInUser.address || "-";

      document.getElementById("profile-modal").style.display = "block";
    });

    // Close Profile Modal
    document.getElementById("close-profile").addEventListener("click", () => {
      document.getElementById("profile-modal").style.display = "none";
    });

    window.onclick = function(event) {
      if (event.target === document.getElementById("profile-modal")) {
        document.getElementById("profile-modal").style.display = "none";
      }
    };
  }
});
