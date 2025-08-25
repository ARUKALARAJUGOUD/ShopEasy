
const latestProducts = [
  {
    id: 1,
    title: "Wireless Bluetooth Headphones",
    price: "₹2,199",
    rating: "4.5 ⭐",
    category: "electronics",
    img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcREMsIMq0DhXuEvlCZNQfRSMu9C_L_E1_P6lzslecRo0Pta4qlHvMORsfZ86ku5XqIQXkzROVmMTyG8-Un_D_WG-3vunwIWkjSngUX_l5VW"
  },
  {
    id: 2,
    title: "Men's Casual Shirt",
    price: "₹899",
    rating: "4.3 ⭐",
    category: "clothing",
    img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT0yUlOp5NAqd3m-gXDUHgb0_Bj2w1lA-fIL9ebCJPu5I-uk0YVpKV894Z-yXSdw-Ydm4ITZUIPTaKli7GUJxsAX-ks99XDfqNDJANvziyxmFrN3YeP-O0A1yRDpkO8FPHy975zrBs&usqp=CAc"
  },
  {
    id: 3,
    title: "Smart LED Bulb",
    price: "₹499",
    rating: "4.6 ⭐",
    category: "home",
    img: "https://m.media-amazon.com/images/I/71YFwWxKHTL.jpg"
  },
  {
    id: 4,
    title: "Stainless Steel Water Bottle",
    price: "₹349",
    rating: "4.2 ⭐",
    category: "home",
    img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSs2nVNEhlrCx5mXBLKa_dFUUx19BradZ7ctRHFo0bF2a_CQRElMCd4mn7itPA1AEfqCOMHT18YpxDItWmF32g3vwQSogPcBgJB21WZb7F0IggxDu6MhpJs"
  },
  {
    id: 5,
    title: "Stylish Analog Watch",
    price: "₹1,299",
    rating: "4.4 ⭐",
    category: "accessories",
    img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSaSmb1DpA6i54YESGQGhg6e56z0FhGvAIby_GUzuhDgkoNx8fWV4IPck1iYpDCZRL0s7PLe6KvksZSt8kKXlzieJ_NPl28ZKcld4abhPBvYl8pUq_YkCtw0Q"
  },
  {
    id: 6,
    title: "Women's Handbag Set",
    price: "₹1,499",
    rating: "4.5 ⭐",
    category: "accessories",
    img: "https://images.meesho.com/images/products/168428713/kql15_512.webp"
  },
  {
    id: 7,
    title: "NoiseFit Smartwatch",
    price: "₹2,999",
    rating: "4.6 ⭐",
    category: "electronics",
    img: "https://m.media-amazon.com/images/I/614pTKzcPiL.jpg"
  },
  {
    id: 8,
    title: "Women's Kurti Combo",
    price: "₹1,199",
    rating: "4.3 ⭐",
    category: "clothing",
    img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTEa2bu2We5nYI0wIxP0Fjb5LfYy8eBuGdQjoE-mOzaNSk_GghHkKD0jn9GlHsnECBrrJuyn9VLG2FHACqcuADUAb3-AA7OdA"
  }
];


// const latestProducts = [/* your product data */];

const productsPerPage = 5;
let currentPage = 1;
let filteredProducts = [...latestProducts];

function renderProducts() {
  const container = document.getElementById("productContainer");
  container.innerHTML = "";

  const start = (currentPage - 1) * productsPerPage;
  const end = start + productsPerPage;
  const productsToDisplay = filteredProducts.slice(start, end);

  productsToDisplay.forEach((product,index) => {

    product.id = `product-${index}`
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.img}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p class="price">Price: ${product.price}</p>
      <p class="rating">Rating: ${product.rating}</p>
    
      <button class="add-btn"> Add to Cart</button>
    `;
    
// add to cart 
 card.querySelector(".add-btn").addEventListener("click", () => {
    addToCart(product);   // pass full product
  });
    container.appendChild(card);
  });

  // update page info
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  document.getElementById("pageInfo").textContent = `Page ${currentPage} of ${totalPages}`;
}

function handlePagination(direction) {
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  if (direction === "next" && currentPage < totalPages) {
    currentPage++;
    renderProducts();
  } else if (direction === "prev" && currentPage > 1) {
    currentPage--;
    renderProducts();
  }
}

function handleFilterChange() {
  const category = document.getElementById("categoryFilter").value;
  filteredProducts = category === "all"
    ? [...latestProducts]
    : latestProducts.filter(p => p.category === category);
  currentPage = 1;
  renderProducts();
}

// ✅ Event Delegation for dynamically created buttons
// document.getElementById("productContainer").addEventListener("click", (e) => {
//   const id = e.target.getAttribute("data-id");
//   if (e.target.classList.contains("add-to-cart")) {
//     alert(`Product ${id} added to cart! 🛒`);
//   }
//   if (e.target.classList.contains("view-more")) {
//     const product = latestProducts.find(p => p.id == id);
//     if (product) {
//       alert(`More details:\n${product.title}\nPrice: ${product.price}\nRating: ${product.rating}`);
//     }
//   }
// });

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  document.getElementById("categoryFilter").addEventListener("change", handleFilterChange);
  document.getElementById("prevBtn").addEventListener("click", () => handlePagination("prev"));
  document.getElementById("nextBtn").addEventListener("click", () => handlePagination("next"));
});





  function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const priceNumber = parseInt(product.price.toString().replace(/[^0-9]/g, ""));

  const cartProduct = {
    id: product.id + "-" + Date.now(), // make it unique every time
    name: product.title,
    price: priceNumber,
    image: product.img,
    qty: 1,
    discount: product.discount || 0
  };

  cart.push(cartProduct);  // ✅ always add new row

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`✅ Added to cart: ${cartProduct.name}`);

  updateCartCount();

}
