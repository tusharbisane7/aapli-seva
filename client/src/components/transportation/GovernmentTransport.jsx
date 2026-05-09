// FILE: src/components/transport/GovernmentTransport.jsx

import "./governmentTransport.scss";

import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  FaBus,
  FaClock,
  FaMapMarkerAlt,
  FaArrowRight,
  FaChair,
  FaMoneyBillWave,
  FaRoad,
  FaCheckCircle,
  FaTimesCircle
} from "react-icons/fa";

import {
  useNavigate
} from "react-router-dom";

function GovernmentTransport() {

  const navigate = useNavigate();

  /* =========================================
     STATES
  ========================================= */

  const [buses, setBuses]
  = useState([]);

  const [loading, setLoading]
  = useState(true);

  /* =========================================
     FETCH GOVERNMENT BUSES
  ========================================= */

  useEffect(() => {

    fetchGovernmentBuses();

  }, []);

  const fetchGovernmentBuses =
  async () => {

    try {

      const res = await axios.get(

        "https://aapli-seva.onrender.com/api/transport/all"

      );

      console.log(res.data);

      /* =========================================
         FILTER ONLY GOVERNMENT BUSES
      ========================================= */

      const governmentBuses =

      (res.data.buses || []).filter(

        (item) =>

          item.government === true ||

          item.operator
          ?.toLowerCase()
          .includes("msrtc") ||

          item.operator
          ?.toLowerCase()
          .includes("government")

      );

      setBuses(governmentBuses);

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);

    }

  };

  /* =========================================
     LOADING
  ========================================= */

  if (loading) {

    return (

      <section className="gov-transport">

        <div className="container">

          <div className="loading-box">

            <h2>

              Loading Government Buses...

            </h2>

          </div>

        </div>

      </section>

    );

  }

  return (

    <section className="gov-transport">

      <div className="container">

        {/* =========================================
            HEADER
        ========================================= */}

        <div className="section-header">

          <span>

            Maharashtra Transport

          </span>

          <h2>

            Government MSRTC Bus Services

          </h2>

          <p>

            Book Maharashtra Government buses,
            check seat availability,
            live route tracking and smart transport services.

          </p>

        </div>

        {/* =========================================
            EMPTY
        ========================================= */}

        {

          buses.length === 0 && (

            <div className="empty-box">

              <FaTimesCircle />

              <h3>

                No Government Buses Found

              </h3>

            </div>

          )

        }

        {/* =========================================
            BUS GRID
        ========================================= */}

        <div className="bus-grid">

          {

            buses.map((bus, index) => (

              <div
                className="bus-card"
                key={index}
              >

                {/* =========================================
                    TOP
                ========================================= */}

                <div className="bus-top">

                  <div className="bus-icon">

                    <FaBus />

                  </div>

                  <span
                    className={

                      bus.liveStatus === "Delayed"

                      ? "delay"

                      : "ontime"

                    }
                  >

                    {

                      bus.liveStatus ||

                      "On Time"

                    }

                  </span>

                </div>

                {/* =========================================
                    BUS NAME
                ========================================= */}

                <h3>

                  {bus.busName}

                </h3>

                <p className="operator">

                  <FaCheckCircle />

                  {bus.operator || "MSRTC"}

                </p>

                {/* =========================================
                    ROUTE
                ========================================= */}

                <div className="route">

                  <FaMapMarkerAlt />

                  <p>

                    {bus.from}

                    {" → "}

                    {bus.to}

                  </p>

                </div>

                {/* =========================================
                    TIME
                ========================================= */}

                <div className="time">

                  <FaClock />

                  <span>

                    Departure :

                    {" "}

                    {

                      bus.departureTime ||

                      "N/A"

                    }

                  </span>

                </div>

                {/* =========================================
                    DETAILS
                ========================================= */}

                <div className="bus-details">

                  <div>

                    <FaRoad />

                    <strong>

                      Type

                    </strong>

                    <span>

                      {

                        bus.busType ||

                        "Standard"

                      }

                    </span>

                  </div>

                  <div>

                    <FaChair />

                    <strong>

                      Seats

                    </strong>

                    <span>

                      {

                        bus.availableSeats ||

                        0

                      }

                    </span>

                  </div>

                  <div>

                    <FaMoneyBillWave />

                    <strong>

                      Fare

                    </strong>

                    <span>

                      ₹

                      {

                        bus.price ||

                        0

                      }

                    </span>

                  </div>

                </div>

                {/* =========================================
                    BUTTONS
                ========================================= */}

                <div className="bus-buttons">

                  <button
                    className="track-btn"
                    onClick={() =>

                      navigate(

                        `/transport-tracking/${bus._id}`

                      )

                    }
                  >

                    Live Track

                  </button>

                  <button
                    className="book-btn"
                    onClick={() =>

                      navigate(

                        `/transport-booking/${bus._id}`

                      )

                    }
                  >

                    Book Seat

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

export default GovernmentTransport;