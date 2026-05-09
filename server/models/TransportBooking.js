const mongoose = require("mongoose");

const transportBookingSchema =
new mongoose.Schema({

  /* =====================================
     BUS DETAILS
  ===================================== */

  busId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Bus",
    required:true
  },

  busName:{
    type:String,
    default:""
  },

  busNumber:{
    type:String,
    default:""
  },

  busCategory:{
    type:String,
    enum:[
      "Government",
      "Private"
    ],
    default:"Government"
  },

  route:{
    type:String,
    default:""
  },

  /* =====================================
     DRIVER DETAILS
  ===================================== */

  driverName:{
    type:String,
    default:""
  },

  driverContact:{
    type:String,
    default:""
  },

  /* =====================================
     JOURNEY DETAILS
  ===================================== */

  departureTime:{
    type:String,
    default:""
  },

  arrivalTime:{
    type:String,
    default:""
  },

  journeyDate:{
    type:String,
    default:""
  },

  travelDate:{
    type:String,
    default:""
  },

  /* =====================================
     PASSENGER DETAILS
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

  /* =====================================
     STOPS
  ===================================== */

  pickup:{
    type:String,
    required:true,
    trim:true
  },

  dropPoint:{
    type:String,
    required:true,
    trim:true
  },

  pickupFare:{
    type:Number,
    default:0
  },

  dropFare:{
    type:Number,
    default:0
  },

  journeyFare:{
    type:Number,
    default:0
  },

  /* =====================================
     SEATS
  ===================================== */

  seats:[
    {
      type:Number
    }
  ],

  /* =====================================
     PAYMENT
  ===================================== */

  amount:{
    type:Number,
    default:0
  },

  fare:{
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
    default:"Paid"
  },

  /* =====================================
     BOOKING STATUS
  ===================================== */

  bookingStatus:{
    type:String,
    enum:[
      "Confirmed",
      "Cancelled",
      "Pending"
    ],
    default:"Confirmed"
  },

  cancelReason:{
    type:String,
    default:""
  },

  /* =====================================
     TRACKING
  ===================================== */

  trackingNumber:{
    type:String,
    default:""
  },

  ticketNumber:{
    type:Number,
    default:0
  },

  liveStatus:{
    type:String,
    enum:[
      "On Time",
      "Delayed",
      "Cancelled",
      "Arrived"
    ],
    default:"On Time"
  },

  /* =====================================
     LIVE LOCATION
  ===================================== */

  liveLocation:{

    latitude:{
      type:Number,
      default:21.1458
    },

    longitude:{
      type:Number,
      default:79.0882
    }

  },

  /* =====================================
     EXTRA
  ===================================== */

  rating:{
    type:Number,
    default:0
  },

  feedback:{
    type:String,
    default:""
  },

  createdAt:{
    type:Date,
    default:Date.now
  }

});

module.exports = mongoose.model(
  "TransportBooking",
  transportBookingSchema
);