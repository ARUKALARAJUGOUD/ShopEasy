// let cart = JSON.parse(localStorage.getItem("cart")) || [];
// const cartContainer = document.getElementById("cart-container");

// function renderCart() {
//   cartContainer.innerHTML = "";
//   let total = 0, discountTotal = 0;

//   if (cart.length === 0) {
//     cartContainer.innerHTML = "<p>Your cart is empty 🛍️</p>";
//     return;
//   }

//   cart.forEach((item, index) => {
//     const itemTotal = item.price * item.qty;
//     const discount = (item.discount / 100) * itemTotal;
//     total += itemTotal;
//     discountTotal += discount;

//     cartContainer.innerHTML += `
//       <div class="cart-item">
//         <img src="${item.image}" alt="${item.name}">
//         <div class="cart-details">
//           <h4>${item.name}</h4>
//           <p>Price: ₹${item.price} <span class="discount">(${item.discount}% off)</span></p>
//           <div class="qty-controls">
//             <button onclick="changeQty(${index}, -1)">-</button>
//             <span>${item.qty}</span>
//             <button onclick="changeQty(${index}, 1)">+</button>
//           </div>
//           <p>Subtotal: ₹${(itemTotal - discount).toFixed(2)}</p>
//           <button class="buy-btn">Buy Now</button>
//           <button onclick="removeItem(${index})" class="remove-btn">Remove</button>
//         </div>
//       </div>
//     `;
//   });

//   document.getElementById("cart-total").textContent = total.toFixed(2);
//   document.getElementById("cart-discount").textContent = discountTotal.toFixed(2);
//   document.getElementById("cart-final").textContent = (total - discountTotal).toFixed(2);
// }

// function changeQty(index, change) {
//   cart[index].qty += change;
//   if (cart[index].qty <= 0) cart.splice(index, 1);
//   localStorage.setItem("cart", JSON.stringify(cart));
//   renderCart();
// }

// function removeItem(index) {
//   cart.splice(index, 1);
//   localStorage.setItem("cart", JSON.stringify(cart));
//   renderCart();
// }

// renderCart();
