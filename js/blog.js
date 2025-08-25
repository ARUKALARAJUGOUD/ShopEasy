

const blogPosts = [
  {
    title: "Top 10 Must-Have Products for 2025",
    image: "images/Modern Design Studio.png",
    excerpt: "Discover the trending products you need this year, from fashion to gadgets.",
    author: "ShopEase Team",
    date: "August 10, 2025",
    link: "single-blog.html?id=1"
  },
  {
    title: "5 Fashion Tips to Upgrade Your Style",
    image: "images/Modern Electronic Devices.png",
    excerpt: "Simple styling hacks to look trendy without breaking the bank.",
    author: "Jane Doe",
    date: "August 5, 2025",
    link: "single-blog.html?id=2"
  },
  {
    title: "How to Shop Smart and Save Money",
    image: "images/Family Moment at Grocery Checkout.png",
    excerpt: "Learn clever ways to get discounts and maximize your shopping budget.",
    author: "John Smith",
    date: "July 29, 2025",
    link: "single-blog.html?id=3"
  }
];

const Blogcontainer = document.getElementById("blog-container");

blogPosts.forEach(post => {
  const card = document.createElement("div");
  card.classList.add("blog-card");
  card.innerHTML = `
    <img src="${post.image}" alt="${post.title}">
    <div class="blog-content">
      <div class="blog-meta">By ${post.author} | ${post.date}</div>
      <h3>${post.title}</h3>
      <p>${post.excerpt}</p>
      <a href="${post.link}" class="read-more">Read More</a>
    </div>
  `;
  Blogcontainer.appendChild(card);
});




  const menuIcon = document.getElementById("menu-icon");
  const navLinks = document.getElementById("nav-links");

  menuIcon.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

