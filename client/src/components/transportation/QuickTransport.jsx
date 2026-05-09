import "./quickTransport.scss";

import {
  FaBus,
  FaTaxi,
  FaMotorcycle,
  FaTrain,
  FaMapMarkedAlt,
  FaCar
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function QuickTransport(){

  const navigate = useNavigate();

  const services = [

    {
      icon:<FaBus />,
      title:"MSRTC",
      path:"/transportation"
    },

    {
      icon:<FaTaxi />,
      title:"Cab Services",
      path:"/transportation"
    },

    {
      icon:<FaMotorcycle />,
      title:"Bike Rental",
      path:"/transportation"
    },

    {
      icon:<FaTrain />,
      title:"Railway",
      path:"/transportation"
    },

    {
      icon:<FaMapMarkedAlt />,
      title:"Route Search",
      path:"/transportation"
    },

    {
      icon:<FaCar />,
      title:"Private Travels",
      path:"/transportation"
    }

  ];

  return(

    <section className="quick-transport">

      <div className="container">

        <div className="section-header">

          <span>
            Smart Mobility
          </span>

          <h2>
            Quick Transportation Access
          </h2>

          <p>
            Explore smart transportation
            services across Maharashtra.
          </p>

        </div>

        <div className="transport-grid">

          {

            services.map((item,index)=>(

              <div
                className="transport-card"
                key={index}
                onClick={()=>
                  navigate(item.path)
                }
              >

                <div className="transport-icon">

                  {item.icon}

                </div>

                <h3>

                  {item.title}

                </h3>

              </div>

            ))

          }

        </div>

      </div>

    </section>

  );

}

export default QuickTransport;