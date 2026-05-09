const mongoose = require("mongoose");

const reviewSchema =
new mongoose.Schema({

  hotelId:{
    type:String,
    required:true
  },

  userId:{
    type:String
  },

  firstName:{
    type:String
  },

  lastName:{
    type:String
  },

  userName:{
    type:String
  },

  image:{
    type:String,
    default:""
  },

  rating:{
    type:Number,
    default:5
  },

  review:{
    type:String,
    required:true
  },

  anonymous:{
    type:Boolean,
    default:false
  },

  createdAt:{
    type:Date,
    default:Date.now
  }

});

module.exports =
mongoose.model(
  "HotelReview",
  reviewSchema
);