
// Sample blog posts (reuse the same data structure as blog.js)
const blogPosts = [
  {
    id: 1,
    title: "Top 10 Must-Have Products for 2025",
   image: "images/Modern Design Studio.png",
    author: "ShopEase Team",
    date: "August 10, 2025",
    content: `
      <p>Shopping trends in 2025 are changing fast. Here are the top 10 products you must have this season.</p>
      <h3>1. Smart Wearables</h3>
      <p>From fitness trackers to smart glasses, wearable tech is booming.</p>
      <h3>2. Eco-Friendly Fashion</h3>
      <p>Sustainability is in demand. Shoppers love eco-conscious clothing lines.</p>
      <p>... (more content here) ...</p>
    `
  },
  {
    id: 2,
    title: "5 Fashion Tips to Upgrade Your Style",
    image: "images/Modern Electronic Devices.png",
    author: "Jane Doe",
    date: "August 5, 2025",
    content: `
      <p>Looking stylish doesn’t need to be expensive. Here are 5 quick tips to upgrade your wardrobe.</p>
      <ul>
        <li>Mix basic and statement pieces</li>
        <li>Accessorize smartly</li>
        <li>Focus on fit</li>
      </ul>
      <p>... (more content here) ...</p>
    `
  },
  {
    id: 3,
    title: "How to Shop Smart and Save Money",
    image: "images/Family Moment at Grocery Checkout.png",
    author: "John Smith",
    date: "July 29, 2025",
    content: `
      <p>Everyone loves saving money. Let’s explore proven ways to get the best deals while shopping online.</p>
      <p>Tip 1: Always compare prices across platforms.</p>
      <p>Tip 2: Use seasonal sales wisely.</p>
      <p>... (more content here) ...</p>
    `
  }
];

// Get blog ID from URL
const params = new URLSearchParams(window.location.search);
const postId = parseInt(params.get("id"));

const post = blogPosts.find(p => p.id === postId);

if (post) {
  document.getElementById("post-title").textContent = post.title;
  document.getElementById("post-meta").textContent = `By ${post.author} | ${post.date}`;
  document.getElementById("post-image").src = post.image;
  document.getElementById("post-content").innerHTML = post.content;

  // Show related posts (exclude current)
  const related = blogPosts.filter(p => p.id !== postId);
  const container = document.getElementById("related-container");

  related.forEach(r => {
    const card = document.createElement("div");
    card.classList.add("related-card");
    card.innerHTML = `
      <img src="${r.image}" alt="${r.title}">
      <div class="info">
        <h3>${r.title}</h3>
        <a href="single-blog.html?id=${r.id}">Read More</a>
      </div>
    `;
    container.appendChild(card);
  });
} else {
  document.querySelector(".article-container").innerHTML = "<p>Blog post not found.</p>";
}


// ------------------- COMMENT SYSTEM WITH INLINE REPLY FORMS -------------------
const commentForm = document.getElementById("comment-form");
const commentList = document.getElementById("comment-list");

let editMode = { active: false, index: null, parentIndex: null };

function loadComments() {
  const allComments = JSON.parse(localStorage.getItem("blogComments")) || {};
  const postComments = allComments[postId] || [];

  commentList.innerHTML = "";

  postComments.forEach((c, index) => {
    const div = document.createElement("div");
    div.classList.add("comment-item");
    div.innerHTML = `
      <h4>${c.name}</h4>
      <small>${c.date}</small>
      <p>${c.text}</p>
      <button class="reply-comment" data-index="${index}">💬 Reply</button>
      <button class="edit-comment" data-index="${index}">✏️</button>
      <button class="delete-comment" data-index="${index}">🗑️</button>
      <div class="replies"></div>
    `;

    renderReplies(div.querySelector(".replies"), c.replies, index);

    commentList.appendChild(div);
  });

  attachEvents();
}

