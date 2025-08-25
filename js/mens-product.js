
const mensProducts = [
  {
    title: "Men's Leather Wallet",
    price: "₹999",
    rating: "4.6 ⭐",
    img: "https://www.thewalletstore.in/cdn/shop/files/Walletbox.jpg?v=1737306822&width=1000"
  },
  {
    title: "Formal Black Shoes",
    price: "₹2,499",
    rating: "4.4 ⭐",
    img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR01jOCi87j5WOdL_G-F48lPrt34m0K8binNHQV_xsaVp-hSEJ2rwSc7kfIKjCXYcpfDL0_9bEy_cRC8ejhjQHvY3Z6HvWlprNcq10HFR4"
  },
  {
    title: "Blue Denim Jeans",
    price: "₹1,499",
    rating: "4.5 ⭐",
    img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcREoDgE8mKvTjSVP3Q4Byt8qkcCeNRpHagfca03icwhj0LS6CKbNDLGtVeO3YEI_jdIxNwtNH5KPKFqE7uTJZgXKhzmPLqS9LUWpgpbfxDtuuTWLQJ8bulm8rFPqPVOz0HOHQ1yHVicFryb&usqp=CAc"
  },
  {
    title: "Classic Analog Watch",
    price: "₹1,799",
    rating: "4.7 ⭐",
    img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQd4PSEJvVgAN7It4dFVPsmhfLTCgjFNehQgKfzpAHrX05jicZe_Wr4WCatyNugx9VwT4AzqS01PiT-orqvT1FGUdnqpf-sBn07suQ2VbkBrxW3RFB4Dwbuovfyz9iw7eT_cv3jPYQ&usqp=CAc"
  },
  {
    title: "Men's Hoodie Sweatshirt",
    price: "₹1,099",
    rating: "4.3 ⭐",
    img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTh4LYchqmh3DFdb6jmyuEoKYS02DWHJGqLo5KyVcdBV4KaGWb_pXnvXIwp6vusHLtyf_QS_tTnAeq4ApJPseXn2z-vErEJmV7avS0NkNJKgjhI5hnxEYluarBF2rMt2mi0VmSGjAb9XRk&usqp=CAc"
  },
  {
    title: "Stylish Sunglasses",
    price: "₹649",
    rating: "4.2 ⭐",
    img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSAqS_4EdUnG3_gMJ_GGw8dmlH5Zz_V2bHj9C7nyw50kEr-C-f0DWjcIpTxMpd41aRacFuO6JwaLDLN90vMKtebKnpTJFTkYjItH0P6pwY0VJdTzQHhkHo9b24n56aNm1MhMEK7apD4VXQ&usqp=CAc"
  },
  {
    title: "Slim Fit Casual Shirt",
    price: "₹899",
    rating: "4.5 ⭐",
    img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTMe_T_DY5biceBymsbeRHv-XvDmz4deqGa6vwWbEmszWjfJKe1WWBWcQwYxe9b5JMkfCl9wKlrNPKviFXCjzWFp0Bv4tZt1kWLjY9AdTeW_ZiDfJcg6E6-eQ&usqp=CAc"
  },
  {
    title: "Men's Sports Running Shoes",
    price: "₹1,299",
    rating: "4.4 ⭐",
    img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRbW4pZ4PEDAHkOFIfpJVYyRhXI3bqbuz4w9FlGKQguQyAGzDXQ8gJpzJdcp-lZdN9teDr0Di-a-b34lAH3IwPEJ06f23sDFFM6kVVWFSc7sq3r4xi1NUD56w"
  },
  {
    title: "Winter Bomber Jacket",
    price: "₹2,999",
    rating: "4.6 ⭐",
    img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSMKxH-dLoLYhkhpE43fSGktUNAI_4Gd7rdsNHpkz4Qw3pn87vIIH_k1vPcPg_74Z8zYiiv1Jwc_yPylijjLDxMWTaKjXZpE9s9RenEVbA"
  },
  {
    title: "Men's Analog Digital Watch",
    price: "₹1,199",
    rating: "4.3 ⭐",
    img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSaSmb1DpA6i54YESGQGhg6e56z0FhGvAIby_GUzuhDgkoNx8fWV4IPck1iYpDCZRL0s7PLe6KvksZSt8kKXlzieJ_NPl28ZKcld4abhPBvYl8pUq_YkCtw0Q"
  }
];


// ✅ Render Kids Products
function renderMensProducts() {
  const carousel = document.getElementById("mensCarousel");
  
  carousel.innerHTML = "";
mensProducts.forEach((product, index) => {
  const card = document.createElement("div");
  card.className = "product-card";

  // assign unique id
  product.id = `men-${index}`;

  card.innerHTML = `
    <img src="${product.img}" alt="${product.title}" />
    <h4>${product.title}</h4>
    <div class="price">Price: ${product.price}</div>
    <div class="rating">Rating: ${product.rating}</div>

    <button class="add-btn"> Add to Cart</button>
    
  `;
  card.querySelector(".add-btn").addEventListener("click", () => {
    addToCart(product);   // pass full product
  });
   carousel.appendChild(card);

});

}

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
}


function addToCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = productList[index];

  // ✅ clean price → number only
  const priceNumber = parseInt(product.price.toString().replace(/[^0-9]/g, ""));

  const cartProduct = {
    id: product.id || index + "-" + productList,  // unique id
    title: product.title,
    price: priceNumber,   // ✅ numeric only
    img: product.img,
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
  alert(`✅ Added to cart: ${product.title}`);

   // 🔥 Update cart count in header
  updateCartCount();
}



renderMensProducts();