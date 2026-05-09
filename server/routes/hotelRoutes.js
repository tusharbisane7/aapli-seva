const express = require("express");

const router = express.Router();

const Hotel =
require("../models/Hotel");

/* =========================
   ADD HOTEL
========================= */

router.post("/add", async(req,res)=>{

  try{

    const hotel =
    new Hotel(req.body);

    await hotel.save();

    res.status(201).json({

      success:true,
      hotel

    });

  }catch(error){

    console.log(error);

    res.status(500).json({

      success:false,
      message:error.message

    });

  }

});

/* =========================
   GET ALL HOTELS
========================= */

router.get("/all", async(req,res)=>{

  try{

    const hotels =
    await Hotel.find()
    .sort({createdAt:-1});

    res.status(200).json({

      success:true,
      hotels

    });

  }catch(error){

    console.log(error);

    res.status(500).json({

      success:false

    });

  }

});

/* =========================
   UPDATE HOTEL
========================= */

router.put("/update/:id", async(req,res)=>{

  try{

    const hotel =
    await Hotel.findByIdAndUpdate(

      req.params.id,
      req.body,
      {new:true}

    );

    res.status(200).json({

      success:true,
      hotel

    });

  }catch(error){

    console.log(error);

    res.status(500).json({

      success:false

    });

  }

});

/* =========================
   DELETE HOTEL
========================= */

router.delete("/delete/:id", async(req,res)=>{

  try{

    await Hotel.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({

      success:true

    });

  }catch(error){

    console.log(error);

    res.status(500).json({

      success:false

    });

  }

});

module.exports = router;