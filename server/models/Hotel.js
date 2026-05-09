const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({

  hotelName:String,

  hotelAddress:String,

  hotelLicenseNo:String,

  hotelContact:String,

  hotelDescription:String,

  hotelImages:[String],

  wifi:Boolean,

  parking:Boolean,

  tv:Boolean,

  garden:Boolean,

  beds:Number,

  roomsAvailable:Number,

  pricePerNight:Number,

  createdAt:{
    type:Date,
    default:Date.now
  }

});

module.exports = mongoose.model(
  "Hotel",
  hotelSchema
);