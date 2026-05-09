// FILE: server/routes/transportBookingRoutes.js

const express = require("express");

const router = express.Router();

const mongoose = require("mongoose");

const TransportBooking = require(
  "../models/TransportBooking"
);

const Bus = require(
  "../models/Bus"
);

/* ==================================================
   BOOK SEAT
================================================== */

router.post("/book", async (req, res) => {

  try {

    const {

      busId,
      seats,
      fullName,
      mobile,
      pickup,
      dropPoint

    } = req.body;

    /* =========================================
       VALIDATION
    ========================================= */

    if (!busId) {

      return res.status(400).json({

        success: false,

        message: "Bus ID Required"

      });

    }

    if (

      !mongoose.Types.ObjectId.isValid(
        busId
      )

    ) {

      return res.status(400).json({

        success: false,

        message: "Invalid Bus ID"

      });

    }

    if (

      !Array.isArray(seats) ||

      seats.length === 0

    ) {

      return res.status(400).json({

        success: false,

        message: "Please Select Seats"

      });

    }

    if (

      !fullName ||
      !mobile ||
      !pickup ||
      !dropPoint

    ) {

      return res.status(400).json({

        success: false,

        message:
        "Passenger Details Required"

      });

    }

    if (

      pickup.trim().toLowerCase() ===
      dropPoint.trim().toLowerCase()

    ) {

      return res.status(400).json({

        success: false,

        message:
        "Pickup & Drop cannot be same"

      });

    }

    /* =========================================
       FIND BUS
    ========================================= */

    const bus = await Bus.findById(
      busId
    );

    if (!bus) {

      return res.status(404).json({

        success: false,

        message: "Bus Not Found"

      });

    }

    /* =========================================
       CHECK SEATS
    ========================================= */

    if (

      Number(bus.availableSeats) <
      seats.length

    ) {

      return res.status(400).json({

        success: false,

        message:
        "Seats Not Available"

      });

    }

    /* =========================================
       GET STOPS
    ========================================= */

    const stops = Array.isArray(
      bus.stops
    )

    ? bus.stops

    : [];

    /* =========================================
       FIND PICKUP & DROP
    ========================================= */

    const pickupStop =
    stops.find(

      (item) =>

        item.stopName
        ?.trim()
        .toLowerCase()

        ===

        pickup
        ?.trim()
        .toLowerCase()

    );

    const dropStop =
    stops.find(

      (item) =>

        item.stopName
        ?.trim()
        .toLowerCase()

        ===

        dropPoint
        ?.trim()
        .toLowerCase()

    );

    if (

      !pickupStop ||
      !dropStop

    ) {

      return res.status(400).json({

        success: false,

        message:
        "Invalid Pickup or Drop Stop"

      });

    }

    /* =========================================
       FARE
    ========================================= */

    const pickupFare =
    Number(
      pickupStop.fare || 0
    );

    const dropFare =
    Number(
      dropStop.fare || 0
    );

    let journeyFare = Math.abs(

      dropFare - pickupFare

    );

    if (journeyFare <= 0) {

      journeyFare =
      Number(bus.price || 0);

    }

    const totalAmount =

      journeyFare *

      seats.length;

    /* =========================================
       TRACKING NUMBER
    ========================================= */

    const trackingNumber =

      "BUS" +

      Math.floor(

        1000 +
        Math.random() * 9000

      );

    /* =========================================
       TICKET NUMBER
    ========================================= */

    const ticketNumber =

      Math.floor(

        100000 +
        Math.random() * 900000

      );

    /* =========================================
       CREATE BOOKING DATA
    ========================================= */

    const bookingData = {

      busId:
      bus._id,

      busName:
      bus.busName || "",

      busNumber:

      bus.busNumber ||

      "MH40" +

      Math.floor(
        1000 + Math.random() * 9000
      ),

      busCategory:

      bus.busCategory ||

      (
        bus.government
        ? "Government"
        : "Private"
      ),

      route:

      `${pickup} → ${dropPoint}`,

      driverName:

      bus.driverName ||

      "MSRTC Driver",

      driverContact:

      bus.driverContact ||

      bus.contact ||

      "9876543210",

      departureTime:

      bus.departureTime ||

      "07:30 AM",

      arrivalTime:

      bus.arrivalTime ||

      "02:30 PM",

      journeyDate:

      new Date()
      .toLocaleDateString(),

      travelDate:

      new Date()
      .toLocaleDateString(),

      fullName,

      mobile,

      pickup,

      dropPoint,

      pickupFare,

      dropFare,

      journeyFare,

      seats:
      seats.map(Number),

      fare:
      journeyFare,

      amount:
      totalAmount,

      trackingNumber,

      ticketNumber,

      bookingStatus:
      "Confirmed",

      paymentStatus:
      "Paid",

      liveStatus:

      bus.liveStatus ||

      "On Time"

    };

    /* =========================================
       SAVE BOOKING
    ========================================= */

    const booking =

    new TransportBooking(
      bookingData
    );

    await booking.save();

    /* =========================================
       UPDATE BUS SEATS
    ========================================= */

    bus.availableSeats =

      Number(bus.availableSeats)

      -

      seats.length;

    await bus.save();

    /* =========================================
       RESPONSE
    ========================================= */

    return res.status(201).json({

      success: true,

      message:
      "Seat Booked Successfully",

      booking,

      bookingId:
      booking._id,

      trackingNumber,

      ticketNumber

    });

  } catch (error) {

    console.log(

      "BOOKING ERROR:",
      error

    );

    return res.status(500).json({

      success: false,

      message:
      "Booking Failed",

      error:
      error.message

    });

  }

});

