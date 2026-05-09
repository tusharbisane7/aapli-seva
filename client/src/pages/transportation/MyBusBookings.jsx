import "./myBusBookings.scss";

import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  FaBus,
  FaMapMarkerAlt,
  FaClock,
  FaChair,
  FaMoneyBillWave,
  FaEye,
  FaTimesCircle
} from "react-icons/fa";

import {
  useNavigate
} from "react-router-dom";

function MyBusBookings(){

  const navigate = useNavigate();

  const [bookings,setBookings]
  = useState([]);

  const [loading,setLoading]
  = useState(true);

  /* ===================================
     FETCH BOOKINGS
  =================================== */

  useEffect(()=>{

    fetchBookings();

  },[]);

  const fetchBookings = async()=>{

    try{

      const res = await axios.get(

        "http://localhost:5000/api/transport-bookings/all"

      );

      const user = JSON.parse(

        localStorage.getItem("user")

      );

      const filteredBookings =

      (res.data.bookings || [])

      .filter(

        (item)=>

          item.mobile === user?.mobile

      );

      setBookings(filteredBookings);

      setLoading(false);

    }catch(error){

      console.log(error);

      setLoading(false);

    }

  };

  /* ===================================
     CANCEL BOOKING
  =================================== */

  const cancelBooking = async(id)=>{

    const reason = prompt(
      "Enter Cancellation Reason"
    );

    if(!reason) return;

    try{

      await axios.put(

        `http://localhost:5000/api/transport-bookings/cancel/${id}`,

        {
          cancelReason: reason
        }

      );

      alert("Booking Cancelled");

      fetchBookings();

    }catch(error){

      console.log(error);

      alert("Cancellation Failed");

    }

  };

  /* ===================================
     LOADING
  =================================== */

  if(loading){

    return(

      <div className="bus-booking-loading">

        Loading Bookings...

      </div>

    );

  }

  return(

    <div className="my-bus-bookings-page">

      <div className="page-top">

        <h1>
          My Bus Bookings
        </h1>

        <p>
          View all your booked transport tickets
        </p>

      </div>

      {

        bookings.length === 0 ? (

          <div className="empty-box">

            <FaBus />

            <h2>
              No Bus Bookings Found
            </h2>

          </div>

        ) : (

          <div className="booking-grid">

            {

              bookings.map((item,index)=>(

                <div
                  className="booking-card"
                  key={index}
                >

                  <div className="booking-status">

                    {

                      item.bookingStatus

                    }

                  </div>

                  <h2>

                    {item.busName}

                  </h2>

                  <div className="booking-route">

                    <FaMapMarkerAlt />

                    <span>

                      {item.pickup}

                      {" → "}

                      {item.dropPoint}

                    </span>

                  </div>

                  <div className="booking-info">

                    <p>

                      <FaClock />

                      {

                        item.departureTime ||

                        "07:30 AM"

                      }

                    </p>

                    <p>

                      <FaChair />

                      Seats:

                      {

                        Array.isArray(item.seats)

                        ? item.seats.join(", ")

                        : item.seats

                      }

                    </p>

                    <p>

                      <FaMoneyBillWave />

                      ₹{item.amount}

                    </p>

                  </div>

                  <div className="booking-buttons">

                    <button
                      className="view-btn"
                      onClick={()=>

                        navigate(

                          `/transport-ticket/${item._id}`

                        )

                      }
                    >

                      <FaEye />

                      View Ticket

                    </button>

                    {

                      item.bookingStatus !==
                      "Cancelled" && (

                        <button
                          className="cancel-btn"
                          onClick={()=>

                            cancelBooking(
                              item._id
                            )

                          }
                        >

                          <FaTimesCircle />

                          Cancel

                        </button>

                      )

                    }

                  </div>

                </div>

              ))

            }

          </div>

        )

      }

    </div>

  );

}

export default MyBusBookings;