const express = require("express");

const router = express.Router();

const ExplorePlace =
require("../models/ExplorePlace");

/* ADD */

router.post("/add", async(req,res)=>{

  try{

    const place =
    new ExplorePlace(req.body);

    await place.save();

    res.status(201).json({
      success:true,
      place
    });

  }catch(error){

    res.status(500).json({
      success:false
    });

  }

});

/* GET */

router.get("/all", async(req,res)=>{

  try{

    const places =
    await ExplorePlace.find()
    .sort({createdAt:-1});

    res.status(200).json({
      success:true,
      places
    });

  }catch(error){

    res.status(500).json({
      success:false
    });

  }

});

/* UPDATE */

router.put("/update/:id", async(req,res)=>{

  try{

    const place =
    await ExplorePlace.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new:true}
    );

    res.status(200).json({
      success:true,
      place
    });

  }catch(error){

    res.status(500).json({
      success:false
    });

  }

});

/* DELETE */

router.delete("/delete/:id", async(req,res)=>{

  try{

    await ExplorePlace.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success:true
    });

  }catch(error){

    res.status(500).json({
      success:false
    });

  }

});

module.exports = router;