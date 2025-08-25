const searchBox = document.querySelector(".search-box input");

searchBox.addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const resultsContainer = document.createElement("div");
  resultsContainer.classList.add("search-results");

  // clear old results
  document.querySelectorAll(".search-results").forEach(el => el.remove());

  if (query.length > 1) {
    let allProducts = [...mensProducts, ...womensProducts, ...kidsProducts];

    // filter by title or category
    let results = allProducts.filter(p =>
      p.title.toLowerCase().includes(query) ||
      p.category?.toLowerCase().includes(query)
    );

    // if no results
    if (results.length === 0) {
      resultsContainer.innerHTML = `<p style="padding:10px;">No products found</p>`;
    }

    results.forEach((p, index) => {
      // clean price → number only
      const priceNumber = parseInt(p.price.toString().replace(/[^0-9]/g, ""));

      const item = document.createElement("div");
      item.classList.add("search-item");

      item.innerHTML = `
        <img src="${p.img}" alt="${p.title}" width="50" height="50">
        <div class="search-info">
          <span class="search-title">${p.title}</span>
          <span class="search-price">₹${priceNumber}</span>
        </div>
        <button class="add-btn" onclick="addToCartFromSearch(${allProducts.indexOf(p)})">Add</button>
      `;

      resultsContainer.appendChild(item);
    });

    this.parentElement.appendChild(resultsContainer);
  }
});


// ✅ Helper: Add to Cart from Search
function addToCartFromSearch(index) {
  let allProducts = [...mensProducts, ...womensProducts, ...kidsProducts];
  let product = allProducts[index];

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // clean price → number only
  let priceNumber = parseInt(product.price.toString().replace(/[^0-9]/g, ""));

let cartProduct = {
  id: product.id || "search-" + index,
  name: product.title,   // ✅ match "name"
  price: priceNumber,    // numeric
  image: product.img,    // ✅ match "image"
  qty: 1
};

  let existing = cart.find(item => item.id === cartProduct.id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push(cartProduct);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${product.title} added to cart ✅`);

}
