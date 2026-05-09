import "../../styles/auth.scss";

import { Link } from "react-router-dom";

function ForgotPassword() {

  return (

    <div className="auth-page">

      <div className="auth-overlay"></div>

      <div className="auth-container">

        <div className="auth-header">

          <h1>Forgot Password</h1>

          <p>
            Enter your email to reset your password.
          </p>

        </div>

        <form className="auth-form">

          <div className="form-group">

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
            />

          </div>

          <button className="auth-btn">
            Send Reset Link
          </button>

        </form>

        <div className="auth-footer">

          Back to

          <Link to="/login">
            <span> Login</span>
          </Link>

        </div>

      </div>

    </div>

  );
}

export default ForgotPassword;