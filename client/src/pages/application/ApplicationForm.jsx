import "./application.scss";

import {
  useState
} from "react";

import axios from "axios";

import Navbar from "../../components/navbar/Navbar";

function ApplicationForm(){

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const selectedService =
  localStorage.getItem(
    "selectedService"
  );

  const [formData,setFormData]
  = useState({

    firstName:"",
    middleName:"",
    lastName:"",

    firstNameMarathi:"",
    middleNameMarathi:"",
    lastNameMarathi:"",

    fatherName:"",
    motherName:"",

    age:"",
    dob:"",

    reason:"",

    address:"",
    taluka:"",
    district:"",
    state:"",
    pincode:"",

    mobile:user?.mobile || "",

    email:user?.email || ""

  });

  const [files,setFiles]
  = useState({});

  const [agree,setAgree]
  = useState(false);

  const [loading,setLoading]
  = useState(false);

  /* HANDLE INPUTS */

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value

    });

  };

  /* HANDLE FILES */

  const handleFile = (e) => {

    setFiles({

      ...files,

      [e.target.name]:
      e.target.files[0]

    });

  };

  /* SUBMIT */

  const handleSubmit = async (e) => {

    e.preventDefault();

    if(!agree){

      alert(
        "Please accept declaration"
      );

      return;

    }

    try{

      setLoading(true);

      const data = new FormData();

      /* REQUIRED */

      data.append(

        "userId",

        user?.id || "guest"

      );

      data.append(

        "serviceName",

        selectedService ||
        "General Service"

      );

      /* FORM DATA */

      Object.keys(formData).forEach((key)=>{

        data.append(

          key,

          formData[key]

        );

      });

      /* FILES */

      Object.keys(files).forEach((key)=>{

        if(files[key]){

          data.append(

            key,

            files[key]

          );

        }

      });

      /* CREATE APPLICATION */

      const res = await axios.post(

        "http://localhost:5000/api/application/create",

        data,

        {

          headers:{

            "Content-Type":
            "multipart/form-data"

          }

        }

      );

      /* SAVE TRACKING ID */

      localStorage.setItem(

        "trackingId",

        res.data.trackingId

      );

      /* CREATE PAYMENT ORDER */

      const orderRes = await axios.post(

        "http://localhost:5000/api/payment/create-order"

      );

      const order =
      orderRes.data.order;

      console.log(order);

      /* RAZORPAY OPTIONS */

      const options = {

        key:

        import.meta.env
        .VITE_RAZORPAY_KEY,

        amount:
        order.amount,

        currency:
        order.currency,

        name:
        "Aapli Seva",

        description:
        "Setu Application Payment",

        order_id:
        order.id,

        method: {

          upi: true,

          card: true,

          netbanking: true,

          wallet: true

        },

        handler: async function(response){

          console.log(response);

          try{

            await axios.post(

              "http://localhost:5000/api/payment/verify-payment",

              {

                razorpay_order_id:
                response.razorpay_order_id,

                razorpay_payment_id:
                response.razorpay_payment_id,

                razorpay_signature:
                response.razorpay_signature,

                trackingId:
                res.data.trackingId

              }

            );

            alert(

              "✅ Payment Successful"

            );

            window.location.href =
            "/tracking";

          }catch(error){

            console.log(error);

            alert(

              "Payment Verification Failed"

            );

          }

        },

        modal: {

          ondismiss: function () {

            alert(
              "Payment popup closed"
            );

          }

        },

        prefill: {

          name:
          `${formData.firstName} ${formData.lastName}`,

          email:
          formData.email,

          contact:
          formData.mobile

        },

        theme:{
          color:"#0f172a"
        }

      };

      /* OPEN RAZORPAY */

      const rzp =
      new window.Razorpay(
        options
      );

      rzp.open();

    }catch(error){

      console.log(error);

      console.log(
        error.response
      );

      alert(
        "Submission Failed"
      );

    }finally{

      setLoading(false);

    }

  };

  return(

    <div className="application-page">

      <Navbar />

      <div className="application-container">

        <h1>
          Maharashtra Setu Application
        </h1>

        <p>
          Estimated Processing Time:
          20-25 Working Days
        </p>

        <div className="fee-box">

          Service Charges:
          ₹105 (Including GST)

        </div>

        <div className="service-name-box">

          Applying For:
          {selectedService}

        </div>

        <form onSubmit={handleSubmit}>

          {/* NAMES */}

          <div className="form-grid">

            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
              required
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
              required
            />

            <input
              type="text"
              name="firstNameMarathi"
              placeholder="First Name Marathi"
              onChange={handleChange}
            />

            <input
              type="text"
              name="middleNameMarathi"
              placeholder="Middle Name Marathi"
              onChange={handleChange}
            />

            <input
              type="text"
              name="lastNameMarathi"
              placeholder="Last Name Marathi"
              onChange={handleChange}
            />

            <input
              type="text"
              name="fatherName"
              placeholder="Father Name"
              onChange={handleChange}
            />

            <input
              type="text"
              name="motherName"
              placeholder="Mother Name"
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

          </div>

          {/* ADDRESS */}

          <textarea
            name="address"
            placeholder="Address"
            onChange={handleChange}
          />

          <div className="form-grid">

            <input
              type="text"
              name="taluka"
              placeholder="Taluka"
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
              name="state"
              placeholder="State"
              onChange={handleChange}
            />

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              onChange={handleChange}
            />

          </div>

          {/* AUTO FETCHED */}

          <div className="form-grid">

            <input
              type="email"
              value={formData.email}
              readOnly
            />

            <input
              type="text"
              value={formData.mobile}
              readOnly
            />

          </div>

          {/* REASON */}

          <textarea
            name="reason"
            placeholder="Reason For Application"
            onChange={handleChange}
          />

          {/* FILE UPLOADS */}

          <div className="upload-section">

            <label>
              Aadhaar Card PDF
            </label>

            <input
              type="file"
              name="aadhaarCard"
              accept=".pdf"
              onChange={handleFile}
            />

            <label>
              PAN Card PDF
            </label>

            <input
              type="file"
              name="panCard"
              accept=".pdf"
              onChange={handleFile}
            />

            <label>
              Passport PDF
            </label>

            <input
              type="file"
              name="passport"
              accept=".pdf"
              onChange={handleFile}
            />

            <label>
              Self Declaration PDF
            </label>

            <input
              type="file"
              name="selfDeclaration"
              accept=".pdf"
              onChange={handleFile}
            />

            <label>
              Ration Card PDF
            </label>

            <input
              type="file"
              name="rationCard"
              accept=".pdf"
              onChange={handleFile}
            />

            <label>
              Residence Proof PDF
            </label>

            <input
              type="file"
              name="residenceProof"
              accept=".pdf"
              onChange={handleFile}
            />

          </div>

          {/* DECLARATION */}

          <div className="checkbox-box">

            <input
              type="checkbox"
              checked={agree}
              onChange={()=>
                setAgree(!agree)
              }
            />

            <span>

              I confirm all information
              is correct.

            </span>

          </div>

          {/* SUBMIT */}

          <button
            className="submit-btn"
            type="submit"
            disabled={loading}
          >

            {

              loading

              ?

              "Submitting..."

              :

              "Submit & Pay ₹105"

            }

          </button>

        </form>

      </div>

    </div>

  );

}

export default ApplicationForm;