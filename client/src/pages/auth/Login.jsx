import "../../styles/auth.scss";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  useState
} from "react";

import axios from "axios";

function Login() {

  const navigate = useNavigate();

  const [formData,setFormData]
  = useState({

    email:"",
    password:""

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value

    });

  };

  /* LOGIN */

  const handleLogin =
  async(e) => {

    e.preventDefault();

    try{

      const res = await axios.post(

        "https://aapli-seva.onrender.com/api/auth/login",

        formData

      );

      localStorage.setItem(

        "user",

        JSON.stringify(
          res.data.user
        )

      );

      localStorage.setItem(

        "token",

        res.data.token

      );

      alert(
        "Login Successful"
      );

      navigate("/");

      window.location.reload();

    }catch(error){

      console.log(error);

      alert(

        error.response?.data?.message ||

        "Login Failed"

      );

    }

  };

  return (

    <div className="auth-page">

      <div className="auth-overlay"></div>

      <div className="auth-container">

        <div className="auth-header">

          <h1>
            Welcome Back
          </h1>

          <p>

            Login Securely
            To Continue

          </p>

        </div>

        <form

          className="auth-form"

          onSubmit={handleLogin}

        >

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

          <button

            type="submit"

            className="auth-btn"

          >

            Login

          </button>

        </form>

        <div className="auth-footer">

          Don’t have an account?

          <Link to="/register">

            <span>
              Register
            </span>

          </Link>

        </div>

      </div>

    </div>

  );

}

export default Login;