import "./settings.scss";

import {
  useState,
  useCallback
} from "react";

import axios from "axios";

import Cropper from "react-easy-crop";

function Settings() {

  const storedUser = JSON.parse(

    localStorage.getItem("user")

  );

  /* IMAGE */

  const [profilePic,setProfilePic]
  = useState(null);

  const [preview,setPreview]
  = useState(

    storedUser?.profilePic

    ? `http://localhost:5000/uploads/${storedUser.profilePic}`

    : "https://cdn-icons-png.flaticon.com/512/149/149071.png"

  );

  /* CROPPER */

  const [showCrop,setShowCrop]
  = useState(false);

  const [crop,setCrop]
  = useState({

    x:0,
    y:0

  });

  const [zoom,setZoom]
  = useState(1);

  const [croppedAreaPixels,
  setCroppedAreaPixels]

  = useState(null);

  /* FORM */

  const [formData,setFormData]
  = useState({

    firstName:
    storedUser?.firstName || "",

    lastName:
    storedUser?.lastName || "",

    email:
    storedUser?.email || "",

    mobile:
    storedUser?.mobile || "",

    state:
    storedUser?.state || "",

    district:
    storedUser?.district || "",

    taluka:
    storedUser?.taluka || "",

    village:
    storedUser?.village || "",

    address:
    storedUser?.address || ""

  });

  /* INPUT */

  const handleChange =
  (e)=>{

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value

    });

  };

  /* IMAGE */

  const handleImage =
  (e)=>{

    const file =
    e.target.files[0];

    if(file){

      setProfilePic(file);

      setPreview(

        URL.createObjectURL(file)

      );

      setShowCrop(true);

    }

  };

  /* CROP */

  const onCropComplete =
  useCallback(

    (

      croppedArea,

      croppedAreaPixels

    )=>{

      setCroppedAreaPixels(

        croppedAreaPixels

      );

    },

    []

  );

  /* UPDATE */

  const handleUpdate =
  async()=>{

    try{

      const form =
      new FormData();

      Object.keys(formData)
      .forEach((key)=>{

        form.append(

          key,

          formData[key]

        );

      });

      if(profilePic){

        form.append(

          "profilePic",

          profilePic

        );

      }

      const res =
      await axios.put(

        `http://localhost:5000/api/auth/update/${storedUser._id || storedUser.id}`,

        form,

        {

          headers:{

            "Content-Type":

            "multipart/form-data"

          }

        }

      );

      localStorage.setItem(

        "user",

        JSON.stringify(
          res.data.user
        )

      );

      alert(
        "Profile Updated"
      );

      window.location.reload();

    }catch(error){

      console.log(error);

      alert(
        "Update Failed"
      );

    }

  };

  return(

    <div className="profile-page">

      <div className="profile-card">

        {/* PROFILE */}

        <div className="profile-top">

          <div className="profile-ring">

            <img

              src={preview}

              alt="profile"

              className="profile-image"

            />

          </div>

          <h2>

            {formData.firstName}
            {" "}
            {formData.lastName}

          </h2>

          <p>

            Smart City Citizen

          </p>

          <label className="upload-btn">

            Change Profile

            <input

              type="file"

              accept="image/*"

              hidden

              onChange={handleImage}

            />

          </label>

        </div>

        {/* CROP MODAL */}

        {

          showCrop && (

            <div className="crop-modal">

              <div className="crop-container">

                <Cropper

                  image={preview}

                  crop={crop}

                  zoom={zoom}

                  aspect={1}

                  cropShape="round"

                  showGrid={false}

                  onCropChange={setCrop}

                  onZoomChange={setZoom}

                  onCropComplete={
                    onCropComplete
                  }

                />

              </div>

              <div className="crop-actions">

                <button

                  type="button"

                  onClick={()=>{

                    setShowCrop(false);

                  }}

                >

                  Done

                </button>

              </div>

            </div>

          )

        }

        {/* FORM */}

        <form className="settings-form">

          <div className="form-grid">

            <input

              type="text"

              name="firstName"

              value={formData.firstName}

              onChange={handleChange}

              placeholder="First Name"

            />

            <input

              type="text"

              name="lastName"

              value={formData.lastName}

              onChange={handleChange}

              placeholder="Last Name"

            />

            <input

              type="email"

              name="email"

              value={formData.email}

              onChange={handleChange}

              placeholder="Email"

            />

            <input

              type="text"

              name="mobile"

              value={formData.mobile}

              onChange={handleChange}

              placeholder="Mobile"

            />

            <input

              type="text"

              name="state"

              value={formData.state}

              onChange={handleChange}

              placeholder="State"

            />

            <input

              type="text"

              name="district"

              value={formData.district}

              onChange={handleChange}

              placeholder="District"

            />

            <input

              type="text"

              name="taluka"

              value={formData.taluka}

              onChange={handleChange}

              placeholder="Taluka"

            />

            <input

              type="text"

              name="village"

              value={formData.village}

              onChange={handleChange}

              placeholder="Village"

            />

          </div>

          <textarea

            name="address"

            value={formData.address}

            onChange={handleChange}

            placeholder="Full Address"

          ></textarea>

          <button

            type="button"

            onClick={handleUpdate}

          >

            Save Changes

          </button>

        </form>

      </div>

    </div>

  );

}

export default Settings;