import "./hero.scss";

import {
  FaHotel,
  FaUtensils,
  FaHospital,
  FaTrain,
  FaFileAlt,
  FaMapMarkedAlt
} from "react-icons/fa";

function Hero() {

  return (

    <section className="hero">

      {/* Overlay */}

      <div className="overlay"></div>

      {/* Main Content */}

      <div className="hero-content">

        {/* LEFT SIDE */}

        <div className="left-content">

          <span className="tagline">

            Smart City Digital Platform

          </span>

          <h1>

            One Platform For
            <span>

              {" "}
              All City Services

            </span>

          </h1>

          <p>

            Government Services, Tourism,
            Hotels, Emergency Services,
            Restaurants and Smart City
            Information in one platform.

          </p>

          {/* BUTTONS */}

          <div className="hero-buttons">

            <button className="primary-btn">

              Explore Services

            </button>

            <button className="secondary-btn">

              Learn More

            </button>

          </div>

        </div>

      </div>

    </section>

  );

}

export default Hero;