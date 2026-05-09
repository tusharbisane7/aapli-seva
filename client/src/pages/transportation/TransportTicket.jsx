import "./transportTicket.scss";

import {
  useEffect,
  useState
} from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import axios from "axios";

import {
  FaBus,
  FaUser,
  FaPhone,
  FaChair,
  FaMoneyBillWave,
  FaClock,
  FaCalendarAlt,
  FaDownload,
  FaRoute,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaTicketAlt
} from "react-icons/fa";

function TransportTicket() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchTicket();

  }, []);

  const fetchTicket = async () => {

    try {

      const res = await axios.get(
        `https://aapli-seva.onrender.com/api/transport-bookings/${id}`
      );

      if (
        res.data.success &&
        res.data.booking
      ) {

        setTicket(res.data.booking);

        localStorage.setItem(
          "transportTicket",
          JSON.stringify(res.data.booking)
        );

      }

    } catch (error) {

      console.log(error);

      const savedTicket = JSON.parse(
        localStorage.getItem("transportTicket")
      );

      if (savedTicket) {

        setTicket(savedTicket);

      }

    } finally {

      setLoading(false);

    }

  };

  const handlePrint = () => {

    window.print();

  };

  if (loading) {

    return (
      <div className="ticket-loading">
        Loading Ticket...
      </div>
    );

  }

  if (!ticket) {

    return (
      <div className="ticket-error">
        <h1>Ticket Not Found</h1>

        <button
          onClick={() =>
            navigate("/transportation")
          }
        >
          Back To Transport
        </button>
      </div>
    );

  }

  return (

    <div className="transport-ticket-page">

      <div className="ticket-card">

        {/* TOP */}

        <div className="ticket-top">

          <div>

            <h1>
              <FaBus />
              Maharashtra Bus Ticket
            </h1>

            <p>
              Maharashtra Smart Transport
            </p>

          </div>

          <div className="ticket-status">

            <FaCheckCircle />

            {
              ticket.bookingStatus ||
              "Confirmed"
            }

          </div>

        </div>

        {/* TICKET NUMBER */}

        <div className="ticket-number-box">

          <FaTicketAlt />

          <h2>

            Ticket Number

          </h2>

          <h1>

            #

            {
              ticket.ticketNumber ||
              ticket.trackingNumber ||
              "4582"
            }

          </h1>

        </div>

        {/* ROUTE */}

        <div className="ticket-route">

          <div>

            <h2>
              {ticket.pickup || "Pickup"}
            </h2>

            <span>
              Pickup Stop
            </span>

          </div>

          <div className="route-line">

            <FaRoute />

          </div>

          <div>

            <h2>
              {ticket.dropPoint || "Destination"}
            </h2>

            <span>
              Destination
            </span>

          </div>

        </div>

        {/* DETAILS */}

        <div className="ticket-details">

          <div className="detail-box">

            <FaBus />

            <div>

              <span>Bus Name</span>

              <h4>
                {ticket.busName || "MSRTC Bus"}
              </h4>

            </div>

          </div>

          <div className="detail-box">

            <FaMapMarkerAlt />

            <div>

              <span>Bus Number</span>

              <h4>
                {ticket.busNumber || "MH40 1234"}
              </h4>

            </div>

          </div>

          <div className="detail-box">

            <FaUser />

            <div>

              <span>Passenger</span>

              <h4>
                {ticket.fullName}
              </h4>

            </div>

          </div>

          <div className="detail-box">

            <FaPhone />

            <div>

              <span>Mobile</span>

              <h4>
                {ticket.mobile}
              </h4>

            </div>

          </div>

          <div className="detail-box">

            <FaChair />

            <div>

              <span>Seats</span>

              <h4>

                {
                  Array.isArray(ticket.seats)
                  ? ticket.seats.join(", ")
                  : ticket.seats
                }

              </h4>

            </div>

          </div>

          <div className="detail-box">

            <FaMoneyBillWave />

            <div>

              <span>Total Fare</span>

              <h4>
                ₹{ticket.amount || 0}
              </h4>

            </div>

          </div>

          <div className="detail-box">

            <FaClock />

            <div>

              <span>Departure</span>

              <h4>
                {ticket.departureTime || "07:30 AM"}
              </h4>

            </div>

          </div>

          <div className="detail-box">

            <FaCalendarAlt />

            <div>

              <span>Journey Date</span>

              <h4>

                {
                  ticket.travelDate ||
                  ticket.journeyDate ||
                  new Date().toLocaleDateString()
                }

              </h4>

            </div>

          </div>

        </div>

        {/* TRACK */}

        <div className="track-box">

          <h3>
            Tracking Number
          </h3>

          <h1>

            #
            {
              ticket.trackingNumber ||
              "BUS4582"
            }

          </h1>

          <p>
            Use this number for tracking
          </p>

        </div>

        {/* BUTTONS */}

        <div className="ticket-buttons">

          <button
            className="download-btn"
            onClick={handlePrint}
          >

            <FaDownload />

            Download Ticket

          </button>

          <button
            className="track-btn"
            onClick={() =>
              navigate(
                `/transport-tracking/${ticket.busId}`
              )
            }
          >

            Live Track

          </button>

        </div>

      </div>

    </div>

  );

}

export default TransportTicket;