import "./applyService.scss";

import { useState } from "react";

import axios from "axios";

function ApplyService() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [formData,setFormData]
  = useState({

    userId:user?.id,

    userName:
    `${user?.firstName} ${user?.lastName}`,

    userEmail:user?.email,

    userMobile:user?.mobile,

    serviceName:"Income Certificate",

    firstName:"",
    middleName:"",
    lastName:"",
    age:"",
    dob:"",
    gender:"",
    mobile:"",
    email:"",
    address:"",
    state:"",
    district:"",
    taluka:"",
    village:"",
    pincode:"",
    reason:""

  });

  const [files,setFiles]
  = useState({});

  /* INPUT */

  const handleChange = (e)=>{

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value

    });

  };

  /* FILE */

  const handleFile = (e)=>{

    setFiles({

      ...files,

      [e.target.name]:
      e.target.files[0]

    });

  };

  /* SUBMIT */

  const handleSubmit =
  async(e)=>{

    e.preventDefault();

    try{

      const data =
      new FormData();

      Object.keys(formData)
      .forEach((key)=>{

        data.append(

          key,

          formData[key]

        );

      });

      Object.keys(files)
      .forEach((key)=>{

        data.append(

          key,

          files[key]

        );

      });

      const res =
      await axios.post(

        "http://localhost:5000/api/application/create",

        data,

        {

          headers:{

            "Content-Type":
            "multipart/form-data"

          }

        }

      );

      alert(
        "Application Submitted"
      );

      console.log(res.data);

    }catch(error){

      console.log(error);

      alert("Submission Failed");

    }

  };

  return(

    <div className="apply-page">

      <div className="apply-card">

        <h1>

          Apply Service

        </h1>

        <form onSubmit={handleSubmit}>

          <div className="grid">

            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
            />

            <input
              type="text"
              name="middleName"
              placeholder="Middle Name"
              onChange={handleChange}
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={handleChange}
            />

            <input
              type="number"
              name="age"
              placeholder="Age"
              onChange={handleChange}
            />

            <input
              type="date"
              name="dob"
              onChange={handleChange}
            />

            <select
              name="gender"
              onChange={handleChange}
            >

              <option>
                Select Gender
              </option>

              <option>
                Male
              </option>

              <option>
                Female
              </option>

            </select>

            <input
              type="text"
              name="mobile"
              placeholder="Mobile"
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              onChange={handleChange}
            />

            <input
              type="text"
              name="district"
              placeholder="District"
              onChange={handleChange}
            />

            <input
              type="text"
              name="taluka"
              placeholder="Taluka"
              onChange={handleChange}
            />

            <input
              type="text"
              name="village"
              placeholder="Village"
              onChange={handleChange}
            />

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              onChange={handleChange}
            />

          </div>

          <textarea

            name="address"

            placeholder="Address"

            onChange={handleChange}

          ></textarea>

          <textarea

            name="reason"

            placeholder="Reason"

            onChange={handleChange}

          ></textarea>

          <h3>
            Upload Documents
          </h3>

          <div className="grid">

            <input
              type="file"
              name="aadhaarCard"
              onChange={handleFile}
            />

            <input
              type="file"
              name="panCard"
              onChange={handleFile}
            />

            <input
              type="file"
              name="passport"
              onChange={handleFile}
            />

            <input
              type="file"
              name="livePhoto"
              onChange={handleFile}
            />

          </div>

          <button type="submit">

            Submit Application

          </button>

        </form>

      </div>

    </div>

  );

}

export default ApplyService;