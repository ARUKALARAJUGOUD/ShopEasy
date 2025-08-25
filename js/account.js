
document.addEventListener("DOMContentLoaded", () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!loggedInUser) {
    alert("⚠️ Please log in first.");
    window.location.href = "login.html";
    return;
  }

  // Fill user details
  document.getElementById("account-username").textContent = loggedInUser.username;
  document.getElementById("account-email").textContent = loggedInUser.email || "-";
  document.getElementById("account-phone").textContent = loggedInUser.phone || "-";
  document.getElementById("account-address").textContent = loggedInUser.address || "-";
  document.getElementById("account-pic").src = loggedInUser.avatar || "https://via.placeholder.com/100";

  // Upload avatar
  document.getElementById("account-upload").addEventListener("change", function() {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        loggedInUser.avatar = e.target.result;
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

        let users = JSON.parse(localStorage.getItem("users")) || [];
        let currentUser = users.find(u => u.username === loggedInUser.username);
        if (currentUser) {
          currentUser.avatar = loggedInUser.avatar;
          localStorage.setItem("users", JSON.stringify(users));
        }

        document.getElementById("account-pic").src = loggedInUser.avatar;
      };
      reader.readAsDataURL(file);
    }
  });

  // Tabs
  document.querySelectorAll(".tab-link").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      document.querySelectorAll(".tab-link").forEach(l => l.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
      link.classList.add("active");
      document.getElementById("tab-" + link.dataset.tab).classList.add("active");
    });
  });

  // Save settings
  document.getElementById("account-settings-form").addEventListener("submit", e => {
    e.preventDefault();
    loggedInUser.email = document.getElementById("settings-email").value.trim();
    loggedInUser.phone = document.getElementById("settings-phone").value.trim();
    loggedInUser.address = document.getElementById("settings-address").value.trim();

    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUser = users.find(u => u.username === loggedInUser.username);
    if (currentUser) {
      currentUser.email = loggedInUser.email;
      currentUser.phone = loggedInUser.phone;
      currentUser.address = loggedInUser.address;
      localStorage.setItem("users", JSON.stringify(users));
    }

    alert("✅ Profile updated!");
    location.reload();
  });

  // Logout
  document.getElementById("logout-account").addEventListener("click", e => {
    e.preventDefault();
    localStorage.removeItem("loggedInUser");
    alert("Logged out!");
    window.location.href = "login.html";
  });
});
