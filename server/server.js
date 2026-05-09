const express = require("express");

const cors = require("cors");

const path = require("path");

const http = require("http");

const socketio = require("socket.io");

require("dotenv").config();

/* =========================
   DB
========================= */

const connectDB = require(
  "./config/db"
);

/* =========================
   ROUTES
========================= */

/* AUTH */

const authRoutes = require(
  "./routes/authRoutes"
);

/* APPLICATION */

const applicationRoutes = require(
  "./routes/applicationRoutes"
);

/* PAYMENT */

const paymentRoutes = require(
  "./routes/paymentRoutes"
);

/* HOTELS */

const hotelRoutes = require(
  "./routes/hotelRoutes"
);

/* BOOKINGS */

const bookingRoutes = require(
  "./routes/bookingRoutes"
);

/* HOMEPAGE REVIEWS */

const reviewRoutes = require(
  "./routes/reviewRoutes"
);

/* HOTEL REVIEWS */

const hotelReviewRoutes = require(
  "./routes/hotelReviewRoutes"
);

/* OTP */

const otpRoutes = require(
  "./routes/otp"
);

/* TRANSPORT */

const transportRoutes = require(
  "./routes/transportRoutes"
);

const transportBookingRoutes = require(
  "./routes/transportBookingRoutes"
);

/* EVENTS */

const eventRoutes = require(
  "./routes/eventRoutes"
);

/* EXPLORE */

const exploreRoutes = require(
  "./routes/exploreRoutes"
);

/* TICKER */

const tickerRoutes = require(
  "./routes/tickerRoutes"
);

/* =========================
   APP
========================= */

const app = express();

/* =========================
   HTTP SERVER
========================= */

const server =
http.createServer(app);

/* =========================
   SOCKET.IO
========================= */

const io = socketio(server,{

  cors:{

    origin:"*",

    methods:["GET","POST"]

  }

});

/* =========================
   SOCKET CONNECTION
========================= */

io.on("connection",(socket)=>{

  console.log(
    "Socket Connected"
  );

  /* LIVE BUS TRACKING */

  socket.on(

    "busLocationUpdate",

    (data)=>{

      io.emit(

        "receiveBusLocation",

        data

      );

    }

  );

  socket.on("disconnect",()=>{

    console.log(
      "Socket Disconnected"
    );

  });

});

/* =========================
   CONNECT DATABASE
========================= */

connectDB();

/* =========================
   MIDDLEWARE
========================= */

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({

  extended:true

}));

/* =========================
   STATIC UPLOADS
========================= */

app.use(

  "/uploads",

  express.static(

    path.join(__dirname,"uploads")

  )

);

/* =========================
   STATIC TICKETS
========================= */

app.use(

  "/tickets",

  express.static(

    path.join(__dirname,"tickets")

  )

);

/* =========================
   API ROUTES
========================= */

/* AUTH */

app.use(

  "/api/auth",

  authRoutes

);

/* APPLICATION */

app.use(

  "/api/application",

  applicationRoutes

);

/* PAYMENT */

app.use(

  "/api/payment",

  paymentRoutes

);

/* HOTELS */

app.use(

  "/api/hotels",

  hotelRoutes

);

/* BOOKINGS */

app.use(

  "/api/bookings",

  bookingRoutes

);

/* HOMEPAGE REVIEWS */

app.use(

  "/api/reviews",

  reviewRoutes

);

/* HOTEL REVIEWS */

app.use(

  "/api/hotel-reviews",

  hotelReviewRoutes

);

/* OTP */

app.use(

  "/api/otp",

  otpRoutes

);

/* =========================
   TRANSPORT APIs
========================= */

app.use(

  "/api/transport",

  transportRoutes

);

app.use(

  "/api/transport-bookings",

  transportBookingRoutes

);

/* =========================
   EVENTS APIs
========================= */

app.use(

  "/api/events",

  eventRoutes

);

/* =========================
   EXPLORE APIs
========================= */

app.use(

  "/api/explore",

  exploreRoutes

);

/* =========================
   TICKER APIs
========================= */

app.use(

  "/api/ticker",

  tickerRoutes

);

/* =========================
   TEST ROUTE
========================= */

app.get("/",(req,res)=>{

  res.send(

    "Aapli Seva Backend Running"

  );

});

/* =========================
   HANDLE 404
========================= */

app.use((req,res)=>{

  res.status(404).json({

    success:false,

    message:"API Route Not Found"

  });

});

/* =========================
   GLOBAL ERROR HANDLER
========================= */

app.use((err,req,res,next)=>{

  console.log(err);

  res.status(500).json({

    success:false,

    message:"Internal Server Error"

  });

});

/* =========================
   PORT
========================= */

const PORT =

process.env.PORT || 5000;

/* =========================
   START SERVER
========================= */

server.listen(PORT,()=>{

  console.log(

    `Server running on port ${PORT}`

  );

});