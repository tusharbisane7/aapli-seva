const nodemailer = require("nodemailer");

const transporter =
nodemailer.createTransport({

  service:"gmail",

  auth:{

    user:"tusharbisane.laptop@gmail.com",

    pass:"cpzzxsfxaxyrmobu"

  }

});

module.exports = transporter;