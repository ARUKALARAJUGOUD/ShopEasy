const womensProducts = [
  {
    title: "Floral Summer Dress",
    price: "₹1,299",
    rating: "4.6",
    img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRhl-y-WZQFuvq_sDT7ZVoVVbfglUVKIkHG8AlZuvOUStNkHJaxc2xQxWTBeHuNGxzvrxY71NxYMQUSlIHQNH-VsScoAQ6wy1Rgkn2BpWUJ"
  },
  {
    title: "Handbag Combo Set",
    price: "₹899",
    rating: "4.4 ⭐",
    img: "https://m.media-amazon.com/images/I/51F0oN3LGqL._UY1000_.jpg"
  },
  {
    title: "Gold Plated Necklace",
    price: "₹499",
    rating: "4.3 ⭐",
    img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSfVF1KimL1VfDWYbEXpGiF7dM98ZBQzkfYRFn4qZVGVpZPNjYFiPNY5AsbPSwkZE0f7z0qnN-WBM70w2-5aD0d5htuXANBZdKgZvld04w8n1RVB0OXbAWoAGRHVuMZy08AJ-UliBA&usqp=CAc"
  },
  {
    title: "Ankle Strap Heels",
    price: "₹1,799",
    rating: "4.5 ⭐",
    img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQTuQ8JLBHL7m5kqN2YC1VAxHC4QIzBvvQZr5JSgJmK__U2HYz0BIQrhBXOMwmSf2UQlMAPmeePJVl87gW91iB1QTd6XA5aDVmIGAqQN6k"
  },
  {
    title: "Cotton Printed Kurti",
    price: "₹749",
    rating: "4.2 ⭐",
    img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQJJccF4oO8EXDay3Ksid0k-WIdFsodszMEw0znY1VedckqtnrgVZ0gO8cavgK2AfSKIzTKwBsk0LWY1mDy9y2H46f7W_kcgYvwIYbdwEbp"
  },
  {
    title: "Trendy Sunglasses",
    price: "₹399",
    rating: "4.1 ⭐",
    img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcS9A-omQGK1O8Cnf87f3SHx_8tLXZZR4P00FAv0zgyC6mO7ms7tJvha3Jp1lUMTi4yHtU4lUETYINK6ENqOWnT9Xn4oU3zHZCq1xGYsIQPwSaVl0ZTZZF150x8"
  },
  {
    title: "Boho Earrings Set",
    price: "₹299",
    rating: "4.3 ⭐",
    img: "https://m.media-amazon.com/images/I/71EvG6QydGL._SY695_.jpg"
  },
  {
    title: "Women’s Sling Bag",
    price: "₹699",
    rating: "4.4 ⭐",
    img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTWmV8GgUTJp4KjDK5YY4lC4U-YjfUxIrUdWmIWSjLy9W141AR2nKp5hWbk4ToNhbLouFo6X3ns09ThYS7Ay8agw2rb6C2rmtvhDtZyLcq4wflfcFOXDjCLxWI"
  },
  {
    title: "Ethnic Palazzo Pants",
    price: "₹649",
    rating: "4.2 ⭐",
    img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSC-wzFyN20sDLbiP_rNx6MXolMyGwnMXtTuFZkUYl73t2OnuyNnsKgFvwVj53Mmxel2oUB0olORHct7FCX2-z-kXu6ei-9ThGg3MY1UKRFZ0aFyYeWFErz1w"
  },
  {
    title: "Lightweight Shawl Wrap",
    price: "₹899",
    rating: "4.5 ⭐",
    img: "http://assets.myntassets.com/v1/assets/images/27946704/2024/2/29/04bbb9d9-535d-4b47-a6d3-799f6d4525cd1709200954285StyleQuotientWomenAnimalPrintedScarfs1.jpg"
  }
];

function renderWomensProducts() {
  const container = document.getElementById("womens-products");
  womensProducts.forEach((product, index) => {
    const card = document.createElement("div");
    card.className = "womens-card";
    card.innerHTML = `
      <img src="${product.img}" alt="${product.title}">
      <div class="details">
        <h4>${product.title}</h4>
        <p>Price: ${product.price}</p>
        <p>Rating: ${product.rating}</p>
        <div class="buttons">
          <button class="add-btn" onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
         
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function addToCart(product) {
  console.log(product)
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


renderWomensProducts();
