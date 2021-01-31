//biblioteka node.js-a koja se koristi za pobezivanje sa mongodb mongoose
//npm install mongoose

//ovaj fajl koristimo samo za konekciju sa bazom

const mongoose = require("mongoose");

async function connectDB() {
    try{
        //link sa mongodb sajta
        const DB_LINK = "mongodb+srv://epos:epos@cluster0.fyp5q.mongodb.net/nodebaza?retryWrites=true&w=majority";
       
        //konekcija sa bazom
        const connection = await mongoose.connect(DB_LINK, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology:true, //ova tri su default stvari koje treba postaviti da bi konekcija bila uspesna
        });

        console.log("Baza konektovana");

    } 
    catch(err){
        console.log(`Error: ${err.message}`);
    }
}

module.exports = connectDB; //eksport fje iz ovog fajla, koju importujemo na server