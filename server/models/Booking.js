const mongoose = require("mongoose");

const bookingSchema =
new mongoose.Schema({

  /* =====================================
     HOTEL DETAILS
  ===================================== */

  hotelId:{
    type:String,
    required:true
  },

  hotelName:{
    type:String,
    default:""
  },

  userId:{
    type:String,
    default:""
  },

  /* =====================================
     USER DETAILS
  ===================================== */

  fullName:{
    type:String,
    required:true,
    trim:true
  },

  mobile:{
    type:String,
    required:true,
    trim:true
  },

  email:{
    type:String,
    default:""
  },

  /* =====================================
     BOOKING DETAILS
  ===================================== */

  checkInDate:{
    type:String,
    required:true
  },

  checkOutDate:{
    type:String,
    required:true
  },

  roomsRequired:{
    type:Number,
    default:1
  },

  adults:{
    type:Number,
    default:1
  },

  children:{
    type:Number,
    default:0
  },

  roomType:{
    type:String,
    default:"Standard"
  },

  nights:{
    type:Number,
    default:1
  },

  reason:{
    type:String,
    default:""
  },

  /* =====================================
     DOCUMENTS
  ===================================== */

  aadhaarNumber:{
    type:String,
    default:""
  },

  aadhaarPdf:{
    type:String,
    default:""
  },

  /* =====================================
     PAYMENT
  ===================================== */

  amount:{
    type:Number,
    default:0
  },

  paymentStatus:{
    type:String,
    enum:[
      "Pending",
      "Paid",
      "Failed",
      "Refunded"
    ],
    default:"Pending"
  },

  /* =====================================
     TRACKING
  ===================================== */

  bookingToken:{
    type:String,
    default:""
  },

  bookingStatus:{
    type:String,
    enum:[
      "Pending",
      "Confirmed",
      "Cancelled",
      "Rejected",
      "Completed"
    ],
    default:"Pending"
  },

  roomAvailability:{
    type:String,
    enum:[
      "Available",
      "Checking",
      "Not Available"
    ],
    default:"Checking"
  },

  cancelReason:{
    type:String,
    default:""
  },

  /* =====================================
     EXTRA
  ===================================== */

  specialRequest:{
    type:String,
    default:""
  },

  rating:{
    type:Number,
    default:0
  },

  review:{
    type:String,
    default:""
  }

},

{
  timestamps:true
});

const Booking =
mongoose.model(
  "Booking",
  bookingSchema
);

module.exports =
Booking;