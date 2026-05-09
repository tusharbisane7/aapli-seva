const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

  bookingToken:{
    type:String,
    unique:true
  },

  hotelId:String,

  userId:String,

  fullName:String,

  mobile:String,

  checkInDate:String,

  checkOutDate:String,

  roomsRequired:Number,

  reason:String,

  aadhaarNumber:String,

  aadhaarPdf:String,

  paymentMode:{
    type:String,
    default:"Pay At Hotel"
  },

  bookingStatus:{
    type:String,
    default:"Pending"
  },

  createdAt:{
    type:Date,
    default:Date.now
  }

});

module.exports = mongoose.model(
  "HotelBooking",
  bookingSchema
);