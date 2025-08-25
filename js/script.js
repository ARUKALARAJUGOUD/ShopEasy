    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.getElementById('nav-links');

    menuIcon.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

const productContainer = document.getElementById("productContainer");
const categoryFilter = document.getElementById("categoryFilter");


// this is for pagination 

let currentPage = 1;
const productsPerPage = 4;

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");

function renderProductsWithPagination(productList, page = 1) {
  productContainer.innerHTML = "";

  const start = (page - 1) * productsPerPage;
  const end = start + productsPerPage;
  const paginatedProducts = productList.slice(start, end);

  paginatedProducts.forEach(product => {
    const cards = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <div class="price">Price: ₹${product.price}</div>
      <div class="rating">Rating: ${product.rating} <i class="fa fa-star" aria-hidden="true"></i></div>
      <button class="add-cart" onclick="addToCart(${product.id})">Add to Cart</button>
      <button class="view-details" onclick="viewDetails(${product.id})">View More</button>
    `;
    productContainer.appendChild(card);
  });

  const totalPages = Math.ceil(productList.length / productsPerPage);
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

// Initial full list
let filteredProducts = products;

function filterProducts() {
  const category = categoryFilter.value;
  filteredProducts = products.filter(product => {
    return category === "all" || product.category === category;
  });
  currentPage = 1;
  renderProductsWithPagination(filteredProducts, currentPage);
}

// Navigation
prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderProductsWithPagination(filteredProducts, currentPage);
  }
});

nextBtn.addEventListener("click", () => {
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderProductsWithPagination(filteredProducts, currentPage);
  }
});

// Filter event listener
categoryFilter.addEventListener("change", filterProducts);

// Initial render
filterProducts();



document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.getElementById("nav-links");
    if (localStorage.getItem("userRole") === "admin") {
        const adminLink = document.createElement("li");
        adminLink.innerHTML = `<a href="admin-messages.html">Admin Messages</a>`;
        navLinks.appendChild(adminLink);
    }
});


