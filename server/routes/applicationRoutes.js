const express = require("express");

const router = express.Router();

const upload = require(
  "../middleware/upload"
);

const Application = require(
  "../models/Application"
);

/* =========================
   CREATE APPLICATION
========================= */

router.post(

  "/create",

  upload.fields([

    {
      name:"aadhaarCard",
      maxCount:1
    },

    {
      name:"panCard",
      maxCount:1
    },

    {
      name:"passport",
      maxCount:1
    },

    {
      name:"selfDeclaration",
      maxCount:1
    },

    {
      name:"rationCard",
      maxCount:1
    },

    {
      name:"residenceProof",
      maxCount:1
    },

    {
      name:"incomeCertificate",
      maxCount:1
    },

    {
      name:"casteCertificate",
      maxCount:1
    },

    {
      name:"birthCertificate",
      maxCount:1
    },

    {
      name:"electricityBill",
      maxCount:1
    },

    {
      name:"livePhoto",
      maxCount:1
    },

    {
      name:"otherDocuments",
      maxCount:10
    }

  ]),

  async(req,res)=>{

    try{

      /* TRACKING ID */

      const trackingId =

      "MHSETU" +

      Math.floor(

        100000 + Math.random() * 900000

      );

      /* CREATE APPLICATION */

      const newApplication =
      new Application({

        /* USER */

        userId:req.body.userId,

        userName:req.body.userName,

        userEmail:req.body.userEmail,

        userMobile:req.body.userMobile,

        /* SERVICE */

        serviceName:req.body.serviceName,

        serviceCategory:
        req.body.serviceCategory,

        trackingId,

        /* APPLICANT */

        firstName:req.body.firstName,

        middleName:req.body.middleName,

        lastName:req.body.lastName,

        firstNameMarathi:
        req.body.firstNameMarathi,

        middleNameMarathi:
        req.body.middleNameMarathi,

        lastNameMarathi:
        req.body.lastNameMarathi,

        fatherName:req.body.fatherName,

        motherName:req.body.motherName,

        age:req.body.age,

        dob:req.body.dob,

        gender:req.body.gender,

        occupation:req.body.occupation,

        reason:req.body.reason,

        /* ADDRESS */

        address:req.body.address,

        village:req.body.village,

        taluka:req.body.taluka,

        district:req.body.district,

        state:req.body.state,

        pincode:req.body.pincode,

        /* CONTACT */

        mobile:req.body.mobile,

        alternateMobile:
        req.body.alternateMobile,

        email:req.body.email,

        /* ID DETAILS */

        aadhaarNumber:
        req.body.aadhaarNumber,

        panNumber:
        req.body.panNumber,

        /* DOCUMENTS */

        aadhaarCard:
        req.files.aadhaarCard?.[0]
        ?.filename || "",

        panCard:
        req.files.panCard?.[0]
        ?.filename || "",

        passport:
        req.files.passport?.[0]
        ?.filename || "",

        selfDeclaration:
        req.files.selfDeclaration?.[0]
        ?.filename || "",

        rationCard:
        req.files.rationCard?.[0]
        ?.filename || "",

        residenceProof:
        req.files.residenceProof?.[0]
        ?.filename || "",

        incomeCertificate:
        req.files.incomeCertificate?.[0]
        ?.filename || "",

        casteCertificate:
        req.files.casteCertificate?.[0]
        ?.filename || "",

        birthCertificate:
        req.files.birthCertificate?.[0]
        ?.filename || "",

        electricityBill:
        req.files.electricityBill?.[0]
        ?.filename || "",

        livePhoto:
        req.files.livePhoto?.[0]
        ?.filename || "",

        otherDocuments:

        req.files.otherDocuments

        ? req.files.otherDocuments.map(

          (doc)=>doc.filename

        )

        : [],

        /* PAYMENT */

        paymentStatus:"Pending",

        paymentAmount:
        req.body.paymentAmount || 105,

        paymentMethod:"Online",

        /* STATUS */

        applicationStatus:
        "Submitted",

        /* TRACKING */

        tracking:[

          {

            status:
            "Application Submitted",

            message:
            "Application successfully submitted",

            updatedBy:"Citizen",

            date:new Date()
            .toLocaleString()

          }

        ]

      });

      await newApplication.save();

      /* RESPONSE */

      res.status(201).json({

        success:true,

        message:
        "Application Submitted Successfully",

        trackingId,

        application:newApplication

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
   GET ALL APPLICATIONS
========================= */

router.get(

  "/all",

  async(req,res)=>{

    try{

      const applications =

      await Application.find()

      .sort({

        createdAt:-1

      });

      res.status(200).json({

        success:true,

        applications

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
   GET SINGLE APPLICATION
========================= */

router.get(

  "/track/:trackingId",

  async(req,res)=>{

    try{

      const application =

      await Application.findOne({

        trackingId:
        req.params.trackingId

      });

      if(!application){

        return res.status(404).json({

          success:false,

          message:
          "Application Not Found"

        });

      }

      res.status(200).json({

        success:true,

        application

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
   GET USER APPLICATIONS
========================= */

router.get(

  "/user/:userId",

  async(req,res)=>{

    try{

      const applications =

      await Application.find({

        userId:req.params.userId

      })

      .sort({

        createdAt:-1

      });

      res.status(200).json({

        success:true,

        applications

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
   PAYMENT SUCCESS
========================= */

router.put(

  "/payment/:trackingId",

  async(req,res)=>{

    try{

      const paymentId =

      "PAY" +

      Math.floor(

        100000 + Math.random() * 900000

      );

      const updatedApplication =

      await Application.findOneAndUpdate(

        {

          trackingId:
          req.params.trackingId

        },

        {

          paymentStatus:"Paid",

          paymentId,

          applicationStatus:
          "Under Review",

          $push:{

            tracking:{

              status:
              "Payment Successful",

              message:
              "Payment completed successfully",

              updatedBy:"Citizen",

              date:new Date()
              .toLocaleString()

            }

          }

        },

        {

          returnDocument:"after"

        }

      );

      res.status(200).json({

        success:true,

        message:
        "Payment Successful",

        paymentId,

        application:
        updatedApplication

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
   ADMIN UPDATE
========================= */

router.put(

  "/admin/update/:trackingId",

  upload.single(
    "approvedDocument"
  ),

  async(req,res)=>{

    try{

      const {

        status,

        remarks,

        approvedBy,

        rejectedReason

      } = req.body;

      const updatedApplication =

      await Application.findOneAndUpdate(

        {

          trackingId:
          req.params.trackingId

        },

        {

          applicationStatus:
          status,

          remarks,

          approvedBy,

          rejectedReason,

          approvedAt:new Date(),

          isViewedByAdmin:true,

          approvedDocument:

          req.file

          ? req.file.filename

          : "",

          $push:{

            tracking:{

              status,

              message:
              remarks || status,

              updatedBy:
              approvedBy || "Admin",

              date:new Date()
              .toLocaleString()

            }

          }

        },

        {

          returnDocument:"after"

        }

      );

      res.status(200).json({

        success:true,

        message:
        "Application Updated Successfully",

        application:
        updatedApplication

      });

    }catch(error){

      console.log(error);

      res.status(500).json({

        success:false,

        message:
        "Update Failed"

      });

    }

  }

);

/* =========================
   DELETE APPLICATION
========================= */

router.delete(

  "/delete/:trackingId",

  async(req,res)=>{

    try{

      await Application.findOneAndDelete({

        trackingId:
        req.params.trackingId

      });

      res.status(200).json({

        success:true,

        message:
        "Application Deleted Successfully"

      });

    }catch(error){

      console.log(error);

      res.status(500).json({

        success:false,

        message:
        "Delete Failed"

      });

    }

  }

);

module.exports = router;