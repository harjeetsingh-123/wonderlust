const express = require('express')
const app = express()
const path=require("path"); 
const mongoose = require('mongoose');
const methodOverride = require("method-override");
const ejsmate = require('ejs-mate');
const Review = require('./models/review.js');
const ExpressError=require("./utils/ExpressError.js")
const listings=require("./Router/listings.js");
const reviews= require("./Router/review.js");

app.use("/listings",listings);
app.use("/listings/:id/review",reviews)


//// database connection 



main().then((res)=>{
    console.log("connection success !")
})
.catch((err)=>{
    console.log("some Error occureed !" )
})

async function main() {
await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust');
};

//// server connnection

app.listen(8080,()=>{
    console.log("server is working");
})

//// App Setting 

app.set("views",path.join(__dirname,"views"));
app.engine('ejs', ejsmate);
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname,"public")));

// // Error handling middleware

app.use((err, req, res, next) => {
    const { statuscode = 500 } = err;
    if (!err.message) err.message = "Oh No, Something Went Wrong!";
    res.status(statuscode).render("error.ejs", { err });
});
 



