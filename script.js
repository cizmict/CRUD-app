//ove dve linije prave server
//napravi server i sacuvaj ga u promenljivoj app
const express = require("express");
const app = express();

//import fje iz db.js
const connectDB = require("./server-classes/db.js");

//import postova iz baze
const Post = require("./server-classes/Post.js");

//postavljanje da napravljeni server slusa na nekom portu
//listen(broj porta, funkcija koja se izvrsava kada se server pokrene)
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server slusa na portu: ${PORT}`);
});

//konekcija ka bazi
connectDB();

//specificiramo sta se desava kada klijent pristupi nasem serveru
//kada se korisnik nakaci na nas server otvori mu folder klijent
app.use(express.static("klijent"));

//json - java script object notation; izgleda isto kao js objekat
app.use(express.json()); //moze da salje i prima podatke

//da korisnik dobije podatke o svim postovima iz baze
app.get("/api/posts", async (req, res) => {
  try {
    //vraca sve postove koje imamo
    //sort da bi najnoviji post bio prvi a ne poslednji
    const allPosts = await Post.find().sort({ _id: -1 });

    res.json({
      success: true,
      posts: allPosts,
    });
  } catch (err) {
    res.json({
      succes: false,
      msg: err.message,
    });
  }
});

//korisnik preko posts rute salje podatke o autoru i tekst
//pravi se obj newPost

app.post("/api/posts", async (req, res) => {
  try {
    const author = req.body.author;
    const text = req.body.text;

    const newPost = new Post({
      author: author,
      text: text,
    });
    //cuvanje u bazi
    const savedPost = await newPost.save();

    addNewPost(newPost);
    res.json({
      succes: true,
      post: savedPost,
    });
  } catch (err) {
    res.json({
      succes: false,
      msg: err.message,
    });
  }
});

//ovaj deo posle : je deo koji se uvek menja  - za pojedinacni post
app.get("/api/posts/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);

    res.json({
      succes: true,
      post: post,
    });
  } catch (err) {
    res.json({
      succes: false,
      msg: err.message,
    });
  }
});

app.post("/api/comment", async (req, res) => {
  try {
    const author = req.body.author;
    const text = req.body.text;
    const postId = req.body.postId; //na kom postu je taj komentar

    const post = await Post.findById(postId);

    const newComment = {
      author: author,
      text: text,
      createdAt: new Date(),
    };

    post.comments.push(newComment);
    post.commentsNumber++; //u Post.js, default vrednost 0, povecavamo svaki put kad se doda kom

    const savePost = await post.save(); //cuvanje izmena u bazi

    res.json({
      success: true,
      post: savedPost,
    });
  } catch (err) {
    res.json({
      success: false,
      msg: err.message,
    });
  }
});

//brisanje posta
app.delete("/api/posts/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const del = await Post.findByIdAndDelete(postId);

    res.json({
      success: true,
      redirect: "/",
    });
  } catch (err) {
    res.json({
      succes: false,
      msg: err.message,
    });
  }
});

//update posta
app.put("/api/posts/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);

    post.verified = true;

    const savedPost = await post.save();

    res.json({
      success: true,
      post: savedPost,
    });
  } catch (err) {
    res.json({
      succes: false,
      msg: err.message,
    });
  }
});
