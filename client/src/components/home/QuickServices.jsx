import "./QuickServices.scss";

import {
  FaFileAlt,
  FaHotel,
  FaUtensils,
  FaHospital,
  FaTrain,
  FaBus,
  FaMapMarkedAlt,
  FaShieldAlt
} from "react-icons/fa";

import {
  Link
} from "react-router-dom";

function QuickServices() {

  const services = [

    {
      icon:<FaFileAlt />,
      title:"Setu Portal",
      desc:"Government Documents & Certificates",
      link:"/setu"
    },

    {
      icon:<FaHotel />,
      title:"Hotels",
      desc:"Book Nearby Hotels & Rooms",
      link:"/hotels"
    },

    {
      icon:<FaUtensils />,
      title:"Restaurants",
      desc:"Best Food & Cafes In City",
      link:"/tourism"
    },

    {
      icon:<FaHospital />,
      title:"Hospitals",
      desc:"Emergency Medical Services",
      link:"/emergency"
    },

    {
      icon:<FaTrain />,
      title:"Railway",
      desc:"Nearby Railway Stations",
      link:"/tourism"
    },

    {
      icon:<FaBus />,
      title:"Bus Services",
      desc:"City & MSRTC Transport",
      link:"/tourism"
    },

    {
      icon:<FaMapMarkedAlt />,
      title:"Tourism",
      desc:"Explore Famous Places",
      link:"/tourism"
    },

    {
      icon:<FaShieldAlt />,
      title:"Police",
      desc:"Safety & Emergency Help",
      link:"/emergency"
    }

  ];

  return (

    <section className="quick-services">

      <div className="container">

        {/* Header */}

        <div className="section-header">

          
          <h2>
            Quick Access Services
          </h2>

          
        </div>

        {/* Services Grid */}

        <div className="services-grid">

          {

            services.map((service,index)=>(

              <Link
                to={service.link}
                className="service-link"
                key={index}
              >

                <div className="service-card">

                  <div className="service-icon">

                    {service.icon}

                  </div>

                  <h3>

                    {service.title}

                  </h3>

                  <p>

                    {service.desc}

                  </p>

                  <button className="service-btn">

                    Explore

                  </button>

                </div>

              </Link>

            ))

          }

        </div>

      </div>

    </section>

  );

}

export default QuickServices;