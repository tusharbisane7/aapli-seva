const express = require("express");

const Razorpay = require("razorpay");

const crypto = require("crypto");

const router = express.Router();

const Application = require(
  "../models/Application"
);

/* =========================
   RAZORPAY INSTANCE
========================= */

const razorpay = new Razorpay({

  key_id:
  process.env.RAZORPAY_KEY_ID,

  key_secret:
  process.env.RAZORPAY_KEY_SECRET

});

/* =========================
   SETU CREATE ORDER
========================= */

router.post(

  "/create-order",

  async(req,res)=>{

    try{

      const options = {

        amount:105 * 100,

        currency:"INR",

        receipt:"receipt_order"

      };

      const order =
      await razorpay.orders.create(
        options
      );

      res.status(200).json({

        success:true,

        order

      });

    }catch(error){

      console.log(error);

      res.status(500).json({

        success:false,

        message:"Order Failed"

      });

    }

  }

);

/* =========================
   VERIFY SETU PAYMENT
========================= */

router.post(

  "/verify-payment",

  async(req,res)=>{

    try{

      const {

        razorpay_order_id,

        razorpay_payment_id,

        razorpay_signature,

        trackingId

      } = req.body;

      /* CREATE SIGNATURE */

      const generatedSignature =
      crypto

      .createHmac(

        "sha256",

        process.env
        .RAZORPAY_KEY_SECRET

      )

      .update(

        razorpay_order_id +
        "|" +
        razorpay_payment_id

      )

      .digest("hex");

      /* VERIFY */

      if(

        generatedSignature !==
        razorpay_signature

      ){

        return res.status(400).json({

          success:false,

          message:"Invalid Signature"

        });

      }

      /* UPDATE APPLICATION */

      const updatedApplication =
      await Application.findOneAndUpdate(

        {

          trackingId

        },

        {

          paymentStatus:"Paid",

          paymentId:
          razorpay_payment_id,

          applicationStatus:
          "Under Verification",

          tracking:[

            {

              status:
              "Application Submitted",

              date:
              new Date()
              .toLocaleString()

            },

            {

              status:
              "Payment Successful",

              date:
              new Date()
              .toLocaleString()

            },

            {

              status:
              "Forwarded To Desk 1",

              date:
              new Date()
              .toLocaleString()

            }

          ]

        },

        {

          new:true

        }

      );

      res.status(200).json({

        success:true,

        application:
        updatedApplication

      });

    }catch(error){

      console.log(error);

      res.status(500).json({

        success:false,

        message:
        "Payment Verification Failed"

      });

    }

  }

);

/* =========================
   TRANSPORT CREATE ORDER
========================= */

router.post(

  "/transport/create-order",

  async(req,res)=>{

    try{

      const options = {

        amount:
        req.body.amount * 100,

        currency:"INR",

        receipt:
        "transport_receipt"

      };

      const order =
      await razorpay.orders.create(
        options
      );

      res.status(200).json({

        success:true,

        order

      });

    }catch(error){

      console.log(error);

      res.status(500).json({

        success:false,

        message:
        "Transport Order Failed"

      });

    }

  }

);

/* =========================
   VERIFY TRANSPORT PAYMENT
========================= */

router.post(

  "/transport/verify-payment",

  async(req,res)=>{

    try{

      const {

        razorpay_order_id,

        razorpay_payment_id,

        razorpay_signature,

        bookingId

      } = req.body;

      const generatedSignature =
      crypto

      .createHmac(

        "sha256",

        process.env
        .RAZORPAY_KEY_SECRET

      )

      .update(

        razorpay_order_id +
        "|" +
        razorpay_payment_id

      )

      .digest("hex");

      /* VERIFY */

      if(

        generatedSignature !==
        razorpay_signature

      ){

        return res.status(400).json({

          success:false,

          message:"Invalid Signature"

        });

      }

      const TransportBooking =
      require(
        "../models/TransportBooking"
      );

      /* UPDATE BOOKING */

      const updatedBooking =
      await TransportBooking.findByIdAndUpdate(

        bookingId,

        {

          paymentStatus:"Paid",

          paymentId:
          razorpay_payment_id,

          bookingStatus:
          "Confirmed"

        },

        {

          new:true

        }

      );

      res.status(200).json({

        success:true,

        booking:
        updatedBooking

      });

    }catch(error){

      console.log(error);

      res.status(500).json({

        success:false,

        message:
        "Transport Payment Failed"

      });

    }

  }

);

/* =========================
   EXPORT
========================= */

module.exports = router;