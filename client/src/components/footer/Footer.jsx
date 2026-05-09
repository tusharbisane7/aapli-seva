import "./footer.scss";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaArrowRight,
  FaYoutube
} from "react-icons/fa";

import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
function Footer() {

  return (

    <footer className="footer">

      {/* TOP GLOW */}

      <div className="footer-glow one"></div>
      <div className="footer-glow two"></div>

      <div className="container">

        <div className="footer-grid">

          {/* BRAND */}

          <div className="footer-brand">

            <div className="footer-logo">

              
            <div className="logo">

              <img
                src={logo}
                alt="Aapli Seva"
                className="navbar-logo-img"
              />



              </div>

              <div>

                <h2>

                  Aapli Seva

                </h2>

                <p>

                  Smart City Platform

                </p>

              </div>

            </div>

            <p className="footer-desc">

              One smart digital platform for
              Maharashtra tourism, transport,
              emergency services, hotels,
              government schemes and smart city
              solutions.

            </p>

            {/* SOCIAL */}

            <div className="social-icons">

              <a href="#">
                <FaFacebookF />
              </a>

              <a href="#">
                <FaInstagram />
              </a>

              <a href="#">
                <FaTwitter />
              </a>

              <a href="#">
                <FaYoutube />
              </a>

            </div>

          </div>



          {/* POLICIES */}

          <div className="footer-links">

            <h3>

              Policies

            </h3>

            <ul>

              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>Refund Policy</li>
              <li>Support Center</li>
              <li>Help Desk</li>

            </ul>

          </div>

          {/* CONTACT */}

          <div className="footer-contact">

            <h3>

              Contact Us

            </h3>

            <ul>

              <li>

                <FaMapMarkerAlt />

                Achalpur Smart City,
                Maharashtra

              </li>

              <li>

                <FaPhoneAlt />

                +91 9067934163

              </li>

              <li>

                <FaEnvelope />

                support@aapliseva.com

              </li>

            </ul>

            {/* BUTTON */}

            <button className="footer-btn">

              Connect With Us

              <FaArrowRight />

            </button>

          </div>

        </div>

        {/* BOTTOM */}

        <div className="footer-bottom">

          <p>

            © 2026 Aapli Seva.
            All Rights Reserved.

          </p>

          <span>

            Developed By Tushar

          </span>

        </div>

      </div>

    </footer>

  );

}

export default Footer;