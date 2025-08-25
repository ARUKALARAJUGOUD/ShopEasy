
let checkoutItems = JSON.parse(localStorage.getItem("checkoutItems")) || [];

const productList = document.getElementById("products-list");
const orderTotal = document.getElementById("order-total");
let total = 0;

checkoutItems.forEach(item => {
  total += item.price * (item.quantity || 1);
  let div = document.createElement("div");
  div.className = "product";
  div.innerHTML = `
    <span>${item.name} (x${item.quantity || 1})</span>
    <span>₹${item.price * (item.quantity || 1)}</span>`;
  productList.appendChild(div);
});
orderTotal.textContent = total;

// Toggle Online Payment
document.querySelectorAll("input[name='payment']").forEach(radio => {
  radio.addEventListener("change", () => {
    document.getElementById("onlinePayment").classList.toggle("hidden", radio.value !== "online");
  });
});

document.getElementById("checkoutForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  // Collect user details
  const userDetails = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    state: document.getElementById("state").value,
    pincode: document.getElementById("pincode").value,
    payment: document.querySelector("input[name='payment']:checked").value
  };

  // === Generate Invoice Number & Date ===
  const invoiceNumber = "INV-" + Math.floor(100000 + Math.random() * 900000);
  const today = new Date().toLocaleDateString();

  // ✅ Generate PDF
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // === Header / Logo ===
  doc.setFontSize(20);
  doc.text("🛒 ShopEase", 14, 20);
  doc.setFontSize(12);
  doc.text("Your Trusted Online Store", 14, 28);

  // Invoice Details
  doc.setFontSize(12);
  doc.text(`Invoice No: ${invoiceNumber}`, 150, 20);
  doc.text(`Date: ${today}`, 150, 28);

  // === Customer Info ===
  doc.setFontSize(14);
  doc.text("Customer Details", 14, 45);
  doc.setFontSize(12);
  doc.text(`Name: ${userDetails.name}`, 14, 55);
  doc.text(`Phone: ${userDetails.phone}`, 14, 62);
  doc.text(`Email: ${userDetails.email}`, 14, 69);
  doc.text(`Address: ${userDetails.address}, ${userDetails.city}, ${userDetails.state} - ${userDetails.pincode}`, 14, 76);
  doc.text(`Payment Method: ${userDetails.payment === "cod" ? "Cash on Delivery" : "Online"}`, 14, 83);

  // === Build Table Rows (No Images) ===
  let tableRows = [];
  checkoutItems.forEach(item => {
    let subtotal = item.price * (item.quantity || 1);
    tableRows.push([item.name, item.quantity || 1, `₹${item.price}`, `₹${subtotal}`]);
  });

  // === Render Product Table ===
  doc.autoTable({
    startY: 95,
    head: [["Product", "Qty", "Price", "Subtotal"]],
    body: tableRows
  });

  // === Total ===
  let finalY = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(14);
  doc.text(`Total Amount: ₹${total}`, 14, finalY);

  // === Footer ===
  doc.setFontSize(12);
  doc.text("Thank you for shopping with ShopEase!", 14, finalY + 15);
  doc.text("For support, contact: support@shopease.com", 14, finalY + 22);

  // Save PDF
  doc.save(`ShopEase_Invoice_${invoiceNumber}.pdf`);

  // ✅ Remove ordered items only
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const remaining = cart.filter(c => !checkoutItems.find(o => o.name === c.name));
  localStorage.setItem("cart", JSON.stringify(remaining));
  localStorage.removeItem("checkoutItems");

  alert("✅ Order placed successfully! Invoice downloaded.");
  window.location.href = "index.html";
});
