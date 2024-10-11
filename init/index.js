const mongoose = require('mongoose');
// const listing= require("./models/listing.js");
const initData=require("./data.js");
const Listing = require('../models/listing.js');

main().then((res)=>{
    console.log("connection success 1 !")
})
.catch((err)=>{
    console.log("some Error occureed !" )
})

async function main() {
await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust');
};

let initDb=async()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data)
    console.log("successfully add..!")

}
initDb();
