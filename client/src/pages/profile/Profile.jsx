import "./profile.scss";

import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaGlobeAsia,
  FaCity,
  FaHome,
  FaUserTie
} from "react-icons/fa";

function Profile() {

  const user = JSON.parse(

    localStorage.getItem("user")

  );

  /* PROFILE IMAGE */

  const profileImage =

    user?.profilePic

    ? user.profilePic.startsWith("http")

      ? user.profilePic

      : `https://aapli-seva.onrender.com/uploads/${user.profilePic}`

    : "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  return(

    <div className="profile-page">

      <div className="profile-card">

        {/* PROFILE TOP */}

        <div className="profile-top">

          <div className="profile-ring">

            <img

              src={profileImage}

              alt="profile"

              className="profile-image"

              onError={(e)=>{

                e.target.src =
                "https://cdn-icons-png.flaticon.com/512/149/149071.png";

              }}

            />

          </div>

          <h1>

            {user?.firstName}
            {" "}
            {user?.lastName}

          </h1>

          <p className="profile-email">

            <FaEnvelope />

            {" "}

            {user?.email || "No Email"}

          </p>

          <div className="profile-role">

            <FaUserTie />

            <span>

              Smart City Citizen

            </span>

          </div>

        </div>

        {/* PROFILE GRID */}

        <div className="profile-grid">

          {/* MOBILE */}

          <div className="profile-box">

            <div className="box-icon">

              <FaPhoneAlt />

            </div>

            <h3>

              Mobile Number

            </h3>

            <p>

              {user?.mobile || "N/A"}

            </p>

          </div>

          {/* AGE */}

          <div className="profile-box">

            <div className="box-icon">

              <FaUserTie />

            </div>

            <h3>

              Age

            </h3>

            <p>

              {user?.age || "N/A"}

            </p>

          </div>

          {/* STATE */}

          <div className="profile-box">

            <div className="box-icon">

              <FaGlobeAsia />

            </div>

            <h3>

              State

            </h3>

            <p>

              {user?.state || "N/A"}

            </p>

          </div>

          {/* DISTRICT */}

          <div className="profile-box">

            <div className="box-icon">

              <FaCity />

            </div>

            <h3>

              District

            </h3>

            <p>

              {user?.district || "N/A"}

            </p>

          </div>

          {/* TALUKA */}

          <div className="profile-box">

            <div className="box-icon">

              <FaMapMarkerAlt />

            </div>

            <h3>

              Taluka

            </h3>

            <p>

              {user?.taluka || "N/A"}

            </p>

          </div>

          {/* VILLAGE */}

          <div className="profile-box">

            <div className="box-icon">

              <FaHome />

            </div>

            <h3>

              Village

            </h3>

            <p>

              {user?.village || "N/A"}

            </p>

          </div>

          {/* ADDRESS */}

          <div className="profile-box full-width">

            <div className="box-icon">

              <FaMapMarkerAlt />

            </div>

            <h3>

              Full Address

            </h3>

            <p>

              {user?.address || "N/A"}

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Profile;