import "./hotels.scss";

import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  Link
} from "react-router-dom";

import {

  FaWifi,
  FaParking,
  FaTv,
  FaTree,
  FaMapMarkerAlt,
  FaStar

} from "react-icons/fa";

import Navbar from "../../components/navbar/Navbar";

function Hotels(){

  const [hotels,setHotels]
  = useState([]);

  const [loading,setLoading]
  = useState(true);

  /* =========================
     FETCH HOTELS
  ========================= */

  useEffect(()=>{

    fetchHotels();

  },[]);

  const fetchHotels = async() => {

    try{

      const res = await axios.get(

        "http://localhost:5000/api/hotels/all"

      );

      console.log(res.data);

      setHotels(

        res.data.hotels || []

      );

      setLoading(false);

    }catch(error){

      console.log(error);

      setLoading(false);

    }

  };

  return(

    <div className="hotels-page">

      <Navbar />

      {/* HERO */}

      <div className="hotels-hero">

        <h1>
          Hotels In Achalpur
        </h1>

        <p>

          Find Comfortable Hotels,
          Tourism Stays & Premium Rooms

        </p>

      </div>

      {/* CONTAINER */}

      <div className="hotels-container">

        {/* LOADING */}

        {

          loading && (

            <div className="no-hotels">

              <h2>

                Loading Hotels...

              </h2>

            </div>

          )

        }

        {/* HOTEL GRID */}

        {

          !loading && (

            <div className="hotels-grid">

              {

                Array.isArray(hotels)

                &&

                hotels.length > 0

                ? (

                  hotels.map((hotel,index)=>(

                    <div
                      className="hotel-card"
                      key={index}
                    >

                      {/* IMAGE */}

                      <div className="hotel-image-wrapper">

                        <img

                          src={

                            hotel?.hotelImages?.[0]

                            ||

                            "https://images.unsplash.com/photo-1566073771259-6a8506099945"

                          }

                          alt="hotel"

                        />

                        <div className="hotel-rating">

                          <FaStar />

                          4.5

                        </div>

                      </div>

                      {/* CONTENT */}

                      <div className="hotel-card-content">

                        <h2>

                          {

                            hotel.hotelName

                          }

                        </h2>

                        {/* LOCATION */}

                        <div className="hotel-location">

                          <FaMapMarkerAlt />

                          <span>

                            {

                              hotel.hotelAddress

                            }

                          </span>

                        </div>

                        {/* DESCRIPTION */}

                        <p className="hotel-description">

                          {

                            hotel.hotelDescription

                          }

                        </p>

                        {/* FEATURES */}

                        <div className="hotel-features">

                          {

                            hotel.wifi && (

                              <div className="feature">

                                <FaWifi />

                                WiFi

                              </div>

                            )

                          }

                          {

                            hotel.parking && (

                              <div className="feature">

                                <FaParking />

                                Parking

                              </div>

                            )

                          }

                          {

                            hotel.tv && (

                              <div className="feature">

                                <FaTv />

                                TV

                              </div>

                            )

                          }

                          {

                            hotel.garden && (

                              <div className="feature">

                                <FaTree />

                                Garden

                              </div>

                            )

                          }

                        </div>

                        {/* PRICE */}

                        <div className="hotel-price">

                          <div>

                            <h3>

                              ₹

                              {

                                hotel.pricePerNight

                              }

                            </h3>

                            <span>

                              Per Night

                            </span>

                          </div>

                          <div className="room-count">

                            Rooms:

                            {" "}

                            {

                              hotel.roomsAvailable

                            }

                          </div>

                        </div>

                        {/* BUTTONS */}

                        <div className="hotel-buttons">

                          <Link
                            to={`/hotel/${hotel._id}`}
                          >

                            <button className="details-btn">

                              View Details

                            </button>

                          </Link>

                          <Link
                            to={`/hotel-book/${hotel._id}`}
                          >

                            <button className="book-btn">

                              Book Now

                            </button>

                          </Link>

                        </div>

                      </div>

                    </div>

                  ))

                ) : (

                  <div className="no-hotels">

                    <h2>

                      No Hotels Available

                    </h2>

                  </div>

                )

              }

            </div>

          )

        }

      </div>

    </div>

  );

}

export default Hotels;