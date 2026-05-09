const Bus = require(
  "../models/Bus"
);

const TransportBooking = require(
  "../models/TransportBooking"
);

/* =========================
   ADD BUS
========================= */

exports.addBus = async(req,res)=>{

  try{

    const bus = new Bus(req.body);

    await bus.save();

    res.status(201).json({

      success:true,

      message:"Bus Added Successfully",

      bus

    });

  }catch(error){

    console.log(error);

    res.status(500).json({

      success:false,

      message:"Server Error"

    });

  }

};

/* =========================
   GET ALL BUSES
========================= */

exports.getAllBuses =
async(req,res)=>{

  try{

    const buses =

    await Bus.find()

    .sort({

      createdAt:-1

    });

    res.status(200).json({

      success:true,

      buses

    });

  }catch(error){

    console.log(error);

    res.status(500).json({

      success:false,

      message:"Server Error"

    });

  }

};

/* =========================
   GET SINGLE BUS
========================= */

exports.getSingleBus =
async(req,res)=>{

  try{

    const bus = await Bus.findById(

      req.params.id

    );

    if(!bus){

      return res.status(404).json({

        success:false,

        message:"Bus Not Found"

      });

    }

    res.status(200).json({

      success:true,

      bus

    });

  }catch(error){

    console.log(error);

    res.status(500).json({

      success:false,

      message:"Server Error"

    });

  }

};

/* =========================
   SEARCH ROUTE
========================= */

exports.searchRoutes =
async(req,res)=>{

  try{

    const city =
    req.params.city;

    const buses =

    await Bus.find({

      $or:[

        {

          from:{

            $regex:city,

            $options:"i"

          }

        },

        {

          to:{

            $regex:city,

            $options:"i"

          }

        }

      ]

    });

    res.status(200).json({

      success:true,

      buses

    });

  }catch(error){

    console.log(error);

    res.status(500).json({

      success:false,

      message:"Server Error"

    });

  }

};

/* =========================
   UPDATE BUS
========================= */

exports.updateBus =
async(req,res)=>{

  try{

    const updatedBus =

    await Bus.findByIdAndUpdate(

      req.params.id,

      req.body,

      {

        new:true

      }

    );

    res.status(200).json({

      success:true,

      message:"Bus Updated",

      updatedBus

    });

  }catch(error){

    console.log(error);

    res.status(500).json({

      success:false,

      message:"Update Failed"

    });

  }

};

/* =========================
   DELETE BUS
========================= */

exports.deleteBus =
async(req,res)=>{

  try{

    await Bus.findByIdAndDelete(

      req.params.id

    );

    res.status(200).json({

      success:true,

      message:"Bus Deleted"

    });

  }catch(error){

    console.log(error);

    res.status(500).json({

      success:false,

      message:"Delete Failed"

    });

  }

};

/* =========================
   BOOK SEAT
========================= */

exports.bookSeat =
async(req,res)=>{

  try{

    const {

      busId,

      seats

    } = req.body;

    const bus =

    await Bus.findById(busId);

    if(!bus){

      return res.status(404).json({

        success:false,

        message:"Bus Not Found"

      });

    }

    if(

      bus.availableSeats < seats

    ){

      return res.status(400).json({

        success:false,

        message:
        "Seats Not Available"

      });

    }

    /* UPDATE SEATS */

    bus.availableSeats =

    bus.availableSeats - seats;

    await bus.save();

    /* SAVE BOOKING */

    const booking =

    new TransportBooking(

      req.body

    );

    await booking.save();

    res.status(201).json({

      success:true,

      message:"Seat Booked",

      booking

    });

  }catch(error){

    console.log(error);

    res.status(500).json({

      success:false,

      message:"Booking Failed"

    });

  }

};

/* =========================
   GET BOOKINGS
========================= */

exports.getBookings =
async(req,res)=>{

  try{

    const bookings =

    await TransportBooking.find()

    .sort({

      createdAt:-1

    });

    res.status(200).json({

      success:true,

      bookings

    });

  }catch(error){

    console.log(error);

    res.status(500).json({

      success:false,

      message:"Server Error"

    });

  }

};

/* =========================
   UPDATE LIVE STATUS
========================= */

exports.updateLiveStatus =
async(req,res)=>{

  try{

    const {

      liveStatus,

      latitude,

      longitude

    } = req.body;

    const bus =

    await Bus.findByIdAndUpdate(

      req.params.id,

      {

        liveStatus,

        location:{

          latitude,

          longitude

        }

      },

      {

        new:true

      }

    );

    res.status(200).json({

      success:true,

      message:
      "Live Status Updated",

      bus

    });

  }catch(error){

    console.log(error);

    res.status(500).json({

      success:false,

      message:"Update Failed"

    });

  }

};