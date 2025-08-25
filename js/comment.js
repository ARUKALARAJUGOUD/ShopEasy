document.getElementById("submitReview").addEventListener("click", () => {
  const name = document.getElementById("username").value.trim();
  const rating = document.getElementById("rating").value;
  const reviewText = document.getElementById("reviewText").value.trim();

  if (!name || !reviewText) return alert("Please fill out all fields.");

  const reviewId = Date.now();
  const reviewCard = document.createElement("div");
  reviewCard.classList.add("review-card");
  reviewCard.setAttribute("data-id", reviewId);

  reviewCard.innerHTML = `
    <div class="review-header">
      <img src="https://via.placeholder.com/40" alt="User">
      <div>
        <h4>${name}</h4>
        <span>${new Date().toLocaleDateString()}</span>
      </div>
    </div>
    <div class="review-rating">${"⭐".repeat(rating)}</div>
    <p class="review-text">${reviewText}</p>
    <div class="review-actions">
      <button class="like-btn"><i class="fa fa-thumbs-up"></i> <span>0</span></button>
      <button class="dislike-btn"><i class="fa fa-thumbs-down"></i> <span>0</span></button>
      <button class="reply-toggle"><i class="fa fa-reply"></i> Reply</button>
      <button class="edit-review"><i class="fa fa-edit"></i> Edit</button>
    </div>
    <div class="reply-box">
      <input type="text" class="reply-input" placeholder="Write a reply...">
      <button class="send-reply">Post</button>
    </div>
    <div class="replies"></div>
  `;

  document.getElementById("reviewsContainer").prepend(reviewCard);
  document.getElementById("username").value = "";
  document.getElementById("reviewText").value = "";

  setupReviewEvents(reviewCard, reviewId);
});

function setupReviewEvents(reviewCard, reviewId) {
  const likeBtn = reviewCard.querySelector(".like-btn");
  const dislikeBtn = reviewCard.querySelector(".dislike-btn");
  const replyToggle = reviewCard.querySelector(".reply-toggle");
  const sendReplyBtn = reviewCard.querySelector(".send-reply");
  const editBtn = reviewCard.querySelector(".edit-review");

  likeBtn.addEventListener("click", () => {
    if (localStorage.getItem(`voted-${reviewId}`)) return alert("You already voted.");
    let count = likeBtn.querySelector("span");
    count.textContent = parseInt(count.textContent) + 1;
    localStorage.setItem(`voted-${reviewId}`, "like");
    likeBtn.disabled = true;
    dislikeBtn.disabled = true;
  });

  dislikeBtn.addEventListener("click", () => {
    if (localStorage.getItem(`voted-${reviewId}`)) return alert("You already voted.");
    let count = dislikeBtn.querySelector("span");
    count.textContent = parseInt(count.textContent) + 1;
    localStorage.setItem(`voted-${reviewId}`, "dislike");
    likeBtn.disabled = true;
    dislikeBtn.disabled = true;
  });

  replyToggle.addEventListener("click", () => {
    const box = reviewCard.querySelector(".reply-box");
    box.style.display = box.style.display === "block" ? "none" : "block";
  });

  sendReplyBtn.addEventListener("click", () => {
    const replyInput = reviewCard.querySelector(".reply-input");
    if (!replyInput.value.trim()) return;
    const replyEl = document.createElement("div");
    replyEl.classList.add("reply");
    replyEl.innerHTML = `
      <p>${replyInput.value}</p>
      <button class="edit-reply"><i class="fa fa-edit"></i> Edit</button>
    `;
    reviewCard.querySelector(".replies").appendChild(replyEl);
    replyInput.value = "";

    replyEl.querySelector(".edit-reply").addEventListener("click", () => {
      const p = replyEl.querySelector("p");
      p.contentEditable = true;
      p.classList.add("editable");
      p.focus();
      p.addEventListener("blur", () => {
        p.contentEditable = false;
        p.classList.remove("editable");
      });
    });
  });

  editBtn.addEventListener("click", () => {
    const textEl = reviewCard.querySelector(".review-text");
    textEl.contentEditable = true;
    textEl.classList.add("editable");
    textEl.focus();
    textEl.addEventListener("blur", () => {
      textEl.contentEditable = false;
      textEl.classList.remove("editable");
    });
  });
}