/////////// Show post logic //////////

//dobijanje id-a iz urla
const postId = new URLSearchParams(window.location.search).get("postId");

let post;

getData();

async function getData() {
  const resp = await axios.get(`/api/posts/${postId}`);

  post = resp.data.post; //sve info o postu

  renderPost(post);
  renderComments(post);
}

//Slanje komentara
const btnSendComment = document.querySelector("#comment-btn");

btnSendComment.addEventListener("click", async () => {
  const inputAuthor = document.querySelector(".leave-comment-box input"); //gadja prvi input iz klase
  const inputText = document.querySelector(".leave-comment-box textarea"); //gadja prvu txtarea-u iz klase

  const author = inputAuthor.value;
  const text = inputText.value;

  const resp = await axios.post("/api/comment", {
    postId: postId,
    author: author,
    text: text,
  });

  location.reload();
});

//Update
const btnUpdate = document.querySelector("#update-btn");

btnUpdate.addEventListener("click", async () => {
  const resp = await axios.put(`/api/posts/${postId}`);

  location.reload();
});

// Brisanje posta
const btnDelete = document.querySelector("#delete-btn");

btnDelete.addEventListener("click", async () => {
  const resp = await axios.delete(`/api/posts/${postId}`);

  location.href = resp.data.redirect;
});

// Render functions

function renderPost(post) {
  const { _id, author, text, createdAt, verified } = post;

  const html = `
      <div class="post-id"> #${_id}</div>
      <div class="post-header">
          <div class="author"> ${author} </div>
          <div class="top-right">
            <div class="verified"> ${
              verified ? "Odobren" : "Ceka odobrenje"
            } </div> 
            <div class="post-time">${formatDate(createdAt)}</div>
          </div>
      </div>
      <div class="text">
          ${text}
      </div>
      `;

  const postDiv = document.querySelector(".post");

  postDiv.innerHTML = html;
  if (verified) {
    document.querySelector("#update-btn").style.display = "none";
  }
}

function renderComments(post) {
  const comments = post.comments;
  const commentsContainer = document.querySelector(".comments");
  let div;

  comments.forEach((comment) => {
    div = createCommentDiv(comment);
    commentsContainer.appendChild(div);
  });
}

function createCommentDiv(comment) {
  const { author, text, createdAt } = comment;
  const div = document.createElement("div");
  div.className = "comment";

  div.innerHTML = `
    <div class="comment-header">
        <div class="comment-author"> ${author} </div>
        <div class="post-time">${formatDate(createdAt)}</div>
    </div>
    <div class="comment-text">
       ${text}
    </div>
    `;

  return div;
}

///////// Open comment section ////////////

const btnOpenCommentSection = document.querySelector("#comment-section-btn");
btnOpenCommentSection.addEventListener("click", () => {
  const commentSection = document.querySelector(".footer");
  commentSection.classList.remove("hidden");
});

const btnDontComment = document.querySelector("#dont-comment-btn");
btnDontComment.addEventListener("click", () => {
  const commentSection = document.querySelector(".footer");
  commentSection.classList.add("hidden");
});
