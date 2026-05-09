const mongoose = require("mongoose");

const explorePlaceSchema =
new mongoose.Schema({

  title:{
    type:String,
    required:true
  },

  location:{
    type:String,
    required:true
  },

  rating:{
    type:String,
    default:"5.0"
  },

  description:{
    type:String,
    default:""
  },

  thumbnail:{
    type:String,
    default:""
  },

  images:[
    {
      type:String
    }
  ],

  createdAt:{
    type:Date,
    default:Date.now
  }

});

module.exports = mongoose.model(
  "ExplorePlace",
  explorePlaceSchema
);