/* ==================================================
   GET ALL BOOKINGS
================================================== */

router.get("/all", async (req, res) => {

  try {

    const bookings =

    await TransportBooking.find()

    .sort({

      createdAt: -1

    });

    res.status(200).json({

      success: true,

      bookings

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: "Server Error"

    });

  }

});

/* ==================================================
   GET USER BOOKINGS
================================================== */

router.get("/user/:mobile", async (req, res) => {

  try {

    const bookings =

    await TransportBooking.find({

      mobile:
      req.params.mobile

    })

    .sort({

      createdAt: -1

    });

    res.status(200).json({

      success: true,

      bookings

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message:
      "User Booking Fetch Failed"

    });

  }

});

/* ==================================================
   TRACK BOOKING
================================================== */

router.get("/track/:digits", async (req, res) => {

  try {

    const digits =
    req.params.digits;

    const bookings =
    await TransportBooking.find();

    const booking =
    bookings.find(

      (item) =>

        item?.trackingNumber
        ?.slice(-4)

        ===

        digits

    );

    if (!booking) {

      return res.status(404).json({

        success: false,

        message:
        "Tracking Not Found"

      });

    }

    res.status(200).json({

      success: true,

      booking

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message:
      "Tracking Failed"

    });

  }

});

/* ==================================================
   GET SINGLE BOOKING
================================================== */

router.get("/:id", async (req, res) => {

  try {

    if (

      !mongoose.Types.ObjectId.isValid(
        req.params.id
      )

    ) {

      return res.status(400).json({

        success: false,

        message: "Invalid Booking ID"

      });

    }

    const booking =

    await TransportBooking.findById(
      req.params.id
    );

    if (!booking) {

      return res.status(404).json({

        success: false,

        message:
        "Booking Not Found"

      });

    }

    res.status(200).json({

      success: true,

      booking

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message:
      "Server Error"

    });

  }

});

/* ==================================================
   DELETE BOOKING
================================================== */

router.delete("/delete/:id", async (req, res) => {

  try {

    const booking =

    await TransportBooking.findById(
      req.params.id
    );

    if (!booking) {

      return res.status(404).json({

        success: false,

        message:
        "Booking Not Found"

      });

    }

    const bus =
    await Bus.findById(
      booking.busId
    );

    if (bus) {

      bus.availableSeats +=

      booking.seats.length;

      await bus.save();

    }

    await TransportBooking.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({

      success: true,

      message:
      "Booking Deleted"

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message:
      "Delete Failed"

    });

  }

});

module.exports = router;