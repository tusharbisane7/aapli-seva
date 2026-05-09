const express = require("express");

const router = express.Router();

const Ticker = require("../models/Ticker");

/* =========================
   UPDATE TICKER
========================= */

router.put("/update", async(req,res)=>{

  try{

    let ticker = await Ticker.findOne();

    if(!ticker){

      ticker = new Ticker({
        news:req.body.news
      });

    }else{

      ticker.news = req.body.news;

    }

    await ticker.save();

    res.status(200).json({

      success:true,
      message:"Ticker Updated",
      ticker

    });

  }catch(error){

    console.log(error);

    res.status(500).json({

      success:false,
      message:"Ticker Update Failed"

    });

  }

});

/* =========================
   GET TICKER
========================= */

router.get("/latest", async(req,res)=>{

  try{

    const ticker = await Ticker.findOne();

    res.status(200).json({

      success:true,

      news:
      ticker?.news || ""

    });

  }catch(error){

    console.log(error);

    res.status(500).json({

      success:false

    });

  }

});

module.exports = router;