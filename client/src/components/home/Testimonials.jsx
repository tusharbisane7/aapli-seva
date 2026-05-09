import "./Testimonials.scss";

import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  FaQuoteRight,
  FaStar,
  FaPaperPlane
} from "react-icons/fa";

function Testimonials() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [reviews,setReviews]
  = useState([]);

  const [current,setCurrent]
  = useState(0);

  const [reviewText,setReviewText]
  = useState("");

  const [rating,setRating]
  = useState(5);

  const [anonymous,setAnonymous]
  = useState(false);

  /* =========================
     FETCH REVIEWS
  ========================= */

  const fetchReviews = async()=>{

    try{

      const res = await axios.get(

        "https://aapli-seva.onrender.com/api/reviews"

      );

      setReviews(

        res.data.reviews || []

      );

    }catch(error){

      console.log(error);

    }

  };

  useEffect(()=>{

    fetchReviews();

  },[]);

  /* =========================
     AUTO SLIDER
  ========================= */

  useEffect(()=>{

    if(reviews.length === 0)
    return;

    const autoSlide = setInterval(()=>{

      setCurrent((prev)=>

        prev === reviews.length - 1
        ? 0
        : prev + 1

      );

    },3000);

    return ()=> clearInterval(autoSlide);

  },[reviews]);

  /* =========================
     ADD REVIEW
  ========================= */

  const submitReview = async()=>{

    if(!reviewText){

      alert("Write Review");

      return;

    }

    try{

      await axios.post(

        "https://aapli-seva.onrender.com/api/reviews/add",

        {

          userId:user?._id,

          firstName:
          user?.firstName,

          lastName:
          user?.lastName,

          image:
          user?.profilePic,

          review:reviewText,

          rating,

          anonymous

        }

      );

      setReviewText("");

      setRating(5);

      setAnonymous(false);

      fetchReviews();

    }catch(error){

      console.log(error);

    }

  };

  return (

    <section className="testimonials-section">

      <div className="container">

        {/* HEADER */}

        <div className="section-header">

          <span>

            Citizen Reviews

          </span>

          <h2>

            What Citizens Say

          </h2>

          <p>

            Real experiences shared by
            citizens using Aapli Seva
            Smart City Platform.

          </p>

        </div>

        {/* REVIEW FORM */}

        {

          user && (

            <div className="review-form">

              {/* TEXTAREA */}

              <textarea

                placeholder="Write your experience..."

                value={reviewText}

                onChange={(e)=>

                  setReviewText(

                    e.target.value

                  )

                }

              />

              {/* STAR RATING */}

              <div className="rating-stars">

                {

                  [1,2,3,4,5].map((star)=>(

                    <button

                      type="button"

                      key={star}

                      className={

                        rating >= star

                        ? "star-btn active-star"

                        : "star-btn"

                      }

                      onClick={()=>

                        setRating(star)

                      }

                    >

                      <FaStar />

                    </button>

                  ))

                }

              </div>

              {/* ANONYMOUS */}

              <label className="anonymous-box">

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

                  Post Review Anonymously

                </span>

              </label>

              {/* SUBMIT */}

              <button

                className="submit-review-btn"

                onClick={submitReview}

              >

                <FaPaperPlane />

                Submit Review

              </button>

            </div>

          )

        }

        {/* TESTIMONIAL CARD */}

        {

          reviews.length > 0 && (

            <div className="testimonial-slider">

              <div className="testimonial-card">

                {/* QUOTE */}

                <div className="quote-icon">

                  <FaQuoteRight />

                </div>

                {/* USER */}

                <div className="user-info">

                  <img

                    src={

                      reviews[current]
                      ?.image

                      ? `http://localhost:5000/uploads/${reviews[current].image}`

                      : "https://cdn-icons-png.flaticon.com/512/149/149071.png"

                    }

                    alt="user"

                  />

                  <div>

                    <h3>

                      {

                        reviews[current]
                        ?.anonymous

                        ? "Anonymous User"

                        :

                        `${reviews[current]?.firstName || ""}
                        ${reviews[current]?.lastName || ""}`

                      }

                    </h3>

                    <p>

                      Verified Citizen

                    </p>

                  </div>

                </div>

                {/* STARS */}

                <div className="stars">

                  {

                    [...Array(

                      reviews[current]
                      ?.rating || 5

                    )].map((_,i)=>(

                      <FaStar key={i} />

                    ))

                  }

                </div>

                {/* REVIEW */}

                <p className="review">

                  {

                    reviews[current]
                    ?.review

                  }

                </p>

              </div>

            </div>

          )

        }

        {/* DOTS */}

        <div className="slider-dots">

          {

            reviews.map((_,index)=>(

              <span

                key={index}

                className={

                  current === index

                  ? "dot active-dot"

                  : "dot"

                }

                onClick={()=>

                  setCurrent(index)

                }

              >

              </span>

            ))

          }

        </div>

      </div>

    </section>

  );

}

export default Testimonials;