const mongoose = require("mongoose");

const tickerSchema =
new mongoose.Schema({

  news:{
    type:String,
    default:""
  }

});

module.exports =
mongoose.model(
  "Ticker",
  tickerSchema
);