const mongoose = require("mongoose");

const reviewSchema =
new mongoose.Schema({

  userId:{
    type:String
  },

  firstName:{
    type:String
  },

  lastName:{
    type:String
  },

  image:{
    type:String,
    default:""
  },

  review:{
    type:String,
    required:true
  },

  rating:{
    type:Number,
    default:5
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
  "Review",
  reviewSchema
);