// FILE: src/pages/transportation/TransportBooking.jsx

import "./myTransportBookings.scss";

import { useEffect, useState } from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import axios from "axios";

import {

  FaBus,
  FaClock,
  FaUsers,
  FaMoneyBillWave,
  FaTicketAlt,
  FaRoute,
  FaUserTie,
  FaPhone

} from "react-icons/fa";

import SeatLayout
from "../../components/transport/SeatLayout";

function TransportBooking() {

  const { id } = useParams();

  const navigate = useNavigate();

  /* =========================================
     STATES
  ========================================= */

  const [bus, setBus]
  = useState(null);

  const [loading, setLoading]
  = useState(true);

  const [bookingLoading,
  setBookingLoading]
  = useState(false);

  const [selectedSeats,
  setSelectedSeats]
  = useState([]);

  const [selectedPickupFare,
  setSelectedPickupFare]
  = useState(0);

  const [selectedDropFare,
  setSelectedDropFare]
  = useState(0);

  const [formData, setFormData]
  = useState({

    fullName: "",

    mobile: "",

    pickup: "",

    dropPoint: ""

  });

  /* =========================================
     FETCH BUS
  ========================================= */

  useEffect(() => {

    fetchBus();

  }, []);

  const fetchBus = async () => {

    try {

      const res = await axios.get(

        `https://aapli-seva.onrender.com/api/transport/${id}`

      );

      setBus(
        res.data.bus
      );

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);

    }

  };

  /* =========================================
     HANDLE INPUT
  ========================================= */

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value

    });

  };

  /* =========================================
     HANDLE PICKUP
  ========================================= */

  const handlePickup = (e) => {

    const value = e.target.value;

    const stop = bus?.stops?.find(

      (item) =>

      item.stopName === value

    );

    setFormData({

      ...formData,

      pickup: value

    });

    setSelectedPickupFare(

      Number(stop?.fare || 0)

    );

  };

  /* =========================================
     HANDLE DROP
  ========================================= */

  const handleDrop = (e) => {

    const value = e.target.value;

    const stop = bus?.stops?.find(

      (item) =>

      item.stopName === value

    );

    setFormData({

      ...formData,

      dropPoint: value

    });

    setSelectedDropFare(

      Number(stop?.fare || 0)

    );

  };

  /* =========================================
     TOTAL PRICE
  ========================================= */

  const totalFare =

    Math.abs(

      Number(selectedDropFare || 0) -

      Number(selectedPickupFare || 0)

    ) ||

    Number(bus?.price || 0);

  const totalAmount =

    totalFare *

    selectedSeats.length;

  /* =========================================
     GENERATE TICKET NUMBER
  ========================================= */

  const generateTicketNumber = () => {

    return Math.floor(

      1000 +
      Math.random() * 9000

    );

  };

  /* =========================================
     HANDLE BOOKING
  ========================================= */

  const handleBooking = async () => {

    try {

      /* VALIDATION */

      if (!formData.fullName) {

        alert("Enter Full Name");

        return;

      }

      if (!formData.mobile) {

        alert("Enter Mobile Number");

        return;

      }

      if (!formData.pickup) {

        alert("Select Pickup Stop");

        return;

      }

      if (!formData.dropPoint) {

        alert("Select Drop Stop");

        return;

      }

      if (

        formData.pickup ===
        formData.dropPoint

      ) {

        alert(
          "Pickup & Drop cannot be same"
        );

        return;

      }

      if (
        selectedSeats.length === 0
      ) {

        alert(
          "Please Select Seats"
        );

        return;

      }

      if (totalFare <= 0) {

        alert(
          "Invalid Fare Calculation"
        );

        return;

      }

      setBookingLoading(true);

      const ticketNumber =
      generateTicketNumber();

      /* =====================================
         PAYLOAD
      ===================================== */

      const payload = {

        fullName:
        formData.fullName,

        mobile:
        formData.mobile,

        pickup:
        formData.pickup,

        dropPoint:
        formData.dropPoint,

        busId:
        bus._id,

        busName:
        bus.busName,

        busNumber:

        bus.busNumber ||

        "MH27AB" + ticketNumber,

        route:

        `${formData.pickup}
        → ${formData.dropPoint}`,

        departureTime:

        bus.departureTime ||

        "08:00 AM",

        arrivalTime:

        bus.arrivalTime ||

        "04:00 PM",

        driverName:

        bus.driverName ||

        "Ramesh Sharma",

        driverContact:

        bus.contact ||

        "9876543210",

        fare:
        totalFare,

        pickupFare:
        selectedPickupFare,

        dropFare:
        selectedDropFare,

        ticketNumber,

        travelDate:

        new Date()
        .toLocaleDateString(),

        seats:
        selectedSeats,

        amount:
        totalAmount,

        bookingStatus:
        "Confirmed",

        paymentStatus:
        "Paid",

        liveStatus:
        "On Time",

        busCategory:

        bus.busCategory ||

        "Government"

      };

      console.log(payload);

      /* =====================================
         API
      ===================================== */

      const res = await axios.post(

        "https://aapli-seva.onrender.com/api/transport-bookings/book",

        payload

      );

      /* =====================================
         SAVE TICKET
      ===================================== */

      localStorage.setItem(

        "transportTicket",

        JSON.stringify(
          res.data.booking
        )

      );

      alert(
        "Seat Booked Successfully"
      );

      navigate(

        `/transport-ticket/${res.data.booking._id}`

      );

    } catch (error) {

      console.log(error);

      console.log(
        error?.response?.data
      );

      alert(

        error?.response?.data?.message ||

        "Booking Failed"

      );

    } finally {

      setBookingLoading(false);

    }

  };

  /* =========================================
     LOADING
  ========================================= */

  if (loading) {

    return (

      <div className="transport-loading">

        Loading Bus...

      </div>

    );

  }

  /* =========================================
     NOT FOUND
  ========================================= */

  if (!bus) {

    return (

      <div className="transport-error">

        Bus Not Found

      </div>

    );

  }

  return (

    <div className="transport-booking-page">

      {/* HERO */}

      <div className="booking-hero">

        <div className="overlay"></div>

        <div className="hero-content">

          <span>

            <FaBus />

            Maharashtra Smart Transport

          </span>

          <h1>

            {bus.busName}

          </h1>

          <p>

            {bus.from}

            {" → "}

            {bus.to}

          </p>

        </div>

      </div>

      {/* MAIN */}

      <div className="booking-container">

        {/* LEFT */}

        <div className="seat-section">

          <div className="section-title">

            <h2>

              Select Seats

            </h2>

            <p>

              Choose your preferred seats

            </p>

          </div>

          <SeatLayout

            totalSeats={
              bus.seats || 40
            }

            selectedSeats={
              selectedSeats
            }

            setSelectedSeats={
              setSelectedSeats
            }

          />

        </div>

        {/* RIGHT */}

        <div className="booking-sidebar">

          {/* BUS INFO */}

          <div className="bus-info-card">

            <h3>

              Bus Information

            </h3>

            <div className="info-row">

              <FaRoute />

              <span>

                {bus.from}

                {" → "}

                {bus.to}

              </span>

            </div>

            <div className="info-row">

              <FaClock />

              <span>

                {

                  bus.departureTime ||

                  "08:00 AM"

                }

              </span>

            </div>

            <div className="info-row">

              <FaUsers />

              <span>

                {

                  bus.availableSeats || 0

                }

                {" "}
                Seats Left

              </span>

            </div>

            <div className="info-row">

              <FaMoneyBillWave />

              <span>

                ₹{bus.price}

                {" "}
                Base Fare

              </span>

            </div>

            <div className="info-row">

              <FaUserTie />

              <span>

                {

                  bus.driverName ||

                  "Ramesh Driver"

                }

              </span>

            </div>

            <div className="info-row">

              <FaPhone />

              <span>

                {

                  bus.contact ||

                  "9876543210"

                }

              </span>

            </div>

          </div>

          {/* FORM */}

          <div className="booking-form">

            <h2>

              Passenger Details

            </h2>

            {/* NAME */}

            <input

              type="text"

              name="fullName"

              placeholder="Full Name"

              value={formData.fullName}

              onChange={handleChange}

            />

            {/* MOBILE */}

            <input

              type="text"

              name="mobile"

              placeholder="Mobile Number"

              value={formData.mobile}

              onChange={handleChange}

            />

            {/* PICKUP */}

            <select

              name="pickup"

              value={formData.pickup}

              onChange={handlePickup}

            >

              <option value="">

                Select Pickup Stop

              </option>

              {

                bus?.stops?.map(

                  (stop,index)=>(

                    <option
                      key={index}
                      value={stop.stopName}
                    >

                      {stop.stopName}

                    </option>

                  )

                )

              }

            </select>

            {/* DROP */}

            <select

              name="dropPoint"

              value={formData.dropPoint}

              onChange={handleDrop}

            >

              <option value="">

                Select Drop Stop

              </option>

              {

                bus?.stops?.map(

                  (stop,index)=>(

                    <option
                      key={index}
                      value={stop.stopName}
                    >

                      {stop.stopName}

                    </option>

                  )

                )

              }

            </select>

            {/* SEATS */}

            <div className="selected-seat-box">

              <strong>

                Selected Seats

              </strong>

              <p>

                {

                  selectedSeats.length > 0

                  ? selectedSeats.join(", ")

                  : "No Seat Selected"

                }

              </p>

            </div>

            {/* PRICE */}

            <div className="price-box">

              <h3>

                Total Amount

              </h3>

              <h1>

                ₹{totalAmount}

              </h1>

              <p>

                ₹{totalFare}
                {" "}
                ×
                {" "}
                {

                  selectedSeats.length

                }
                {" "}
                Seats

              </p>

            </div>

            {/* BUTTON */}

            <button

              className="booking-btn"

              onClick={handleBooking}

              disabled={bookingLoading}

            >

              <FaTicketAlt />

              {

                bookingLoading

                ? "Booking..."

                : "Confirm Booking"

              }

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default TransportBooking;