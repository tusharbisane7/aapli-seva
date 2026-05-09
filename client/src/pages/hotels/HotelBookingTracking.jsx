import "./bookingTracking.scss";

import {
  useState
} from "react";

import axios from "axios";

import Navbar from "../../components/navbar/Navbar";

import {
  FaSearch,
  FaHotel,
  FaUser,
  FaPhone,
  FaCalendarAlt,
  FaCheckCircle
} from "react-icons/fa";

function HotelBookingTracking(){

  const [token,setToken]
  = useState("");

  const [booking,setBooking]
  = useState(null);

  const [loading,setLoading]
  = useState(false);

  /* Search Booking */

  const searchBooking = async() => {

    if(!token){

      alert(
        "Enter Booking Token"
      );

      return;

    }

    try{

      setLoading(true);

      const res = await axios.get(

        `http://localhost:5000/api/bookings/track/${token}`

      );

      setBooking(res.data);

    }catch(error){

      console.log(error);

      alert(
        "Booking Not Found"
      );

      setBooking(null);

    }finally{

      setLoading(false);

    }

  };

  return(

    <div className="booking-tracking-page">

      <Navbar />

      <div className="booking-tracking-container">

        <h1>

          Hotel Booking Tracking

        </h1>

        <p className="tracking-subtitle">

          Check Your Hotel Booking Status Using Booking Token

        </p>

        {/* Search */}

        <div className="tracking-search-box">

          <input

            type="text"

            placeholder="Enter Booking Token"

            value={token}

            onChange={(e)=>

              setToken(
                e.target.value
              )

            }

          />

          <button
            onClick={searchBooking}
          >

            <FaSearch />

            Search

          </button>

        </div>

        {/* Loading */}

        {

          loading && (

            <p className="loading-text">

              Searching Booking...

            </p>

          )

        }

        {/* Booking Card */}

        {

          booking && (

            <div className="booking-card">

              <div className="booking-header">

                <FaHotel />

                <h2>

                  Booking Details

                </h2>

              </div>

              <div className="booking-grid">

                <div className="booking-item">

                  <FaUser />

                  <div>

                    <span>
                      Guest Name
                    </span>

                    <h3>
                      {booking.fullName}
                    </h3>

                  </div>

                </div>

                <div className="booking-item">

                  <FaPhone />

                  <div>

                    <span>
                      Mobile Number
                    </span>

                    <h3>
                      {booking.mobile}
                    </h3>

                  </div>

                </div>

                <div className="booking-item">

                  <FaCalendarAlt />

                  <div>

                    <span>
                      Check In
                    </span>

                    <h3>
                      {booking.checkInDate}
                    </h3>

                  </div>

                </div>

                <div className="booking-item">

                  <FaCalendarAlt />

                  <div>

                    <span>
                      Check Out
                    </span>

                    <h3>
                      {booking.checkOutDate}
                    </h3>

                  </div>

                </div>

                <div className="booking-item">

                  <FaCheckCircle />

                  <div>

                    <span>
                      Booking Status
                    </span>

                    <h3 className="status">

                      {booking.bookingStatus}

                    </h3>

                  </div>

                </div>

                <div className="booking-item">

                  <FaHotel />

                  <div>

                    <span>
                      Rooms Required
                    </span>

                    <h3>

                      {booking.roomsRequired}

                    </h3>

                  </div>

                </div>

              </div>

            </div>

          )

        }

      </div>

    </div>

  );

}

export default HotelBookingTracking;