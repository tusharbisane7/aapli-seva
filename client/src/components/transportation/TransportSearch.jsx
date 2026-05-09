import "./transportSearch.scss";

import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  FaSearch,
  FaBus,
  FaMapMarkerAlt,
  FaArrowRight,
  FaClock,
  FaUsers
} from "react-icons/fa";

import {
  useNavigate
} from "react-router-dom";

function TransportSearch(){

  const navigate = useNavigate();

  /* =========================
     STATES
  ========================= */

  const [search,setSearch]
  = useState("");

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

        "http://localhost:5000/api/transport/all"

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

  /* =========================
     FILTER ROUTES
  ========================= */

  const filteredRoutes =

    routes.filter((item)=>

      item.busName
      ?.toLowerCase()
      .includes(
        search.toLowerCase()
      )

      ||

      item.from
      ?.toLowerCase()
      .includes(
        search.toLowerCase()
      )

      ||

      item.to
      ?.toLowerCase()
      .includes(
        search.toLowerCase()
      )

    );

  return(

    <section className="transport-search-section">

      <div className="container">

        {/* HEADER */}

        <div className="section-header">

          <span>
            Route Search
          </span>

          <h2>
            Search Smart Transport Routes
          </h2>

          <p>
            Search buses, routes,
            timings and live transport
            across Maharashtra.
          </p>

        </div>

        {/* SEARCH */}

        <div className="search-wrapper">

          <div className="search-box-route">

            <FaSearch />

            <input
              type="text"
              placeholder="Search city, bus or route"
              value={search}
              onChange={(e)=>
                setSearch(
                  e.target.value
                )
              }
            />

          </div>

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

        {/* ROUTES */}

        <div className="route-search-grid">

          {

            !loading &&

            filteredRoutes.length > 0

            ? (

              filteredRoutes.map((route,index)=>(

                <div
                  className="route-search-card"
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

                  <div className="price-box">

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
                      className="track-btn"
                      onClick={()=>

                        navigate(

                          `/transport-tracking/${route._id}`

                        )

                      }
                    >

                      <FaMapMarkerAlt />

                      Live Track

                    </button>

                    <button
                      className="book-btn"
                      onClick={()=>

                        navigate(

                          `/transport-booking/${route._id}`

                        )

                      }
                    >

                      Book Seat

                      <FaArrowRight />

                    </button>

                  </div>

                </div>

              ))

            ) : (

              !loading && (

                <div className="no-route">

                  <h3>
                    No Routes Found
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

export default TransportSearch;