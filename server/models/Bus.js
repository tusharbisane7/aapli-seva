const mongoose = require("mongoose");

const stopSchema =
new mongoose.Schema({

  stopName:{
    type:String,
    required:true
  },

  arrivalTime:{
    type:String
  },

  fare:{
    type:Number,
    default:0
  }

});

const busSchema =
new mongoose.Schema({

  /* =========================
     BUS DETAILS
  ========================= */

  busName:{
    type:String,
    required:true,
    trim:true
  },

  busNumber:{
    type:String,
    required:true
  },

  busType:{
    type:String,
    default:"Normal"
  },

  busCategory:{
    type:String,
    enum:[
      "Government",
      "Private"
    ],
    default:"Government"
  },

  /* =========================
     ROUTE
  ========================= */

  from:{
    type:String,
    required:true
  },

  to:{
    type:String,
    required:true
  },

  departureTime:{
    type:String
  },

  arrivalTime:{
    type:String
  },

  journeyDate:{
    type:String
  },

  /* =========================
     PRICE
  ========================= */

  price:{
    type:Number,
    default:0
  },

  /* =========================
     SEATS
  ========================= */

  seats:{
    type:Number,
    default:40
  },

  availableSeats:{
    type:Number,
    default:40
  },

  /* =========================
     OPERATOR
  ========================= */

  operator:{
    type:String,
    default:"MSRTC"
  },

  contact:{
    type:String
  },

  driverName:{
    type:String,
    default:"MSRTC Driver"
  },

  /* =========================
     STOPS
  ========================= */

  stops:[stopSchema],

  /* =========================
     AMENITIES
  ========================= */

  amenities:[{
    type:String
  }],

  /* =========================
     STATUS
  ========================= */

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

  /* =========================
     LIVE LOCATION
  ========================= */

  location:{

    latitude:{
      type:Number,
      default:0
    },

    longitude:{
      type:Number,
      default:0
    }

  },

  estimatedArrival:{
    type:String
  },

  currentStop:{
    type:String
  },

  nextStop:{
    type:String
  },

  routeDistance:{
    type:Number,
    default:0
  },

  government:{
    type:Boolean,
    default:false
  },

  active:{
    type:Boolean,
    default:true
  },

  createdAt:{
    type:Date,
    default:Date.now
  }

});

module.exports = mongoose.model(
  "Bus",
  busSchema
);