// FILE: src/components/transport/PrivateTransport.jsx

import "./privateTransport.scss";

import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  FaBus,
  FaTaxi,
  FaCar,
  FaArrowRight,
  FaStar,
  FaMapMarkerAlt,
  FaClock,
  FaUsers,
  FaMoneyBillWave,
  FaCheckCircle,
  FaRoad
} from "react-icons/fa";

import {
  useNavigate
} from "react-router-dom";

function PrivateTransport(){

  const navigate = useNavigate();

  /* =========================================
     STATES
  ========================================= */

  const [privateBuses,setPrivateBuses]
  = useState([]);

  const [loading,setLoading]
  = useState(true);

  /* =========================================
     FETCH PRIVATE TRANSPORT
  ========================================= */

  useEffect(()=>{

    fetchPrivateTransport();

  },[]);

  const fetchPrivateTransport =
  async()=>{

    try{

      const res = await axios.get(

        "http://localhost:5000/api/transport/all"

      );

      console.log(res.data);

      /* =========================================
         ONLY PRIVATE BUSES
      ========================================= */

      const privateData =

      (res.data.buses || [])

      .filter(

        (item)=>

          item.government === false &&

          !item.operator
          ?.toLowerCase()
          .includes("msrtc") &&

          !item.operator
          ?.toLowerCase()
          .includes("government")

      );

      setPrivateBuses(privateData);

      setLoading(false);

    }catch(error){

      console.log(error);

      setLoading(false);

    }

  };

  /* =========================================
     ICON
  ========================================= */

  const getIcon = (type)=>{

    if(

      type?.toLowerCase()
      .includes("taxi")

    ){

      return <FaTaxi />;

    }

    if(

      type?.toLowerCase()
      .includes("car")

    ){

      return <FaCar />;

    }

    return <FaBus />;

  };

  /* =========================================
     LOADING
  ========================================= */

  if(loading){

    return(

      <section className="private-transport">

        <div className="container">

          <div className="loading-box">

            <h2>

              Loading Private Transport...

            </h2>

          </div>

        </div>

      </section>

    );

  }

  return(

    <section className="private-transport">

      <div className="container">

        {/* =========================================
            HEADER
        ========================================= */}

        <div className="section-header">

          <span>
            Private Services
          </span>

          <h2>
            Premium Private Transport
          </h2>

          <p>
            Book luxury buses, private travels,
            taxi services and premium smart rides
            across Maharashtra.
          </p>

        </div>

        {/* =========================================
            EMPTY
        ========================================= */}

        {

          privateBuses.length === 0 && (

            <div className="loading-box">

              <h3>

                No Private Transport Available

              </h3>

            </div>

          )

        }

        {/* =========================================
            PRIVATE GRID
        ========================================= */}

        <div className="private-grid">

          {

            privateBuses.map((item,index)=>(

              <div
                className="private-card"
                key={index}
              >

                {/* =========================================
                    TOP
                ========================================= */}

                <div className="card-top">

                  <div className="private-icon">

                    {

                      getIcon(
                        item.busType
                      )

                    }

                  </div>

                  <div className="rating">

                    <FaStar />

                    <span>

                      4.8

                    </span>

                  </div>

                </div>

                {/* =========================================
                    BUS NAME
                ========================================= */}

                <h3>

                  {item.busName}

                </h3>

                <p className="type">

                  {

                    item.busType ||

                    "Luxury Service"

                  }

                </p>

                <p className="operator">

                  <FaCheckCircle />

                  {

                    item.operator ||

                    "Private Travels"

                  }

                </p>

                {/* =========================================
                    ROUTE
                ========================================= */}

                <div className="route">

                  <FaMapMarkerAlt />

                  <span>

                    {item.from}

                    {" → "}

                    {item.to}

                  </span>

                </div>

                {/* =========================================
                    INFO
                ========================================= */}

                <div className="route-info">

                  <div>

                    <FaClock />

                    <span>

                      {

                        item.departureTime ||

                        "N/A"

                      }

                    </span>

                  </div>

                  <div>

                    <FaUsers />

                    <span>

                      {

                        item.availableSeats ||

                        0

                      }

                      {" "}
                      Seats

                    </span>

                  </div>

                </div>

                {/* =========================================
                    EXTRA DETAILS
                ========================================= */}

                <div className="extra-details">

                  <div>

                    <FaRoad />

                    <span>

                      {

                        item.liveStatus ||

                        "On Time"

                      }

                    </span>

                  </div>

                  <div>

                    <FaMoneyBillWave />

                    <span>

                      ₹

                      {

                        item.price ||

                        0

                      }

                    </span>

                  </div>

                </div>

                {/* =========================================
                    PRICE
                ========================================= */}

                <div className="price-box">

                  <span>

                    Starting From

                  </span>

                  <h4>

                    ₹

                    {

                      item.price ||

                      0

                    }

                  </h4>

                </div>

                {/* =========================================
                    BUTTONS
                ========================================= */}

                <div className="private-buttons">

                  <button
                    className="details-btn"
                    onClick={()=>

                      navigate(

                        `/transport-tracking/${item._id}`

                      )

                    }
                  >

                    View Details

                  </button>

                  <button
                    className="explore-btn"
                    onClick={()=>

                      navigate(

                        `/transport-booking/${item._id}`

                      )

                    }
                  >

                    Book Now

                    <FaArrowRight />

                  </button>

                </div>

              </div>

            ))

          }

        </div>

      </div>

    </section>

  );

}

export default PrivateTransport;