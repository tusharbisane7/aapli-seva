import "./navbar.scss";

import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import {

  FaBars,
  FaTimes,
  FaSearch,
  FaMapMarkedAlt,
  FaHotel,
  FaUserCircle,
  FaExclamationTriangle,
  FaBus,
  FaCog,
  FaClipboardList,
  FaHistory,
  FaUser,
  FaSignOutAlt,
  FaHome,
  FaPlus,
  FaTicketAlt,
  FaRoute,
  FaBell

} from "react-icons/fa";

import logo from "../../assets/logo.png";

function Navbar() {

  const navigate = useNavigate();

  const [menuOpen,setMenuOpen]
  = useState(false);

  const user = JSON.parse(

    localStorage.getItem("user")

  );

  /* =====================================
     USER TRANSPORT TICKET
  ===================================== */

  const transportTicket = JSON.parse(

    localStorage.getItem(
      "transportTicket"
    )

  );

  /* =====================================
     PROFILE IMAGE
  ===================================== */

  const profileImage =

    user?.profilePic

    ? user.profilePic.startsWith("http")

      ? user.profilePic

      : `https://aapli-seva.onrender.com/${user.profilePic}`

    : "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  /* =====================================
     LOGOUT
  ===================================== */

  const handleLogout = ()=>{

    localStorage.removeItem("user");

    localStorage.removeItem("token");

    localStorage.removeItem("trackingId");

    localStorage.removeItem(
      "hotelBookingToken"
    );

    localStorage.removeItem(
      "transportTicket"
    );

    navigate("/login");

    window.location.reload();

  };

  return(

    <nav className="navbar">

      <div className="navbar-container">

        {/* =====================================
            LEFT LOGO
        ===================================== */}

        <div className="navbar-left">

          <Link
            to="/"
            className="logo-link"
          >

            <div className="logo">

              <img
                src={logo}
                alt="Aapli Seva"
                className="navbar-logo-img"
              />

              <div className="logo-text">

                <h1>
                  Aapli Seva
                </h1>

                <p>
                  Maharashtra Smart Portal
                </p>

              </div>

            </div>

          </Link>

        </div>

        {/* =====================================
            SEARCH BOX
        ===================================== */}

        <div className="search-box">

          <FaSearch
            className="search-icon"
          />

          <input
            type="text"
            placeholder="Search services, buses, hotels..."
          />

        </div>

        {/* =====================================
            DESKTOP NAVIGATION
        ===================================== */}

        <div className="nav-links">

          <Link to="/">

            <FaHome />

            Home

          </Link>

          <Link to="/setu">

            <FaClipboardList />

            Setu Portal

          </Link>

          <Link to="/tourism">

            <FaMapMarkedAlt />

            Tourism

          </Link>

          <Link to="/transportation">

            <FaBus />

            Transport

          </Link>

          <Link to="/emergency">

            <FaExclamationTriangle />

            Emergency

          </Link>

          <Link to="/hotels">

            <FaHotel />

            Hotels

          </Link>

          {/* =====================================
              ACTIVE BUS TICKET QUICK ACCESS
          ===================================== */}

          {

            transportTicket && (

              <Link
                to={`/transport-ticket/${transportTicket._id}`}
                className="active-ticket-link"
              >

                <FaBell />

                Active Ticket

              </Link>

            )

          }

          {/* =====================================
              USER PROFILE
          ===================================== */}

          {

            user ? (

              <div className="profile-menu">

                {/* PROFILE */}

                <div className="profile-info">

                  <div className="profile-avatar-ring">

                    <img

                      src={profileImage}

                      alt="profile"

                      className="profile-avatar-img"

                      onError={(e)=>{

                        e.target.src =

                        "https://cdn-icons-png.flaticon.com/512/149/149071.png";

                      }}

                    />

                  </div>

                  <span>

                    {user.firstName}

                  </span>

                </div>

                {/* =====================================
                    DROPDOWN
                ===================================== */}

                <div className="profile-dropdown">

                  <Link to="/profile">

                    <FaUser />

                    Profile

                  </Link>

                  <Link to="/settings">

                    <FaCog />

                    Settings

                  </Link>

                  <Link to="/tracking">

                    <FaHistory />

                    Application History

                  </Link>

                  <Link to="/my-bookings">

                    <FaHotel />

                    Hotel Bookings

                  </Link>

                  {/* =====================================
                      MY BUS BOOKINGS
                  ===================================== */}

                  <Link to="/my-bus-bookings">

                    <FaTicketAlt />

                    My Bus Tickets

                  </Link>

                  {/* =====================================
                      TRANSPORT PAGE
                  ===================================== */}

                  <Link to="/transportation">

                    <FaBus />

                    Bus Booking

                  </Link>

                  {/* =====================================
                      LIVE TRACKING
                  ===================================== */}

                  {

                    transportTicket && (

                      <Link

                        to={`/transport-track/${

                          transportTicket
                          ?.trackingCode ||

                          "4582"

                        }`}

                      >

                        <FaRoute />

                        Live Bus Tracking

                      </Link>

                    )

                  }

                  {/* =====================================
                      ACTIVE TICKET
                  ===================================== */}

                  {

                    transportTicket && (

                      <Link

                        to={`/transport-ticket/${

                          transportTicket._id

                        }`}

                      >

                        <FaBell />

                        Active Ticket

                      </Link>

                    )

                  }

                  {/* =====================================
                      ADMIN
                  ===================================== */}

                  {

                    user?.role ===
                    "admin" && (

                      <>

                        <Link to="/admin">

                          <FaUserCircle />

                          Admin Panel

                        </Link>

                        <Link to="/add-hotel">

                          <FaPlus />

                          Add Hotel

                        </Link>

                      </>

                    )

                  }

                  {/* =====================================
                      LOGOUT
                  ===================================== */}

                  <button
                    type="button"
                    onClick={handleLogout}
                  >

                    <FaSignOutAlt />

                    Logout

                  </button>

                </div>

              </div>

            ) : (

              <Link to="/login">

                <button
                  className="login-btn"
                >

                  Login

                </button>

              </Link>

            )

          }

        </div>

        {/* =====================================
            MOBILE RIGHT
        ===================================== */}

        <div className="mobile-right">

          {

            user && (

              <div className="mobile-navbar-profile">

                <div className="profile-avatar-ring">

                  <img

                    src={profileImage}

                    alt="profile"

                    className="profile-avatar-img"

                    onError={(e)=>{

                      e.target.src =

                      "https://cdn-icons-png.flaticon.com/512/149/149071.png";

                    }}

                  />

                </div>

              </div>

            )

          }

          {/* =====================================
              MENU TOGGLE
          ===================================== */}

          <div

            className="menu-toggle"

            onClick={()=>

              setMenuOpen(
                !menuOpen
              )

            }

          >

            {

              menuOpen

              ? <FaTimes />

              : <FaBars />

            }

          </div>

        </div>

      </div>

      {/* =====================================
          MOBILE MENU
      ===================================== */}

      {

        menuOpen && (

          <div className="mobile-menu">

            <Link to="/">

              <FaHome />

              Home

            </Link>

            <Link to="/setu">

              <FaClipboardList />

              Setu Portal

            </Link>

            <Link to="/tourism">

              <FaMapMarkedAlt />

              Tourism

            </Link>

            <Link to="/transportation">

              <FaBus />

              Transport

            </Link>

            <Link to="/emergency">

              <FaExclamationTriangle />

              Emergency

            </Link>

            <Link to="/hotels">

              <FaHotel />

              Hotels

            </Link>

            {

              user ? (

                <>

                  <Link to="/profile">

                    <FaUser />

                    Profile

                  </Link>

                  <Link to="/settings">

                    <FaCog />

                    Settings

                  </Link>

                  <Link to="/tracking">

                    <FaHistory />

                    Application History

                  </Link>

                  <Link to="/my-bookings">

                    <FaHotel />

                    Hotel Bookings

                  </Link>

                  

                  

                  {

                    transportTicket && (

                      <Link

                        to={`/transport-track/${

                          transportTicket
                          ?.trackingCode ||

                          "4582"

                        }`}

                      >

                        <FaRoute />

                        Live Bus Tracking

                      </Link>

                    )

                  }

                  {

                    transportTicket && (

                      <Link

                        to={`/transport-ticket/${

                          transportTicket._id

                        }`}

                      >

                        <FaBell />

                        My Bus Bookings

                      </Link>

                    )

                  }

                  {

                    user?.role ===
                    "admin" && (

                      <>

                        <Link to="/admin">

                          <FaUserCircle />

                          Admin Panel

                        </Link>

                        <Link to="/add-hotel">

                          <FaPlus />

                          Add Hotel

                        </Link>

                      </>

                    )

                  }

                  <button

                    className="mobile-login-btn"

                    onClick={handleLogout}

                  >

                    <FaSignOutAlt />

                    Logout

                  </button>

                </>

              ) : (

                <Link to="/login">

                  <button
                    className="mobile-login-btn"
                  >

                    Login

                  </button>

                </Link>

              )

            }

          </div>

        )

      }

    </nav>

  );

}

export default Navbar;