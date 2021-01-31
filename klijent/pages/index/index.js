let posts;

getData();

//asinhrona fja koja preko axiosa odlazi na server, pogodi rutu i dobije postove
//i sacuva ih u promenljivoj posts
async function getData() {
  const resp = await axios.get("/api/posts");

  posts = resp.data.posts;

  renderPosts(posts);

  addEventListeners();
}

//Posalji post
const btnSend = document.querySelector("#send-post-btn");
btnSend.addEventListener("click", async () => {
  const inputAutor = document.querySelector(".input-author");
  const inputText = document.querySelector(".input-text");

  const author = inputAutor.value;
  const text = inputText.value;

  const resp = await axios.post("/api/posts", {
    author: author,
    text: text,
  });

  location.reload(); //refreshuje se nasa stranica kada kliknemo dugme posalji
});

//kada kliknemo na neki post, da udje u njega
function addEventListeners() {
  //querySelectorAll - vraca kolekciju html node-ova (NodeCollection)
  //to se pretvara u obican niz [...]
  const allPosts = [...document.querySelectorAll(".post")];

  allPosts.forEach((post) => {
    post.addEventListener("click", () => {
      //u html-u smo za postove definisali post-id
      const postId = post.getAttribute("post-id");
      console.log(postId);
      //klikom na post otvara se taj post, saljemo id svakog posta da bi znao na koji post ide
      //slanje preko url-a, dodaje se posle putanje ? pa id
      //za svaki post jedinstveno
      location.href = `/pages/single-post/single-post.html?postId=${postId}`;
    });
  });
}

// Render functions
function renderPosts(posts) {
  const postsContainer = document.querySelector(".posts");
  let div;

  posts.forEach((post) => {
    div = createPostDiv(post); //napravi post
    postsContainer.appendChild(div); //ubaci ga u html
  });
}

function createPostDiv(post) {
  const { _id, author, text, createdAt, commentsNumber } = post;

  const div = document.createElement("div");
  div.className = "post";
  div.setAttribute("post-id", _id);

  div.innerHTML = `
    <div class="post-header">
      <div class="author"> ${author} </div>
      <div class="post-time">${formatDate(createdAt)}</div>
    </div>
    <div class="text">
      ${text}
    </div>
    <div class="post-footer">
      <p>${commentsNumber} komentara</p>
    </div>
  `;

  return div;
}

// Show input field

const boxShowInput = document.querySelector(".input-btn-box");
const boxInput = document.querySelector(".input-block");

const btnShowInput = document.getElementById("show-input-btn");

btnShowInput.addEventListener("click", () => {
  boxShowInput.style.display = "none";
  boxInput.style.display = "block";
});
