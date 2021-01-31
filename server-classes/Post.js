//fajl sa strukturom jednog posta

const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  //ne moramo da pisemo id jer svaki mongo obj ima id
  author: {
    type: String,
    trim: true,
    required: true, //nijedan post ne moze da postoji bez autora
  },
  text: {
    type: String,
    trim: true,
    required: true, //nijedan post ne moze da postoji bez teksta
  },
  createdAt: {
    //vreme kada je post kreiran
    type: Date,
    default: Date.now, //da se uzima vrerme kada je post kreiran, da ne bismo rucno unosili
  },
  verified: {
    type: Boolean,
    default: false,
  },
  commentsNumber: {
    type: Number,
    default: 0, //pocetni br komentara je 0
  },
  comments: {
    type: [], //prazan niz
  },
});

//eksport, model koji sadrzi sta svaki post treba da ima
module.exports = mongoose.model("Post", PostSchema);
