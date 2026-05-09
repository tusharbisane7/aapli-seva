// FILE: client/src/pages/transport/TransportBooking.jsx

import "./transportBooking.scss";

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
  FaTicketAlt,
  FaRoute

} from "react-icons/fa";

import SeatLayout
from "../../components/transport/SeatLayout";

function TransportBooking() {

  const { id } = useParams();

  const navigate = useNavigate();

  /* =========================
     STATES
  ========================= */

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

  const [pickupFare,
  setPickupFare]
  = useState(0);

  const [dropFare,
  setDropFare]
  = useState(0);

  const [formData,
  setFormData]
  = useState({

    fullName: "",

    mobile: "",

    pickup: "",

    dropPoint: ""

  });

  /* =========================
     FETCH BUS
  ========================= */

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

  /* =========================
     INPUT
  ========================= */

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value

    });

  };

  /* =========================
     CALCULATE FARE
  ========================= */

  const calculatedFare =

    Math.abs(

      Number(dropFare || 0) -

      Number(pickupFare || 0)

    );

  const totalAmount =

    calculatedFare *

    selectedSeats.length;

  /* =========================
     BOOKING
  ========================= */

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

        alert("Select Seats");

        return;

      }

      if (calculatedFare <= 0) {

        alert(
          "Invalid Journey Fare"
        );

        return;

      }

      setBookingLoading(true);

      /* =====================
         PAYLOAD
      ===================== */

      const payload = {

        busId:
        bus._id,

        busName:
        bus.busName,

        busNumber:
        bus.busNumber,

        busCategory:
        bus.busCategory ||

        "Government",

        route:

        `${formData.pickup}
        → ${formData.dropPoint}`,

        departureTime:

        bus.departureTime ||

        "07:00 AM",

        arrivalTime:

        bus.arrivalTime ||

        "02:00 PM",

        fullName:
        formData.fullName,

        mobile:
        formData.mobile,

        pickup:
        formData.pickup,

        dropPoint:
        formData.dropPoint,

        seats:
        selectedSeats,

        amount:
        totalAmount,

        fare:
        calculatedFare,

        pickupFare:
        pickupFare,

        dropFare:
        dropFare,

        bookingStatus:
        "Confirmed",

        paymentStatus:
        "Paid",

        liveStatus:
        "On Time"

      };

      console.log(payload);

      /* =====================
         API
      ===================== */

      const res = await axios.post(

        "https://aapli-seva.onrender.com/api/transport-bookings/book",

        payload

      );

      /* =====================
         SAVE TICKET
      ===================== */

      localStorage.setItem(

        "transportTicket",

        JSON.stringify(
          res.data.booking
        )

      );

      alert(
        "Bus Ticket Booked Successfully"
      );

      navigate(

        `/transport-ticket/${res.data.booking._id}`

      );

    } catch (error) {

      console.log(error);

      alert(

        error?.response?.data?.message ||

        "Booking Failed"

      );

    } finally {

      setBookingLoading(false);

    }

  };

  /* =========================
     LOADING
  ========================= */

  if (loading) {

    return (

      <div className="transport-loading">

        Loading Bus...

      </div>

    );

  }

  /* =========================
     NO BUS
  ========================= */

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

              Select Your Seats

            </h2>

            <p>

              Choose seats for your journey

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

                  "07:00 AM"

                }

              </span>

            </div>

            <div className="info-row">

              <FaUsers />

              <span>

                {

                  bus.availableSeats ||

                  0

                }

                {" "}
                Seats Left

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

              value={
                formData.fullName
              }

              onChange={
                handleChange
              }

            />

            {/* MOBILE */}

            <input

              type="text"

              name="mobile"

              placeholder="Mobile Number"

              value={
                formData.mobile
              }

              onChange={
                handleChange
              }

            />

            {/* PICKUP */}

            <select

              name="pickup"

              value={
                formData.pickup
              }

              onChange={(e) => {

                const value =
                e.target.value;

                const selectedStop =

                  bus?.stops?.find(

                    (item) =>

                    item.stopName ===
                    value

                  );

                setFormData({

                  ...formData,

                  pickup: value

                });

                setPickupFare(

                  Number(
                    selectedStop?.fare || 0
                  )

                );

              }}

            >

              <option value="">

                Select Pickup Stop

              </option>

              {

                bus?.stops?.map(

                  (stop,index)=>(

                    <option

                      key={index}

                      value={
                        stop.stopName
                      }

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

              value={
                formData.dropPoint
              }

              onChange={(e) => {

                const value =
                e.target.value;

                const selectedStop =

                  bus?.stops?.find(

                    (item) =>

                    item.stopName ===
                    value

                  );

                setFormData({

                  ...formData,

                  dropPoint: value

                });

                setDropFare(

                  Number(
                    selectedStop?.fare || 0
                  )

                );

              }}

            >

              <option value="">

                Select Drop Stop

              </option>

              {

                bus?.stops?.map(

                  (stop,index)=>(

                    <option

                      key={index}

                      value={
                        stop.stopName
                      }

                    >

                      {stop.stopName}

                    </option>

                  )

                )

              }

            </select>

            {/* SELECTED SEATS */}

            <div className="selected-seat-box">

              <strong>

                Selected Seats

              </strong>

              <p>

                {

                  selectedSeats.length > 0

                  ? selectedSeats.join(", ")

                  : "No Seats Selected"

                }

              </p>

            </div>

            {/* PRICE */}

            <div className="price-box">

              <h3>

                Journey Fare

              </h3>

              <h1>

                ₹{calculatedFare}

              </h1>

              <p>

                Total:
                {" "}
                ₹{totalAmount}

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