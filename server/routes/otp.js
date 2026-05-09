const express = require("express");

const router = express.Router();

const transporter = require(
  "../utils/mailer"
);

/* STORE OTP */

let otpStore = {};

/* SEND OTP */

router.post(

  "/send-otp",

  async(req,res)=>{

    try{

      const { email } = req.body;

      const otp = Math.floor(

        100000 + Math.random() * 900000

      );

      otpStore[email] = otp;

      await transporter.sendMail({

        from:"tusharbisane.laptop@gmail.com",

        to:email,

        subject:"Aapli Seva OTP Verification",

        html:`

          <div
            style="
              font-family:Poppins;
              padding:20px;
            "
          >

            <h2>
              Your OTP Code
            </h2>

            <h1
              style="
                color:#2563eb;
                letter-spacing:3px;
              "
            >
              ${otp}
            </h1>

            <p>
              Do not share this OTP.
            </p>

          </div>

        `

      });

      console.log(
        "OTP Sent:",
        otp
      );

      res.status(200).json({

        message:"OTP Sent Successfully"

      });

    }catch(error){

      console.log(error);

      res.status(500).json({

        message:"OTP Failed"

      });

    }

  }

);

/* VERIFY OTP */

router.post(

  "/verify-otp",

  (req,res)=>{

    const { email, otp } = req.body;

    if(otpStore[email] == otp){

      delete otpStore[email];

      return res.status(200).json({

        success:true,

        message:"OTP Verified"

      });

    }

    res.status(400).json({

      success:false,

      message:"Invalid OTP"

    });

  }

);

module.exports = router;