function renderReplies(container, replies, parentIndex) {
  if (!replies) return;
  replies.forEach((r, rIndex) => {
    const replyDiv = document.createElement("div");
    replyDiv.classList.add("reply-item");
    replyDiv.innerHTML = `
      <h5>${r.name}</h5>
      <small>${r.date}</small>
      <p>${r.text}</p>
      <button class="reply-to-reply" data-pindex="${parentIndex}" data-rindex="${rIndex}">💬 Reply</button>
      <button class="edit-reply" data-pindex="${parentIndex}" data-rindex="${rIndex}">✎</button>
      <button class="delete-reply" data-pindex="${parentIndex}" data-rindex="${rIndex}">🗑️</button>
      <div class="nested-replies"></div>
    `;
    container.appendChild(replyDiv);

    // Render nested replies
    renderReplies(replyDiv.querySelector(".nested-replies"), r.replies, parentIndex + "-" + rIndex);
  });
}

function attachEvents() {
  // Delete comment
  document.querySelectorAll(".delete-comment").forEach(btn => {
    btn.addEventListener("click", function() {
      const index = this.dataset.index;
      const allComments = JSON.parse(localStorage.getItem("blogComments")) || {};
      allComments[postId].splice(index, 1);
      localStorage.setItem("blogComments", JSON.stringify(allComments));
      loadComments();
    });
  });

  // Edit comment
  document.querySelectorAll(".edit-comment").forEach(btn => {
    btn.addEventListener("click", function() {
      const index = this.dataset.index;
      const allComments = JSON.parse(localStorage.getItem("blogComments")) || {};
      const currentComment = allComments[postId][index];

      document.getElementById("comment-name").value = currentComment.name;
      document.getElementById("comment-text").value = currentComment.text;

      editMode = { active: true, index, parentIndex: null };
      commentForm.querySelector("button").textContent = "Update Comment";
      window.scrollTo({ top: commentForm.offsetTop, behavior: "smooth" });
    });
  });

  // Reply to comment
  document.querySelectorAll(".reply-comment").forEach(btn => {
    btn.addEventListener("click", function() {
      const parentIndex = this.dataset.index;
      showReplyForm(this.parentElement, parentIndex, null);
    });
  });

  // Reply to reply
  document.querySelectorAll(".reply-to-reply").forEach(btn => {
    btn.addEventListener("click", function() {
      const pIndex = this.dataset.pindex;
      const rIndex = this.dataset.rindex;
      showReplyForm(this.parentElement, pIndex, rIndex);
    });
  });

  // Edit reply
  document.querySelectorAll(".edit-reply").forEach(btn => {
    btn.addEventListener("click", function() {
      const pIndex = this.dataset.pindex;
      const rIndex = this.dataset.rindex;
      const allComments = JSON.parse(localStorage.getItem("blogComments")) || {};
      const reply = findReply(allComments[postId], pIndex, rIndex);

      document.getElementById("comment-name").value = reply.name;
      document.getElementById("comment-text").value = reply.text;

      editMode = { active: true, index: rIndex, parentIndex: pIndex };
      commentForm.querySelector("button").textContent = "Update Reply";
      window.scrollTo({ top: commentForm.offsetTop, behavior: "smooth" });
    });
  });

  // Delete reply
  document.querySelectorAll(".delete-reply").forEach(btn => {
    btn.addEventListener("click", function() {
      const pIndex = this.dataset.pindex;
      const rIndex = this.dataset.rindex;
      const allComments = JSON.parse(localStorage.getItem("blogComments")) || {};
      deleteReply(allComments[postId], pIndex, rIndex);
      localStorage.setItem("blogComments", JSON.stringify(allComments));
      loadComments();
    });
  });
}

// --------- REPLY FORM HANDLER ---------
// function showReplyForm(container, parentIndex, rIndex) {
//   // Remove old reply forms
//   document.querySelectorAll(".inline-reply-form").forEach(f => f.remove());

//   const form = document.createElement("form");
//   form.classList.add("inline-reply-form");
//   form.innerHTML = `
//     <input type="text" placeholder="Your Name" class="reply-name" required>
//     <textarea placeholder="Write a reply..." class="reply-text" required></textarea>
//     <button type="submit">Reply</button>
//   `;

