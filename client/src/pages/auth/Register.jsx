import "../../styles/auth.scss";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  useState
} from "react";

import axios from "axios";

function Register() {

  const navigate = useNavigate();

  const [formData,setFormData]
  = useState({

    firstName:"",
    lastName:"",
    age:"",
    mobile:"",
    email:"",
    state:"",
    district:"",
    taluka:"",
    village:"",
    address:"",
    password:""

  });

  const [otp,setOtp]
  = useState("");

  const [showOTP,setShowOTP]
  = useState(false);

  const [loading,setLoading]
  = useState(false);

  /* HANDLE INPUT */

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value

    });

  };

  /* SEND OTP */

  const sendOTP = async () => {

    try{

      if(!formData.email){

        alert(
          "Enter Email"
        );

        return;

      }

      setLoading(true);

      const res = await axios.post(

        "https://aapli-seva.onrender.com/api/otp/send-otp",

        {

          email:formData.email

        }

      );

      alert(
        res.data.message
      );

      setShowOTP(true);

    }catch(error){

      console.log(error);

      alert(

        error.response?.data?.message ||

        "OTP Failed"

      );

    }finally{

      setLoading(false);

    }

  };

  /* VERIFY OTP & REGISTER */

  const verifyOTP =
  async(e) => {

    e.preventDefault();

    try{

      const otpRes =
      await axios.post(

        "https://aapli-seva.onrender.com/api/otp/verify-otp",

        {

          email:formData.email,

          otp

        }

      );

      if(otpRes.data.success){

        const res = await axios.post(

          "https://aapli-seva.onrender.com/api/auth/register",

          formData

        );

        alert(
          res.data.message
        );

        navigate("/login");

      }

    }catch(error){

      console.log(error);

      alert(

        error.response?.data?.message ||

        "Invalid OTP"

      );

    }

  };

  return (

    <div className="auth-page">

      <div className="auth-overlay"></div>

      <div className="auth-container register-container">

        <div className="auth-header">

          <h1>
            Create Account
          </h1>

          <p>

            Register Securely
            Using Email OTP

          </p>

        </div>

        <form

          className="auth-form"

          onSubmit={verifyOTP}

        >

          {/* FIRST NAME */}

          <div className="form-group">

            <label>
              First Name
            </label>

            <input

              type="text"

              name="firstName"

              placeholder="Enter First Name"

              onChange={handleChange}

              required

            />

          </div>

          {/* LAST NAME */}

          <div className="form-group">

            <label>
              Last Name
            </label>

            <input

              type="text"

              name="lastName"

              placeholder="Enter Last Name"

              onChange={handleChange}

              required

            />

          </div>

          {/* AGE */}

          <div className="form-group">

            <label>
              Age
            </label>

            <input

              type="number"

              name="age"

              placeholder="Enter Age"

              onChange={handleChange}

              required

            />

          </div>

          {/* MOBILE */}

          <div className="form-group">

            <label>
              Mobile Number
            </label>

            <input

              type="text"

              name="mobile"

              placeholder="Enter Mobile Number"

              onChange={handleChange}

              required

            />

          </div>

          {/* EMAIL */}

          <div className="form-group">

            <label>
              Email
            </label>

            <input

              type="email"

              name="email"

              placeholder="Enter Email"

              onChange={handleChange}

              required

            />

          </div>

          {/* STATE */}

          <div className="form-group">

            <label>
              State
            </label>

            <select

              name="state"

              onChange={handleChange}

              required

            >

              <option value="">
                Select State
              </option>

              <option value="Maharashtra">
                Maharashtra
              </option>

            </select>

          </div>

          {/* DISTRICT */}

          <div className="form-group">

            <label>
              District
            </label>

            <select

              name="district"

              onChange={handleChange}

              required

            >

              <option value="">
                Select District
              </option>

              <option value="Amravati">
                Amravati
              </option>

            </select>

          </div>

          {/* TALUKA */}

          <div className="form-group">

            <label>
              Taluka
            </label>

            <select

              name="taluka"

              onChange={handleChange}

              required

            >

              <option value="">
                Select Taluka
              </option>

              <option value="Achalpur">
                Achalpur
              </option>

            </select>

          </div>

          {/* VILLAGE */}

          <div className="form-group">

            <label>
              Village
            </label>

            <input

              type="text"

              name="village"

              placeholder="Enter Village"

              onChange={handleChange}

              required

            />

          </div>

          {/* ADDRESS */}

          <div className="form-group">

            <label>
              Address
            </label>

            <textarea

              rows="4"

              name="address"

              placeholder="Enter Full Address"

              onChange={handleChange}

              required

            ></textarea>

          </div>

          {/* PASSWORD */}

          <div className="form-group">

            <label>
              Password
            </label>

            <input

              type="password"

              name="password"

              placeholder="Enter Password"

              onChange={handleChange}

              required

            />

          </div>

          {/* OTP */}

          {

            showOTP && (

              <div className="form-group">

                <label>
                  Enter OTP
                </label>

                <input

                  type="text"

                  placeholder="Enter OTP"

                  value={otp}

                  onChange={(e)=>

                    setOtp(
                      e.target.value
                    )

                  }

                  required

                />

              </div>

            )

          }

          {

            !showOTP ? (

              <button

                type="button"

                className="auth-btn"

                onClick={sendOTP}

              >

                {

                  loading

                  ? "Sending OTP..."

                  : "Send OTP"

                }

              </button>

            ) : (

              <button

                type="submit"

                className="auth-btn"

              >

                Verify OTP & Register

              </button>

            )

          }

        </form>

        <div className="auth-footer">

          Already have an account?

          <Link to="/login">

            <span>
              Login
            </span>

          </Link>

        </div>

      </div>

    </div>

  );

}

export default Register;