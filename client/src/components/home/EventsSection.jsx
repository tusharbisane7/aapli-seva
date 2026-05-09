import "./EventsSection.scss";

import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaArrowRight,
  FaClock
} from "react-icons/fa";

function EventsSection() {

  const [events,setEvents]
  = useState([]);

  const [current,setCurrent]
  = useState(0);

  /* ===================================
     FETCH EVENTS
  =================================== */

  useEffect(()=>{

    fetchEvents();

  },[]);

  const fetchEvents = async()=>{

    try{

      const res = await axios.get(

        "http://localhost:5000/api/events/all"

      );

      if(
        res.data.success
      ){

        setEvents(
          res.data.events || []
        );

      }

    }catch(error){

      console.log(error);

    }

  };

  /* ===================================
     FALLBACK EVENTS
  =================================== */

  const fallbackEvents = [

    {
      title:"Navratri At Waghmata Temple",

      location:"Achalpur",

      date:"October 2026",

      time:"7:00 PM",

      description:
      "Experience the famous Navratri celebration and cultural programs.",

      thumbnail:
      "https://images.unsplash.com/photo-1604608672516-f1b3f5f4d3f8"
    },

    {
      title:"Bahiram Baba Yatra Festival",

      location:"Chikhaldara",

      date:"January 2027",

      time:"6:00 PM",

      description:
      "Traditional yatra festival with spiritual and tourism attractions.",

      thumbnail:
      "https://images.unsplash.com/photo-1513151233558-d860c5398176"
    }

  ];

  const displayEvents =

    events.length > 0

    ? events

    : fallbackEvents;

  /* ===================================
     AUTO SLIDER
  =================================== */

  useEffect(()=>{

    if(displayEvents.length === 0)
    return;

    const autoSlide = setInterval(()=>{

      setCurrent((prev)=>

        prev === displayEvents.length - 1
        ? 0
        : prev + 1

      );

    },3000);

    return ()=> clearInterval(autoSlide);

  },[displayEvents.length]);

  return (

    <section className="events-section">

      <div className="container">

        {/* HEADER */}

        <div className="section-header">

          <span>

            Cultural Festivals

          </span>

          <h2>

            Explore Famous Events &
            Cultural Festivals

          </h2>

          <p>

            Discover Maharashtra’s famous
            festivals, traditions, yatras,
            temples and tourism celebrations.

          </p>

        </div>

        {/* EVENT CARD */}

        <div className="events-slider">

          <div className="event-card">

            <img

              src={
                displayEvents[current]
                ?.thumbnail
              }

              alt="event"

            />

            {/* OVERLAY */}

            <div className="event-overlay">

              {/* INFO */}

              <div className="event-info">

                <span>

                  <FaCalendarAlt />

                  {
                    displayEvents[current]
                    ?.date
                  }

                </span>

                <span>

                  <FaClock />

                  {
                    displayEvents[current]
                    ?.time
                  }

                </span>

                <span>

                  <FaMapMarkerAlt />

                  {
                    displayEvents[current]
                    ?.location
                  }

                </span>

              </div>

              {/* TITLE */}

              <h3>

                {
                  displayEvents[current]
                  ?.title
                }

              </h3>

              {/* DESCRIPTION */}

              <p>

                {
                  displayEvents[current]
                  ?.description
                }

              </p>

              {/* BUTTON */}

              <button>

                Explore Event

                <FaArrowRight />

              </button>

            </div>

          </div>

        </div>

        {/* DOTS */}

        <div className="event-dots">

          {

            displayEvents.map((_,index)=>(

              <span

                key={index}

                className={

                  current === index
                  ? "dot active-dot"
                  : "dot"

                }

                onClick={()=>setCurrent(index)}

              >

              </span>

            ))

          }

        </div>

      </div>

    </section>

  );

}

export default EventsSection;