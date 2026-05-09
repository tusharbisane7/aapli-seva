import "./emergency.scss";

import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

import {
  FaAmbulance,
  FaHospital,
  FaTint,
  FaShieldAlt,
  FaFemale,
  FaBuilding,
  FaPhoneAlt,
  FaMapMarkerAlt
} from "react-icons/fa";

function Emergency(){

  const sections = [

    {
      title:"Ambulance Services",
      icon:<FaAmbulance />,
      className:"ambulance",
      data:[
        {
          name:"Government Ambulance",
          location:"Achalpur",
          phone:"108"
        },
        {
          name:"Sai Ambulance Service",
          location:"Paratwada",
          phone:"0000000000"
        },
        {
          name:"Lifeline Ambulance",
          location:"Achalpur",
          phone:"0000000000"
        },
        {
          name:"City Care Ambulance",
          location:"Achalpur",
          phone:"0000000000"
        }
      ]
    },

    {
      title:"Government Hospitals",
      icon:<FaHospital />,
      className:"hospital",
      data:[
        {
          name:"Achalpur Sub District Hospital",
          location:"Tehsil Road, Achalpur",
          phone:"0000000000"
        },
        {
          name:"Women & Child Hospital",
          location:"Deoli, Achalpur",
          phone:"0000000000"
        }
      ]
    },

    {
      title:"Blood Banks",
      icon:<FaTint />,
      className:"blood",
      data:[
        {
          name:"Melghat Blood Bank",
          location:"Opposite Cotton Market",
          phone:"0000000000"
        }
      ]
    },

    {
      title:"Police Stations",
      icon:<FaShieldAlt />,
      className:"police",
      data:[
        {
          name:"Main Police Station",
          location:"Achalpur City",
          phone:"0000000000"
        },
        {
          name:"Paratwada Police Station",
          location:"Betul Road",
          phone:"0000000000"
        },
        {
          name:"Deoli Police Station",
          location:"Deoli, Achalpur",
          phone:"0000000000"
        }
      ]
    },

    {
      title:"Women Helpline",
      icon:<FaFemale />,
      className:"women",
      data:[
        {
          name:"Women Emergency Helpline",
          location:"Maharashtra",
          phone:"1091"
        }
      ]
    },

    {
      title:"Government Offices",
      icon:<FaBuilding />,
      className:"office",
      data:[
        {
          name:"Tehsil Office Achalpur",
          location:"Tehsil Road",
          phone:"0000000000"
        },
        {
          name:"Municipal Council",
          location:"Jagdamba Chowk",
          phone:"0000000000"
        },
        {
          name:"Revenue Department Office",
          location:"Civil Lines",
          phone:"0000000000"
        }
      ]
    }

  ];

  return(

    <div className="emergency-page">

      <Navbar />

      {/* HERO */}

      <div className="emergency-hero">

        <div className="overlay">

          <span className="hero-badge">

            24×7 Emergency Support

          </span>

          <h1>

            Emergency Services

          </h1>

          <p>

            Access emergency contacts,
            hospitals, police stations,
            ambulance services and
            important government offices
            in Achalpur.

          </p>

        </div>

      </div>

      {/* MAIN */}

      <div className="emergency-container">

        <div className="emergency-section">

          <h2>

            Emergency & Public Services

          </h2>

          {

            sections.map((section,index)=>(

              <div
                className={`emergency-category ${section.className}`}
                key={index}
              >

                <div className="category-header">

                  <div className="category-icon">

                    {section.icon}

                  </div>

                  <h3>

                    {section.title}

                  </h3>

                </div>

                <div className="emergency-grid">

                  {

                    section.data.map((item,i)=>(

                      <div
                        className="emergency-card"
                        key={i}
                      >

                        <div className="card-glow"></div>

                        <h4>

                          {item.name}

                        </h4>

                        <p>

                          <FaMapMarkerAlt />

                          {item.location}

                        </p>

                        <a
                          href={`tel:${item.phone}`}
                          className="call-btn"
                        >

                          <FaPhoneAlt />

                          {item.phone}

                        </a>

                      </div>

                    ))

                  }

                </div>

              </div>

            ))

          }

        </div>

      </div>

      <Footer />

    </div>

  );

}

export default Emergency;