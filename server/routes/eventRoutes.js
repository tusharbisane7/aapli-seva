const express = require("express");

const router = express.Router();

const Event = require("../models/Event");

/* ADD EVENT */

router.post("/add", async(req,res)=>{

  try{

    const event = new Event(req.body);

    await event.save();

    res.status(201).json({
      success:true,
      event
    });

  }catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }

});

/* GET ALL */

router.get("/all", async(req,res)=>{

  try{

    const events =
    await Event.find()
    .sort({createdAt:-1});

    res.status(200).json({
      success:true,
      events
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

    const event =
    await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new:true}
    );

    res.status(200).json({
      success:true,
      event
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

    await Event.findByIdAndDelete(
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