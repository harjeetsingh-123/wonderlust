const mongoose = require('mongoose');
const Review = require('./review');
const { type } = require('../joi');
const { required } = require('joi');
const {Schema}=mongoose;
const{Reviews}=require("./review");


let listschema= new mongoose.Schema({
    title:{
    type :String,
    require:true
},
description:{
    type:String,
    require:true
},
image:{
    default:"https://images.unsplash.com/photo-1726858528377-72d8f254ed87?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type:String,
    set:(v)=> v==="" ? "https://images.unsplash.com/photo-1726858528377-72d8f254ed87?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D":v,
    require:true
},

price:{ 
    type:Number,
    require:true
},
location:{
    type:String,
    require:true
},
country:{
    type:String,
    require:true
},

Reviews:[

    { type: Schema.Types.ObjectId, 
        ref: 'Review'

     }
]   
});

let Listing=mongoose.model("Listing",listschema);


module.exports=Listing;
