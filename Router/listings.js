const express = require('express')
const router = express.Router({ mergeParams : true });
const WrapeAsync=require("../utils/wrapeAsync.js");
const ExpressError=require("../utils/ExpressError.js")
const {listingSchema} = require("../joi.js");
const Listing= require("../models/listing.js");


///// Listing validation  middleware 

const validationListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        throw new ExpressError(404,error)
    }
    else{
        next();
    }
}


// Index route - List all listings

router.get("/" ,WrapeAsync(async(req,res)=>{
    let initdata= await  Listing.find({});
     res.render("listings/index.ejs",{initdata});
}));


// Show route - Show details of a specific listing

router.get("/:id",WrapeAsync(async(req,res)=>{
  let{id}=req.params;
  let list=await Listing.findById(id).populate("Reviews")
  res.render("listings/show.ejs",{list})
}));


// New listing  form route 

router.get("/new",(req,res)=>{
    res.render("listings/new.ejs")
    });



   // Create new listing


    router.post("/",validationListing,WrapeAsync(async(req,res)=>{
    let newlisting= new Listing(req.body.listing);
    await newlisting.save();
    res.redirect("/listings");
    }
));

// Edit listing form route

    router.get("/:id/edit",WrapeAsync(async(req,res)=>{
    let{id}=req.params;
    let listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
    
    }));

  // Update listing

    router.put("/:id",validationListing,WrapeAsync(async(req,res)=>{
    let{id}=req.params;
    let p= await Listing.findByIdAndUpdate(id,{...req.body.listing})
    res.redirect("/listings");
}));




// //// Delete listing  route
  
 router.delete("/:id",WrapeAsync(async(req,res)=>{
    let{id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
 }));



 module.exports=router ;