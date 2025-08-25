
// js/cart-utils.js
(function () {
  // Safe getters/setters
  window.getCart = function () {
    try { return JSON.parse(localStorage.getItem("cart")) || []; }
    catch { return []; }
  };

  window.setCart = function (cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  // 🔁 Normalize old keys -> new keys (qty/name/image)
  (function migrateCartKeys() {
    const cart = getCart();
    let changed = false;
    cart.forEach(item => {
      if (item.quantity != null && (item.qty == null || item.qty === 0)) {
        item.qty = Number(item.quantity) || 1;
        delete item.quantity;
        changed = true;
      }
      if (item.title && !item.name) { item.name = item.title; changed = true; }
      if (item.img && !item.image) { item.image = item.img; changed = true; }
    });
    if (changed) setCart(cart);
  })();

  // 🧮 Update the badge in the header
  window.updateCartCount = function () {
    const cart = getCart();
    const total = cart.reduce((sum, item) => sum + (Number(item.qty) || 0), 0);
    const badge = document.getElementById("cart-count");
    if (badge) badge.textContent = total;
  };

  // Keep the badge correct on page load
  document.addEventListener("DOMContentLoaded", updateCartCount);
})();
