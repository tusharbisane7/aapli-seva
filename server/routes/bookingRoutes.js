const express = require("express");

const router = express.Router();

const multer = require("multer");

const Booking = require("../models/Booking");

const Hotel = require("../models/Hotel");

/* Upload */

const storage = multer.diskStorage({

  destination:(req,file,cb)=>{

    cb(null,"uploads/");
  },

  filename:(req,file,cb)=>{

    cb(

      null,

      Date.now() + "-" + file.originalname

    );

  }

});

const upload = multer({

  storage

});

/* =========================
   CREATE BOOKING
========================= */

router.post(

  "/create",

  upload.single("aadhaarPdf"),

  async(req,res)=>{

    try{

      const bookingToken =

      "HTL" +

      Math.floor(

        100000 + Math.random() * 900000

      );

      const hotel =
      await Hotel.findById(

        req.body.hotelId
      );

      if(!hotel){

        return res.status(404).json({

          message:"Hotel Not Found"

        });

      }

      /* Room Check */

      if(

        hotel.roomsAvailable <

        Number(req.body.roomsRequired)

      ){

        return res.status(400).json({

          message:"Rooms Not Available"

        });

      }

      /* Create Booking */

      const booking =
      new Booking({

        ...req.body,

        bookingToken,

        bookingStatus:"Pending",

        aadhaarPdf:

        req.file
        ? req.file.filename
        : ""

      });

      await booking.save();

      res.status(201).json({

        message:"Booking Successful",

        bookingToken,

        booking

      });

    }catch(error){

      console.log(error);

      res.status(500).json({

        message:"Booking Failed"

      });

    }

  }

);

/* =========================
   USER BOOKING HISTORY
========================= */

router.get(

  "/user/:userId",

  async(req,res)=>{

    try{

      const bookings =
      await Booking.find({

        userId:req.params.userId

      }).sort({

        createdAt:-1

      });

      res.status(200).json(
        bookings
      );

    }catch(error){

      console.log(error);

      res.status(500).json({

        message:"Error"

      });

    }

  }

);

/* =========================
   ALL BOOKINGS ADMIN
========================= */

router.get(

  "/all",

  async(req,res)=>{

    try{

      const bookings =
      await Booking.find()

      .sort({

        createdAt:-1

      });

      res.status(200).json(
        bookings
      );

    }catch(error){

      console.log(error);

    }

  }

);

/* =========================
   TRACK BOOKING
========================= */

router.get(

  "/track/:token",

  async(req,res)=>{

    try{

      const booking =
      await Booking.findOne({

        bookingToken:
        req.params.token

      });

      if(!booking){

        return res.status(404).json({

          message:"Booking Not Found"

        });

      }

      res.status(200).json(
        booking
      );

    }catch(error){

      console.log(error);

    }

  }

);

/* =========================
   ADMIN UPDATE STATUS
========================= */

router.put(

  "/admin/update/:id",

  async(req,res)=>{

    try{

      const {

        bookingStatus

      } = req.body;

      const booking =
      await Booking.findById(

        req.params.id
      );

      if(!booking){

        return res.status(404).json({

          message:"Booking Not Found"

        });

      }

      booking.bookingStatus =
      bookingStatus;

      await booking.save();

      /* Reduce Rooms */

      if(

        bookingStatus === "Approved"

      ){

        const hotel =
        await Hotel.findById(

          booking.hotelId
        );

        if(hotel){

          hotel.roomsAvailable =

          hotel.roomsAvailable -

          Number(

            booking.roomsRequired

          );

          await hotel.save();

        }

      }

      res.status(200).json({

        message:"Booking Updated",

        booking

      });

    }catch(error){

      console.log(error);

    }

  }

);

module.exports = router;