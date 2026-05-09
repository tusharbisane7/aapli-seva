const express = require("express");

const router = express.Router();

const HotelReview = require(
  "../models/HotelReview"
);

/* =========================
   ADD REVIEW
========================= */

router.post(

  "/add",

  async(req,res)=>{

    try{

      const {

        hotelId,

        userId,

        firstName,

        lastName,

        userName,

        image,

        rating,

        anonymous

      } = req.body;

      const reviewText =

      req.body.review ||

      req.body.comment ||

      "";

      const newReview =
      new HotelReview({

        hotelId,

        userId,

        firstName,

        lastName,

        userName,

        image,

        review:reviewText,

        rating,

        anonymous

      });

      await newReview.save();

      res.status(201).json({

        success:true,

        message:
        "Review Added Successfully",

        review:newReview

      });

    }catch(error){

      console.log(error);

      res.status(500).json({

        success:false,

        message:"Server Error"

      });

    }

  }

);

/* =========================
   GET REVIEWS
========================= */

router.get(

  "/:hotelId",

  async(req,res)=>{

    try{

      const reviews =

      await HotelReview.find({

        hotelId:req.params.hotelId

      })

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

  }

);

/* =========================
   DELETE REVIEW
========================= */

router.delete(

  "/delete/:id",

  async(req,res)=>{

    try{

      await HotelReview.findByIdAndDelete(

        req.params.id

      );

      res.status(200).json({

        success:true,

        message:
        "Review Deleted Successfully"

      });

    }catch(error){

      console.log(error);

      res.status(500).json({

        success:false,

        message:"Delete Failed"

      });

    }

  }

);

module.exports = router;