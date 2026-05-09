const mongoose = require("mongoose");

const userSchema =
new mongoose.Schema(

  {

    firstName:{
      type:String,
      required:true
    },

    lastName:{
      type:String,
      required:true
    },

    age:{
      type:Number
    },

    mobile:{
      type:String
    },

    email:{
      type:String,
      required:true,
      unique:true
    },

    state:{
      type:String
    },

    district:{
      type:String
    },

    taluka:{
      type:String
    },

    village:{
      type:String
    },

    address:{
      type:String
    },

    password:{
      type:String,
      required:true
    },

    role:{
      type:String,
      default:"user"
    },

    profilePic:{
      type:String,
      default:""
    }

  },

  {

    timestamps:true

  }

);

const User =
mongoose.model(

  "User",

  userSchema

);

module.exports = User;