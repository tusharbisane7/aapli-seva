import "./userBookings.scss";

import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import Navbar from "../../components/navbar/Navbar";

function UserBookings(){

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [bookings,setBookings]
  = useState([]);

  const [loading,setLoading]
  = useState(true);

  useEffect(()=>{

    if(user){

      fetchBookings();

    }

  },[]);

  const fetchBookings = async() => {

    try{

      /* DEBUG */

      console.log("USER:",user);

      const userId =

      user?._id || user?.id;

      const res = await axios.get(

        `https://aapli-seva.onrender.com/api/bookings/user/${userId}`

      );

      console.log("BOOKINGS:",res.data);

      setBookings(res.data);

    }catch(error){

      console.log(error);

    }finally{

      setLoading(false);

    }

  };

  if(loading){

    return(

      <div className="user-bookings-page">

        <Navbar />

        <h1>
          Loading...
        </h1>

      </div>

    );

  }

  return(

    <div className="user-bookings-page">

      <Navbar />

      <div className="user-bookings-container">

        <h1>
          My Hotel Bookings
        </h1>

        {

          bookings.length === 0 ? (

            <div className="no-bookings">

              <h2>
                No Bookings Found
              </h2>

            </div>

          ) : (

            <div className="booking-history-grid">

              {

                bookings.map((item,index)=>(

                  <div
                    className="history-card"
                    key={index}
                  >

                    <h2>

                      Booking Token:
                      {" "}
                      {item.bookingToken}

                    </h2>

                    <p>

                      <strong>
                        Name:
                      </strong>

                      {" "}

                      {item.fullName}

                    </p>

                    <p>

                      <strong>
                        Mobile:
                      </strong>

                      {" "}

                      {item.mobile}

                    </p>

                    <p>

                      <strong>
                        Check In:
                      </strong>

                      {" "}

                      {item.checkInDate}

                    </p>

                    <p>

                      <strong>
                        Check Out:
                      </strong>

                      {" "}

                      {item.checkOutDate}

                    </p>

                    <p>

                      <strong>
                        Rooms:
                      </strong>

                      {" "}

                      {item.roomsRequired}

                    </p>

                    <p>

                      <strong>
                        Reason:
                      </strong>

                      {" "}

                      {item.reason}

                    </p>

                    <h3>

                      Status:
                      {" "}

                      <span>

                        {item.bookingStatus}

                      </span>

                    </h3>

                  </div>

                ))

              }

            </div>

          )

        }

      </div>

    </div>

  );

}

export default UserBookings;