import "./transportRoutes.scss";

import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  FaBus,
  FaArrowRight,
  FaClock,
  FaMapMarkerAlt,
  FaUsers
} from "react-icons/fa";

import {
  useNavigate
} from "react-router-dom";

function TransportRoutes(){

  const navigate = useNavigate();

  /* =========================
     STATES
  ========================= */

  const [routes,setRoutes]
  = useState([]);

  const [loading,setLoading]
  = useState(true);

  /* =========================
     FETCH ROUTES
  ========================= */

  useEffect(()=>{

    fetchRoutes();

  },[]);

  const fetchRoutes = async()=>{

    try{

      const res = await axios.get(

        "https://aapli-seva.onrender.com/api/transport/all"

      );

      setRoutes(
        res.data.buses || []
      );

      setLoading(false);

    }catch(error){

      console.log(error);

      setLoading(false);

    }

  };

  return(

    <section className="popular-routes">

      <div className="container">

        {/* HEADER */}

        <div className="section-header">

          <span>
            Popular Routes
          </span>

          <h2>
            Frequently Used Routes
          </h2>

          <p>
            Explore top transport routes
            across Maharashtra with
            smart booking and live tracking.
          </p>

        </div>

        {/* LOADING */}

        {

          loading && (

            <div className="loading-box">

              <h3>
                Loading Routes...
              </h3>

            </div>

          )

        }

        {/* ROUTE GRID */}

        <div className="route-grid">

          {

            !loading &&

            routes.length > 0

            ? (

              routes.map((route,index)=>(

                <div
                  className="route-card"
                  key={index}
                >

                  {/* TOP */}

                  <div className="route-top">

                    <div className="route-icon">

                      <FaBus />

                    </div>

                    <span
                      className={

                        route.liveStatus ===
                        "Delayed"

                        ? "delay"

                        : "ontime"

                      }
                    >

                      {

                        route.liveStatus ||

                        "On Time"

                      }

                    </span>

                  </div>

                  {/* BUS NAME */}

                  <h3>

                    {route.busName}

                  </h3>

                  {/* ROUTE */}

                  <div className="route-path">

                    <FaMapMarkerAlt />

                    <span>

                      {route.from}

                      {" → "}

                      {route.to}

                    </span>

                  </div>

                  {/* INFO */}

                  <div className="route-info">

                    <div>

                      <FaClock />

                      <span>

                        {

                          route.departureTime ||

                          "N/A"

                        }

                      </span>

                    </div>

                    <div>

                      <FaUsers />

                      <span>

                        {

                          route.availableSeats ||

                          0

                        }

                        {" "}
                        Seats

                      </span>

                    </div>

                  </div>

                  {/* PRICE */}

                  <div className="route-price">

                    <span>
                      Ticket Fare
                    </span>

                    <h4>

                      ₹

                      {

                        route.price ||

                        0

                      }

                    </h4>

                  </div>

                  {/* BUTTONS */}

                  <div className="route-buttons">

                    <button
                      className="details-btn"
                      onClick={()=>

                        navigate(

                          `/transport-tracking/${route._id}`

                        )

                      }
                    >

                      View Details

                    </button>

                    <button
                      className="book-btn"
                      onClick={()=>

                        navigate(

                          `/transport-booking/${route._id}`

                        )

                      }
                    >

                      Book Now

                      <FaArrowRight />

                    </button>

                  </div>

                </div>

              ))

            ) : (

              !loading && (

                <div className="no-route">

                  <h3>
                    No Routes Available
                  </h3>

                </div>

              )

            )

          }

        </div>

      </div>

    </section>

  );

}

export default TransportRoutes;