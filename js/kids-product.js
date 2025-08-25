

const kidsProducts = [
  {
    title: "Remote Control Car",
    price: "₹799",
    rating: " 4.5 ⭐",
    img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ2SLTEAebmGXJYsAfQwZSsRuHeGEScqKBTFOuuZtKwGtF9rutjHWSJQ59qEgv7o9W1uHwFJ6aiEo3kalnoeBDXn-0UH2_OOqbuEWzFFe_J_u_G8tiNrG7Cbg"
  },
  {
    title: "Soft Teddy Bear",
    price: "₹399",
    rating: " 4.7 ⭐",
    img: "https://m.media-amazon.com/images/I/617OBlRSVTL.jpg"
  },
  {
    title: "Building Blocks Set",
    price: "₹599",
    rating: " 4.6 ⭐",
    img: "https://m.media-amazon.com/images/I/51-gT3KlbrL._UF1000,1000_QL80_.jpg"
  },
  {
    title: "Drawing Color Kit",
    price: "₹299 ",
    rating: " 4.4 ⭐",
    img: "https://rukminim2.flixcart.com/image/1200/1200/xif0q/art-set/k/z/f/colours-set-or-drawing-kit-for-kids-68-pc-color-tools-art-original-imahbgrxfne875g3.jpeg"
  },
  {
    title: "Kids Story Books Set",
    price: "₹499 ",
    rating: " 4.8 ⭐",
    img: "https://images.meesho.com/images/products/452225300/nz6dk_1200.jpg?width=512"
  },
  {
    title: "Mini Slide Toy",
    price: "₹899 ",
    rating: " 4.2 ⭐",
    img: "https://m.media-amazon.com/images/I/41tv8zGTH5L._UF894,1000_QL80_.jpg"
  },
  {
    title: "Kids Kitchen Play Set",
    price: "₹1,299 ",
    rating: " 4.6 ⭐", 
    img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQF8uUJ-MZX6ZJHYjiBpox5Hd8nOSjOHbIhybl_z4DQo_-8mCkpdPSLi0pKAmw2pFkvPlU8mT85HtHEwXYJjucIEDY3i8YPferyy2aqh4G6XKlQL8KsZ1v1tUlQoQ4cI-D1-gndui4&usqp=CAc"
  },
  {
    title: "Toy Train with Tracks",
    price: "₹749",
    rating: " 4.5 ⭐",
    img: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/20827622a.webp"
  },
  {
    title: "Doctor Pretend Play Kit",
    price: "₹599 ",
    rating: " 4.4 ⭐",
    img: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/2489630a.webp"
  },
  {
    title: "Electric Bubble Gun Toy",
    price: "₹349 ",
    rating: " 4.6 ⭐",
    img: "https://m.media-amazon.com/images/I/61ueEMvbcCL.jpg"
  },
  {
    title: "Foldable Baby Tricycle",
    price: "₹2,999",
    rating: " 4.7 ⭐",
    img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTnWNbUTwhLCRAoRNxfgIrwcWUP5BmhQEmbX6hbYhVcU52qzfycVOvgZ5XNzesCRebDUaO9u5DUmsgT3RQ3NSjmzcCjfxP32JmvrI5vtPMl&usqp=CAc"
  },
  {
    title: "Magnetic Drawing Board",
    price: "₹429",
    rating: " 4.3 ⭐",
    img: "https://m.media-amazon.com/images/I/71DJf9n27GL.jpg"
  }
];







// ✅ Render Kids Products
function renderKidsProducts() {
  const container = document.getElementById("kids-products");
  container.innerHTML = "";
  kidsProducts.forEach((product, index) => {
    const card = document.createElement("div");
    card.className = "kids-card";
    card.innerHTML = `
      <img src="${product.img}" alt="${product.title}">
      <div class="details">
        <h4 class="product-title">Title:${product.title}</h4>
        <p class="product-price">Price:${product.price}</p>
        <p class="product-rating">Rating:${product.rating}</p>
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


  // localStorage.setItem(cartKey, JSON.stringify(cart));








  alert(`✅ Added to cart: ${cartProduct.name}`);
  updateCartCount();
}

renderKidsProducts();