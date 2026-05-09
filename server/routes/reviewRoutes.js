const express = require("express");

const router = express.Router();

const Review = require(
  "../models/Review"
);

/* =========================
   GET ALL REVIEWS
========================= */

router.get("/",async(req,res)=>{

  try{

    const reviews = await Review.find()

    .sort({

      createdAt:-1

    });

    res.status(200).json({

      success:true,

      reviews

    });

  }catch(error){

    console.log(error);

    res.status(500).json({

      success:false,

      message:"Server Error"

    });

  }

});

/* =========================
   ADD REVIEW
========================= */

router.post("/add",async(req,res)=>{

  try{

    const {

      userId,
      firstName,
      lastName,
      image,
      review,
      rating,
      anonymous

    } = req.body;

    if(!review){

      return res.status(400).json({

        success:false,

        message:"Review Required"

      });

    }

    const newReview = new Review({

      userId,

      firstName,

      lastName,

      image,

      review,

      rating,

      anonymous

    });

    await newReview.save();

    res.status(201).json({

      success:true,

      message:"Review Added",

      review:newReview

    });

  }catch(error){

    console.log(error);

    res.status(500).json({

      success:false,

      message:"Server Error"

    });

  }

});

/* =========================
   DELETE REVIEW
========================= */

router.delete("/delete/:id",

async(req,res)=>{

  try{

    await Review.findByIdAndDelete(

      req.params.id

    );

    res.status(200).json({

      success:true,

      message:"Review Deleted"

    });

  }catch(error){

    console.log(error);

    res.status(500).json({

      success:false,

      message:"Delete Failed"

    });

  }

});

module.exports = router;