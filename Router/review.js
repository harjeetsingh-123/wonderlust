const express = require('express')
const router = express.Router();
const WrapeAsync=require("../utils/wrapeAsync.js");
const ExpressError=require("../utils/ExpressError.js")
const Listing= require("../models/listing")
const Review=require("../models/review.js");
const {reviewSchema} = require("../joi.js");



/////  validation Review middleware .

const validationreview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        throw new ExpressError(404,error)
    }
    else{
        next();
    }
}



//// post review for a listing 

router.post("/listings/:id/review",validationreview ,WrapeAsync(async(req,res)=>{
    let{id}=req.params;
    let listing=  await Listing.findById(id);
    let newreview= new Review (req.body.review)
    listing.Reviews.push(newreview);
    await newreview.save();
    await listing.save();
    // res.redirect("/index")
    res.redirect(`/listings/${id}`);
}));


/////  post Review Delete routes.


router.delete("/listings/:id/Reviews/:reviewId",WrapeAsync (async(req,res)=>{
    let {id,reviewID}=req.params;
    await Listing.findByIdAndDelete(id);
    await Listing.findByIdAndUpdate(reviewID);
    res.redirect(`/listing/${id}`);
}));


module.exports=router;