const express = require("express");

const mongoose = require("mongoose");

const router = express.Router();

const Bus = require("../models/Bus");

/* ==================================================
   FORMAT AMENITIES
================================================== */

const formatAmenities = (amenities) => {

  if (Array.isArray(amenities)) {

    return amenities;

  }

  if (typeof amenities === "string") {

    return amenities
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

  }

  return [];

};

/* ==================================================
   ADD BUS
================================================== */

router.post("/add", async (req, res) => {

  try {

    /* =====================================
       GOVERNMENT BOOLEAN
    ===================================== */

    const governmentValue =

      req.body.busCategory ===
      "Government";

    /* =====================================
       CLEAN STOPS
    ===================================== */

    const formattedStops =

      Array.isArray(req.body.stops)

      ? req.body.stops.filter(

          (item) =>

            item.stopName &&
            item.stopName.trim() !== ""

        )

      : [];

    /* =====================================
       CREATE BUS
    ===================================== */

    const bus = new Bus({

      ...req.body,

      government:
      governmentValue,

      amenities:
      formatAmenities(
        req.body.amenities
      ),

      stops:
      formattedStops

    });

    await bus.save();

    res.status(201).json({

      success: true,

      message:
      "Bus Added Successfully",

      bus

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message:
      "Server Error",

      error:
      error.message

    });

  }

});

/* ==================================================
   GET ALL BUSES
================================================== */

router.get("/all", async (req, res) => {

  try {

    const buses =
    await Bus.find()

    .sort({

      createdAt: -1

    });

    res.status(200).json({

      success: true,

      total:
      buses.length,

      buses

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
   GET GOVERNMENT BUSES
================================================== */

router.get("/government", async (req, res) => {

  try {

    const buses =
    await Bus.find({

      busCategory:
      "Government"

    });

    res.status(200).json({

      success: true,

      buses

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
   GET PRIVATE BUSES
================================================== */

router.get("/private", async (req, res) => {

  try {

    const buses =
    await Bus.find({

      busCategory:
      "Private"

    });

    res.status(200).json({

      success: true,

      buses

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
   SEARCH ROUTES
================================================== */

router.get("/search/:city", async (req, res) => {

  try {

    const buses = await Bus.find({

      $or: [

        {

          from: {

            $regex:
            req.params.city,

            $options: "i"

          }

        },

        {

          to: {

            $regex:
            req.params.city,

            $options: "i"

          }

        },

        {

          busName: {

            $regex:
            req.params.city,

            $options: "i"

          }

        }

      ]

    });

    res.status(200).json({

      success: true,

      buses

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
   GET SINGLE BUS
================================================== */

router.get("/:id", async (req, res) => {

  try {

    const { id } =
    req.params;

    /* VALID OBJECT ID */

    if (

      !mongoose.Types
      .ObjectId
      .isValid(id)

    ) {

      return res.status(400).json({

        success: false,

        message:
        "Invalid Bus ID"

      });

    }

    const bus =
    await Bus.findById(id);

    if (!bus) {

      return res.status(404).json({

        success: false,

        message:
        "Bus Not Found"

      });

    }

    res.status(200).json({

      success: true,

      bus

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
   UPDATE BUS
================================================== */

router.put("/update/:id", async (req, res) => {

  try {

    const governmentValue =

      req.body.busCategory ===
      "Government";

    const formattedStops =

      Array.isArray(req.body.stops)

      ? req.body.stops.filter(

          (item) =>

            item.stopName &&
            item.stopName.trim() !== ""

        )

      : [];

    const updatedBus =

    await Bus.findByIdAndUpdate(

      req.params.id,

      {

        ...req.body,

        government:
        governmentValue,

        amenities:
        formatAmenities(
          req.body.amenities
        ),

        stops:
        formattedStops

      },

      {

        returnDocument:
        "after"

      }

    );

    if (!updatedBus) {

      return res.status(404).json({

        success: false,

        message:
        "Bus Not Found"

      });

    }

    res.status(200).json({

      success: true,

      message:
      "Bus Updated Successfully",

      updatedBus

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message:
      "Update Failed"

    });

  }

});

/* ==================================================
   UPDATE LIVE STATUS
================================================== */

router.put("/update-status/:id", async (req, res) => {

  try {

    const { liveStatus } =
    req.body;

    const updatedBus =

    await Bus.findByIdAndUpdate(

      req.params.id,

      {

        liveStatus

      },

      {

        returnDocument:
        "after"

      }

    );

    res.status(200).json({

      success: true,

      message:
      "Live Status Updated",

      updatedBus

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message:
      "Status Update Failed"

    });

  }

});

/* ==================================================
   UPDATE SEATS
================================================== */

router.put("/update-seats/:id", async (req, res) => {

  try {

    const {

      availableSeats

    } = req.body;

    const updatedBus =

    await Bus.findByIdAndUpdate(

      req.params.id,

      {

        availableSeats

      },

      {

        returnDocument:
        "after"

      }

    );

    res.status(200).json({

      success: true,

      message:
      "Seat Availability Updated",

      updatedBus

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message:
      "Seat Update Failed"

    });

  }

});

/* ==================================================
   UPDATE LIVE LOCATION
================================================== */

router.put("/live-location/:id", async (req, res) => {

  try {

    const {

      latitude,
      longitude

    } = req.body;

    const updatedBus =

    await Bus.findByIdAndUpdate(

      req.params.id,

      {

        location: {

          latitude,
          longitude

        }

      },

      {

        returnDocument:
        "after"

      }

    );

    res.status(200).json({

      success: true,

      message:
      "Live Location Updated",

      updatedBus

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message:
      "Location Update Failed"

    });

  }

});

/* ==================================================
   DELETE BUS
================================================== */

router.delete("/delete/:id", async (req, res) => {

  try {

    const deletedBus =

    await Bus.findByIdAndDelete(

      req.params.id

    );

    if (!deletedBus) {

      return res.status(404).json({

        success: false,

        message:
        "Bus Not Found"

      });

    }

    res.status(200).json({

      success: true,

      message:
      "Bus Deleted Successfully"

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