//   form.addEventListener("submit", function(e) {
//     e.preventDefault();
//     const name = form.querySelector(".reply-name").value.trim();
//     const text = form.querySelector(".reply-text").value.trim();

//     if (!name || !text) return;

//     const allComments = JSON.parse(localStorage.getItem("blogComments")) || {};
//     if (!allComments[postId]) allComments[postId] = [];

//     addReply(allComments[postId], parentIndex, rIndex, { 
//       name, text, date: new Date().toLocaleString(), replies: [] 
//     });

//     localStorage.setItem("blogComments", JSON.stringify(allComments));
//     loadComments();
//   });

//   container.appendChild(form);
// }



function showReplyForm(container, parentIndex, rIndex) {
  // Remove old reply forms
  document.querySelectorAll(".inline-reply-form").forEach(f => f.remove());

  const form = document.createElement("form");
  form.classList.add("inline-reply-form");
  form.innerHTML = `
    <input type="text" placeholder="Your Name" class="reply-name" required>
    <textarea placeholder="Write a reply..." class="reply-text" required></textarea>
    <div class="reply-actions">
      <button type="submit">Reply</button>
      <button type="button" class="cancel-reply">Cancel</button>
    </div>
  `;

  // Handle reply submit
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const name = form.querySelector(".reply-name").value.trim();
    const text = form.querySelector(".reply-text").value.trim();

    if (!name || !text) return;

    const allComments = JSON.parse(localStorage.getItem("blogComments")) || {};
    if (!allComments[postId]) allComments[postId] = [];

    addReply(allComments[postId], parentIndex, rIndex, { 
      name, text, date: new Date().toLocaleString(), replies: [] 
    });

    localStorage.setItem("blogComments", JSON.stringify(allComments));
    loadComments();
  });

  // Handle cancel button
  form.querySelector(".cancel-reply").addEventListener("click", function() {
    form.remove();
  });

  container.appendChild(form);
}





// --------- HELPER FUNCTIONS ---------
function addReply(comments, pIndex, rIndex, replyObj) {
  let target = comments;
  let path = pIndex.toString().split("-").map(n => parseInt(n));

  path.forEach((n, i) => {
    if (i === 0) target = target[n];
    else target = target.replies[n];
  });

  if (!target.replies) target.replies = [];
  target.replies.push(replyObj);
}

function findReply(comments, pIndex, rIndex) {
  let target = comments;
  let path = pIndex.toString().split("-").map(n => parseInt(n));

  path.forEach((n, i) => {
    if (i === 0) target = target[n];
    else target = target.replies[n];
  });

  return target.replies[rIndex];
}

function deleteReply(comments, pIndex, rIndex) {
  let target = comments;
  let path = pIndex.toString().split("-").map(n => parseInt(n));

  path.forEach((n, i) => {
    if (i === 0) target = target[n];
    else target = target.replies[n];
  });

  target.replies.splice(rIndex, 1);
}

// --------- MAIN COMMENT FORM ---------
if (commentForm) {
  commentForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("comment-name").value.trim();
    const text = document.getElementById("comment-text").value.trim();

    if (!name || !text) {
      alert("Please fill in both fields!");
      return;
    }

    const allComments = JSON.parse(localStorage.getItem("blogComments")) || {};
    if (!allComments[postId]) allComments[postId] = [];

    // Edit main comment
    if (editMode.active && editMode.parentIndex === null) {
      allComments[postId][editMode.index].name = name;
      allComments[postId][editMode.index].text = text;
      allComments[postId][editMode.index].date = new Date().toLocaleString();
      editMode = { active: false, index: null, parentIndex: null };
      commentForm.querySelector("button").textContent = "Post Comment";
    } 
    // New top-level comment
    else {
      allComments[postId].push({
        name,
        text,
        date: new Date().toLocaleString(),
        replies: []
      });
    }

    localStorage.setItem("blogComments", JSON.stringify(allComments));

    commentForm.reset();
    loadComments();
  });
}

loadComments();
