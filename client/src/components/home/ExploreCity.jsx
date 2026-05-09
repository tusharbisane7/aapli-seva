import "./ExploreCity.scss";

import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {

  FaMapMarkerAlt,
  FaArrowRight,
  FaStar

} from "react-icons/fa";

function ExploreCity() {

  const [places,setPlaces]
  = useState([]);

  const [current,setCurrent]
  = useState(0);

  /* ===================================
     FETCH PLACES
  =================================== */

  useEffect(()=>{

    fetchPlaces();

  },[]);

  const fetchPlaces = async()=>{

    try{

      const res = await axios.get(

        "http://localhost:5000/api/explore/all"

      );

      if(
        res.data.success
      ){

        setPlaces(
          res.data.places || []
        );

      }

    }catch(error){

      console.log(error);

    }

  };

  /* ===================================
     FALLBACK PLACES
  =================================== */

  const fallbackPlaces = [

    {
      title:"Ancient Temples",

      location:"Achalpur",

      description:
      "Explore historical temples and spiritual destinations with beautiful architecture.",

      rating:"4.9",

      thumbnail:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41"
    },

    {
      title:"Green Nature Hills",

      location:"Chikhaldara",

      description:
      "Beautiful mountains, waterfalls and green valleys surrounded by nature.",

      rating:"4.8",

      thumbnail:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
    }

  ];

  const displayPlaces =

    places.length > 0

    ? places

    : fallbackPlaces;

  /* ===================================
     AUTO SLIDER
  =================================== */

  useEffect(()=>{

    if(displayPlaces.length === 0)
    return;

    const autoSlide = setInterval(()=>{

      setCurrent((prev)=>

        prev === displayPlaces.length - 1
        ? 0
        : prev + 1

      );

    },3000);

    return ()=> clearInterval(autoSlide);

  },[displayPlaces.length]);

  return (

    <section className="explore-city">

      <div className="container">

        {/* HEADER */}

        <div className="section-header">

          <span>

            Explore Maharashtra

          </span>

          <h2>

            Discover Amazing Places

          </h2>

          <p>

            Explore tourism destinations,
            famous attractions, temples,
            cafes, hotels and hidden gems
            across Maharashtra.

          </p>

        </div>

        {/* AUTO SLIDER CARD */}

        <div className="city-slider">

          <div className="place-card">

            <img

              src={
                displayPlaces[current]
                ?.thumbnail
              }

              alt="place"

            />

            {/* OVERLAY */}

            <div className="place-overlay">

              {/* TOP */}

              <div className="place-top">

                <div className="place-location">

                  <FaMapMarkerAlt />

                  {
                    displayPlaces[current]
                    ?.location
                  }

                </div>

                <div className="place-rating">

                  <FaStar />

                  {
                    displayPlaces[current]
                    ?.rating
                  }

                </div>

              </div>

              {/* CONTENT */}

              <div className="place-content">

                <h3>

                  {
                    displayPlaces[current]
                    ?.title
                  }

                </h3>

                <p>

                  {

                    displayPlaces[current]
                    ?.description

                  }

                </p>

                <button>

                  Explore Place

                  <FaArrowRight />

                </button>

              </div>

            </div>

          </div>

        </div>

        {/* DOTS */}

        <div className="city-dots">

          {

            displayPlaces.map((_,index)=>(

              <span

                key={index}

                className={

                  current === index
                  ? "dot active-dot"
                  : "dot"

                }

                onClick={()=>{

                  setCurrent(index);

                }}

              >

              </span>

            ))

          }

        </div>

      </div>

    </section>

  );

}

export default ExploreCity;