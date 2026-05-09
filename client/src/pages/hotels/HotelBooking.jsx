import "./booking.scss";

import {
  useState
} from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import axios from "axios";

import Navbar from "../../components/navbar/Navbar";

function HotelBooking(){

  const { id } = useParams();

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [formData,setFormData]
  = useState({

    fullName:user?.firstName || "",

    mobile:user?.mobile || "",

    checkInDate:"",

    checkOutDate:"",

    roomsRequired:1,

    reason:"",

    aadhaarNumber:""

  });

  const [aadhaarPdf,setAadhaarPdf]
  = useState(null);

  const [agree,setAgree]
  = useState(false);

  /* Input */

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value

    });

  };

  /* Booking */

  const handleBooking = async(e) => {

    e.preventDefault();

    if(!agree){

      alert(
        "Accept Terms & Conditions"
      );

      return;

    }

    try{

      const data = new FormData();

      data.append(
        "hotelId",
        id
      );

      /* FIXED USER ID */

      data.append(
        "userId",
        user?._id || user?.id
      );

      Object.keys(formData).forEach((key)=>{

        data.append(
          key,
          formData[key]
        );

      });

      if(aadhaarPdf){

        data.append(
          "aadhaarPdf",
          aadhaarPdf
        );

      }

      const res = await axios.post(

        "http://localhost:5000/api/bookings/create",

        data

      );

      localStorage.setItem(

        "hotelBookingToken",

        res.data.bookingToken

      );

      alert(

        `Booking Successful\nToken: ${res.data.bookingToken}`

      );

      navigate("/hotel-booking");

    }catch(error){

      console.log(error);

      alert("Booking Failed");

    }

  };

  return(

    <div className="hotel-booking-page">

      <Navbar />

      <div className="booking-container">

        <h1>

          Hotel Booking

        </h1>

        <p className="booking-subtitle">

          Complete Your Stay Booking Details

        </p>

        {/* Info */}

        <div className="booking-info">

          <h2>

            Booking Information

          </h2>

          <p>

            • Carry Original Aadhaar Card
            During Hotel Check-In

          </p>

          <p>

            • Payment Will Be Collected
            At Hotel Reception

          </p>

          <p>

            • Check-In Time:
            12:00 PM

          </p>

          <p>

            • Check-Out Time:
            11:00 AM

          </p>

        </div>

        {/* Form */}

        <form onSubmit={handleBooking}>

          <div className="booking-grid">

            {/* Full Name */}

            <div className="form-group">

              <label>

                Full Name

              </label>

              <input

                type="text"

                name="fullName"

                placeholder="Enter Full Name"

                value={formData.fullName}

                onChange={handleChange}

                required

              />

            </div>

            {/* Mobile */}

            <div className="form-group">

              <label>

                Mobile Number

              </label>

              <input

                type="text"

                name="mobile"

                placeholder="Enter Mobile Number"

                value={formData.mobile}

                onChange={handleChange}

                required

              />

            </div>

            {/* Check In */}

            <div className="form-group">

              <label>

                Check In Date

              </label>

              <input

                type="date"

                name="checkInDate"

                value={formData.checkInDate}

                onChange={handleChange}

                required

              />

            </div>

            {/* Check Out */}

            <div className="form-group">

              <label>

                Check Out Date

              </label>

              <input

                type="date"

                name="checkOutDate"

                value={formData.checkOutDate}

                onChange={handleChange}

                required

              />

            </div>

            {/* Rooms */}

            <div className="form-group">

              <label>

                Rooms Required

              </label>

              <input

                type="number"

                name="roomsRequired"

                placeholder="Rooms Required"

                value={formData.roomsRequired}

                onChange={handleChange}

              />

            </div>

            {/* Aadhaar */}

            <div className="form-group">

              <label>

                Aadhaar Number

              </label>

              <input

                type="text"

                name="aadhaarNumber"

                placeholder="Enter Aadhaar Number"

                value={formData.aadhaarNumber}

                onChange={handleChange}

              />

            </div>

            {/* Reason */}

            <div className="form-group full-width">

              <label>

                Reason For Stay

              </label>

              <textarea

                name="reason"

                placeholder="Reason For Stay"

                value={formData.reason}

                onChange={handleChange}

              />

            </div>

            {/* Upload */}

            <div className="form-group full-width">

              <label>

                Upload Aadhaar PDF

              </label>

              <input

                className="file-upload"

                type="file"

                accept=".pdf"

                onChange={(e)=>

                  setAadhaarPdf(

                    e.target.files[0]

                  )

                }

              />

            </div>

          </div>

          {/* Terms */}

          <div className="terms-box">

            <input

              type="checkbox"

              checked={agree}

              onChange={()=>

                setAgree(!agree)

              }

            />

            <span>

              I confirm all details are
              correct and accept hotel
              booking terms & conditions.

            </span>

          </div>

          {/* Submit */}

          <button type="submit">

            Confirm Booking

          </button>

        </form>

      </div>

    </div>

  );

}

export default HotelBooking;