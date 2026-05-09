import "./transportHero.scss";

import {
  FaBus,
  FaSearch,
  FaMapMarkerAlt,
  FaClock,
  FaTicketAlt
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import { useState } from "react";

function TransportHero() {

  const navigate = useNavigate();

  const [search, setSearch]
  = useState("");

  const handleSearch = () => {

    if (!search.trim()) return;

    navigate(

      `/transportation?search=${search}`

    );

  };

  return (

    <section className="transport-hero">

      <div className="transport-overlay"></div>

      <div className="container">

        {/* LEFT CONTENT */}

        <div className="hero-content">

          <div className="hero-badge">

            <FaBus />

            Smart Transportation Services

          </div>

          <h1>

            Maharashtra Smart
            Transport Network

          </h1>

          <p>

            Book MSRTC buses, private
            travels, luxury coaches,
            sleeper buses and smart city
            transportation with real-time
            tracking and seat booking.

          </p>

          {/* SEARCH BOX */}

          <div className="transport-search-box">

            <div className="search-input">

              <FaMapMarkerAlt />

              <input
                type="text"
                placeholder="Search City or Route"
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
              />

            </div>

            <button
              onClick={handleSearch}
            >

              <FaSearch />

              Search Route

            </button>

          </div>

          {/* FEATURES */}

         

        </div>

       
      </div>

    </section>

  );

}

export default TransportHero;