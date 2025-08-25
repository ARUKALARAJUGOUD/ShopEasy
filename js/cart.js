let cart = JSON.parse(localStorage.getItem("cart")) || [];




function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const emptyCartMsg = document.getElementById("empty-cart");
  let total = 0;
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    emptyCartMsg.style.display = "block";
    document.querySelector(".cart-summary").style.display = "none";
    return;
  } else {
    emptyCartMsg.style.display = "none";
    document.querySelector(".cart-summary").style.display = "block";
  }

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;

    const cartRow = document.createElement("div");
    cartRow.className = "cart-item";
   



cartRow.innerHTML = `
  <img src="${item.image}" alt="${item.name}" class="cart-img">
  <div class="cart-details">
    <h4>${item.name}</h4>
    <p>Price: ₹${item.price}</p>
    <div class="qty-controls">
      <button onclick="changeQty(${index}, -1)">-</button>
      <span>${item.qty}</span>
      <button onclick="changeQty(${index}, 1)">+</button>
    </div>
    <button class="buy-btn" onclick="buyNowSingle(${index})">Buy Now</button>
    <button onclick="removeItem(${index})" class="remove-btn">Remove</button>
  </div>
`;





    cartItems.appendChild(cartRow);

  });


  // ✅ Only final total
  document.getElementById("cart-final").textContent = total.toFixed(2);
}




function changeQty(index, change) {
  cart[index].qty += change;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  saveCart();
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
}

function clearCart() {
  cart = [];
  saveCart();
  renderCart();
}

function checkoutAll() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  localStorage.setItem("checkoutItems", JSON.stringify(cart));
  window.location.href = "checkout.html";
}

function buyNowSingle(index) {
  if (!cart[index]) return;
  localStorage.setItem("checkoutItems", JSON.stringify([cart[index]]));
  window.location.href = "checkout.html";
}

// On page load
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  updateCartCount();
});







function changeQty(index, change) {
  cart[index].qty += change;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();

}

function clearCart() {
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();

}

renderCart();

// Run when page loads
document.addEventListener("DOMContentLoaded", updateCartCount);



// Checkout all products in cart
function checkoutAll() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  localStorage.setItem("checkoutItems", JSON.stringify(cart));
  window.location.href = "checkout.html";
}



      // Buy Now for single item by index
function buyNowSingle(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (!cart[index]) return;

  localStorage.setItem("checkoutItems", JSON.stringify([cart[index]]));
  window.location.href = "checkout.html";
}












