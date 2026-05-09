const express = require("express");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../models/User");

const upload = require(
  "../middleware/upload"
);

const router = express.Router();

/* =========================
   ADMIN DASHBOARD STATS
========================= */

router.get(

  "/admin/stats",

  async(req,res)=>{

    try{

      const totalUsers =
      await User.countDocuments();

      const recentUsers =
      await User.find()

      .sort({

        createdAt:-1

      })

      .limit(5);

      res.status(200).json({

        totalUsers,

        totalApplications:0,

        totalComplaints:0,

        recentUsers

      });

    }catch(error){

      console.log(error);

      res.status(500).json({

        message:"Server Error"

      });

    }

  }

);

/* =========================
   REGISTER
========================= */

router.post(

  "/register",

  upload.single("profilePic"),

  async(req,res)=>{

    try{

      const {

        firstName,
        lastName,
        age,
        mobile,
        email,
        state,
        district,
        taluka,
        village,
        address,
        password

      } = req.body;

      /* CHECK USER */

      const existingUser =
      await User.findOne({

        email

      });

      if(existingUser){

        return res.status(400).json({

          message:
          "User already exists"

        });

      }

      /* HASH PASSWORD */

      const hashedPassword =
      await bcrypt.hash(

        password,

        10

      );

      /* CREATE USER */

      const newUser =
      new User({

        firstName,
        lastName,
        age,
        mobile,
        email,
        state,
        district,
        taluka,
        village,
        address,

        password:
        hashedPassword,

        profilePic:

        req.file

        ? req.file.filename

        : ""

      });

      await newUser.save();

      res.status(201).json({

        message:
        "User registered successfully"

      });

    }catch(error){

      console.log(error);

      res.status(500).json({

        message:
        "Server Error"

      });

    }

  }

);

/* =========================
   LOGIN
========================= */

router.post(

  "/login",

  async(req,res)=>{

    try{

      const {

        email,
        password

      } = req.body;

      /* FIND USER */

      const user =
      await User.findOne({

        email

      });

      if(!user){

        return res.status(400).json({

          message:
          "Invalid Email"

        });

      }

      /* PASSWORD */

      const isMatch =
      await bcrypt.compare(

        password,

        user.password

      );

      if(!isMatch){

        return res.status(400).json({

          message:
          "Incorrect Password"

        });

      }

      /* TOKEN */

      const token = jwt.sign(

        {

          id:user._id,

          role:user.role

        },

        process.env.JWT_SECRET,

        {

          expiresIn:"7d"

        }

      );

      /* RESPONSE */

      res.status(200).json({

        message:
        "Login Successful",

        token,

        user:{

          id:user._id,

          firstName:user.firstName,

          lastName:user.lastName,

          age:user.age,

          mobile:user.mobile,

          email:user.email,

          state:user.state,

          district:user.district,

          taluka:user.taluka,

          village:user.village,

          address:user.address,

          role:user.role,

          profilePic:
          user.profilePic

        }

      });

    }catch(error){

      console.log(error);

      res.status(500).json({

        message:
        "Server Error"

      });

    }

  }

);

/* =========================
   UPDATE USER
========================= */

router.put(

  "/update/:id",

  upload.single("profilePic"),

  async(req,res)=>{

    try{

      const updatedUser =
      await User.findByIdAndUpdate(

        req.params.id,

        {

          ...req.body,

          ...(req.file && {

            profilePic:
            req.file.filename

          })

        },

        {

          new:true

        }

      );

      res.status(200).json({

        message:
        "Profile Updated",

        user:{

          id:updatedUser._id,

          firstName:
          updatedUser.firstName,

          lastName:
          updatedUser.lastName,

          age:
          updatedUser.age,

          mobile:
          updatedUser.mobile,

          email:
          updatedUser.email,

          state:
          updatedUser.state,

          district:
          updatedUser.district,

          taluka:
          updatedUser.taluka,

          village:
          updatedUser.village,

          address:
          updatedUser.address,

          role:
          updatedUser.role,

          profilePic:
          updatedUser.profilePic

        }

      });

    }catch(error){

      console.log(error);

      res.status(500).json({

        message:
        "Update Failed"

      });

    }

  }

);

/* =========================
   GET ALL USERS
========================= */

router.get(

  "/all-users",

  async(req,res)=>{

    try{

      const users =
      await User.find()

      .sort({

        createdAt:-1

      });

      res.status(200).json(
        users
      );

    }catch(error){

      console.log(error);

      res.status(500).json({

        message:
        "Failed To Fetch Users"

      });

    }

  }

);

/* =========================
   DELETE USER
========================= */

router.delete(

  "/delete/:id",

  async(req,res)=>{

    try{

      await User.findByIdAndDelete(

        req.params.id

      );

      res.status(200).json({

        message:
        "User Deleted"

      });

    }catch(error){

      console.log(error);

      res.status(500).json({

        message:
        "Delete Failed"

      });

    }

  }

);

module.exports = router;