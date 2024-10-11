const { required } = require('joi');
const mongoose = require('mongoose');
const { type } = require('../joi');
const { Schema } = mongoose;


const reviewSchema= new Schema ({
    Comment:{
        type:String
    },
    Rating:{
        type:Number,
        min:0,
        max:5
    },

    CreatedAt:{
        type:Date,
        default:Date.now()
    }

});

const Review=mongoose.model("Review",reviewSchema);
module.exports=Review;

    
    