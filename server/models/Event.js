const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({

  title:{
    type:String,
    required:true
  },

  location:{
    type:String,
    required:true
  },

  date:{
    type:String,
    required:true
  },

  time:{
    type:String,
    default:""
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
  "Event",
  eventSchema
);