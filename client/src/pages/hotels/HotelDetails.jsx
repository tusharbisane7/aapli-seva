import "./hotelDetails.scss";

import {
  useEffect,
  useState
} from "react";

import {
  useParams,
  Link
} from "react-router-dom";

import axios from "axios";

import Navbar from "../../components/navbar/Navbar";

function HotelDetails(){

  const { id } = useParams();

  const [hotel,setHotel]
  = useState(null);

  const [reviews,setReviews]
  = useState([]);

  const [comment,setComment]
  = useState("");

  const [rating,setRating]
  = useState(5);

  const [anonymous,setAnonymous]
  = useState(false);

  /* SLIDER */

  const [currentImage,setCurrentImage]
  = useState(0);

  const user = JSON.parse(

    localStorage.getItem("user")

  );

  /* =========================
     USE EFFECT
  ========================= */

  useEffect(()=>{

    fetchHotel();

    fetchReviews();

  },[]);

  /* =========================
     FETCH HOTEL
  ========================= */

  const fetchHotel = async() => {

    try{

      const res = await axios.get(

        "http://localhost:5000/api/hotels/all"

      );

      const selectedHotel =

      res.data.find(

        (item)=> item._id === id

      );

      setHotel(selectedHotel);

    }catch(error){

      console.log(error);

    }

  };

  /* =========================
     FETCH REVIEWS
  ========================= */

  const fetchReviews = async() => {

    try{

      const res = await axios.get(

        `http://localhost:5000/api/hotel-reviews/${id}`

      );

      setReviews(

        res.data.reviews

      );

    }catch(error){

      console.log(error);

    }

  };

  /* =========================
     ADD REVIEW
  ========================= */

  const addReview = async() => {

    if(!comment){

      alert("Enter Review");

      return;

    }

    try{

      await axios.post(

        "http://localhost:5000/api/hotel-reviews/add",

        {

          hotelId:id,

          userId:user?._id,

          firstName:
          user?.firstName,

          lastName:
          user?.lastName,

          userName:
          user?.firstName,

          image:
          user?.profilePic,

          rating,

          anonymous,

          review:comment

        }

      );

      alert("Review Added");

      setComment("");

      setRating(5);

      setAnonymous(false);

      fetchReviews();

    }catch(error){

      console.log(error);

    }

  };

  /* =========================
     DELETE REVIEW
  ========================= */

  const deleteReview = async(reviewId)=>{

    try{

      await axios.delete(

        `http://localhost:5000/api/hotel-reviews/delete/${reviewId}`

      );

      fetchReviews();

    }catch(error){

      console.log(error);

    }

  };

  if(!hotel){

    return <h1>Loading...</h1>;

  }

  return(

    <div className="hotel-details-page">

      <Navbar />

      <div className="hotel-details-container">

        {/* =========================
            HOTEL SLIDER
        ========================= */}

        <div className="hotel-slider">

          <img

            src={

              hotel.hotelImages?.[currentImage]

            }

            alt="hotel"

            className="slider-image"

          />

          {/* LEFT */}

          <button

            className="slider-btn left"

            onClick={()=>

              setCurrentImage(

                currentImage === 0

                ? hotel.hotelImages.length - 1

                : currentImage - 1

              )

            }

          >

            ❮

          </button>

          {/* RIGHT */}

          <button

            className="slider-btn right"

            onClick={()=>

              setCurrentImage(

                currentImage ===
                hotel.hotelImages.length - 1

                ? 0

                : currentImage + 1

              )

            }

          >

            ❯

          </button>

        </div>

        {/* =========================
            THUMBNAILS
        ========================= */}

        <div className="slider-thumbnails">

          {

            hotel.hotelImages?.map(

              (img,index)=>(

                <img

                  key={index}

                  src={img}

                  alt="thumb"

                  className={

                    currentImage === index

                    ? "active-thumb"

                    : ""

                  }

                  onClick={()=>

                    setCurrentImage(index)

                  }

                />

              )

            )

          }

        </div>

        {/* =========================
            HOTEL INFO
        ========================= */}

        <h1>

          {hotel.hotelName}

        </h1>

        <p>

          {hotel.hotelAddress}

        </p>

        <p>

          {hotel.hotelDescription}

        </p>

        {/* =========================
            INFO GRID
        ========================= */}

        <div className="hotel-info-grid">

          <div>

            WiFi:
            {" "}

            {hotel.wifi ? "Yes" : "No"}

          </div>

          <div>

            Parking:
            {" "}

            {hotel.parking ? "Yes" : "No"}

          </div>

          <div>

            TV:
            {" "}

            {hotel.tv ? "Yes" : "No"}

          </div>

          <div>

            Garden:
            {" "}

            {hotel.garden ? "Yes" : "No"}

          </div>

          <div>

            Beds:
            {" "}

            {hotel.beds}

          </div>

          <div>

            Available Rooms:
            {" "}

            {hotel.roomsAvailable}

          </div>

          <div>

            Contact:
            {" "}

            {hotel.hotelContact}

          </div>

          <div>

            License No:
            {" "}

            {hotel.hotelLicenseNo}

          </div>

        </div>

        {/* =========================
            BOOKING
        ========================= */}

        <Link to={`/hotel-book/${hotel._id}`}>

          <button className="book-btn">

            Book Hotel

          </button>

        </Link>

        {/* =========================
            REVIEWS
        ========================= */}

        <div className="review-section">

          <h2>

            Reviews & Ratings

          </h2>

          {/* TEXTAREA */}

          <textarea

            placeholder="Write Review"

            value={comment}

            onChange={(e)=>

              setComment(e.target.value)

            }

          />

          {/* RATING */}

          <div className="rating-box">

            {

              [1,2,3,4,5].map((star)=>(

                <span

                  key={star}

                  className={

                    rating >= star

                    ? "active-star"

                    : ""

                  }

                  onClick={()=>

                    setRating(star)

                  }

                >

                  ⭐

                </span>

              ))

            }

          </div>

          {/* ANONYMOUS */}

          <div className="anonymous-box">

            <input

              type="checkbox"

              checked={anonymous}

              onChange={(e)=>

                setAnonymous(

                  e.target.checked

                )

              }

            />

            <span>

              Post Anonymously

            </span>

          </div>

          {/* BUTTON */}

          <button onClick={addReview}>

            Add Review

          </button>

          {/* REVIEW LIST */}

          {

            reviews.length > 0

            ? (

              reviews.map((item,index)=>(

                <div

                  className="review-card"

                  key={index}

                >

                  <h3>

                    {

                      item.anonymous

                      ? "Anonymous User"

                      :

                      item.userName ||

                      `${item.firstName || ""}
                      ${item.lastName || ""}`

                    }

                  </h3>

                  <p>

                    {

                      "⭐".repeat(

                        item.rating || 5

                      )

                    }

                  </p>

                  <p>

                    {item.review}

                  </p>

                  {

                    user?.role ===
                    "admin" && (

                      <button

                        className="delete-review-btn"

                        onClick={()=>

                          deleteReview(

                            item._id

                          )

                        }

                      >

                        Delete

                      </button>

                    )

                  }

                </div>

              ))

            ) : (

              <p>

                No Reviews Yet

              </p>

            )

          }

        </div>

      </div>

    </div>

  );

}

export default HotelDetails;