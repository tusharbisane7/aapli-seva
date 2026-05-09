import "./viewApplication.scss";

import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  useParams
} from "react-router-dom";

import {

  FaUser,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFilePdf,
  FaIdCard,
  FaEnvelope,
  FaCheckCircle

} from "react-icons/fa";

function ViewApplication(){

  const { trackingId }
  = useParams();

  const [application,
  setApplication]

  = useState(null);

  /* FETCH */

  useEffect(()=>{

    fetchApplication();

  },[]);

  const fetchApplication =
  async()=>{

    try{

      const res =
      await axios.get(

        `http://localhost:5000/api/application/track/${trackingId}`

      );

      setApplication(
        res.data
      );

    }catch(error){

      console.log(error);

    }

  };

  /* LOADING */

  if(!application){

    return(

      <div className="viewapp-loading">

        Loading...

      </div>

    );

  }

  /* DOCUMENT URL */

  const docUrl = (file)=>{

    return `http://localhost:5000/uploads/${file}`;

  };

  return(

    <div className="viewapp-page">

      <div className="view-card">

        {/* HEADER */}

        <div className="view-header">

          <h1>

            Application Details

          </h1>

          <span>

            {application.applicationStatus}

          </span>

        </div>

        {/* USER DETAILS */}

        <div className="view-grid">

          <div className="view-box">

            <FaUser />

            <div>

              <h3>

                Applicant Name

              </h3>

              <p>

                {application.firstName}
                {" "}
                {application.middleName}
                {" "}
                {application.lastName}

              </p>

            </div>

          </div>

          <div className="view-box">

            <FaPhoneAlt />

            <div>

              <h3>

                Mobile Number

              </h3>

              <p>

                {application.mobile}

              </p>

            </div>

          </div>

          <div className="view-box">

            <FaEnvelope />

            <div>

              <h3>

                Email

              </h3>

              <p>

                {application.email || "N/A"}

              </p>

            </div>

          </div>

          <div className="view-box">

            <FaIdCard />

            <div>

              <h3>

                Tracking ID

              </h3>

              <p>

                {application.trackingId}

              </p>

            </div>

          </div>

          <div className="view-box full-width">

            <FaMapMarkerAlt />

            <div>

              <h3>

                Address

              </h3>

              <p>

                {application.address},
                {" "}
                {application.taluka},
                {" "}
                {application.district},
                {" "}
                {application.state}

              </p>

            </div>

          </div>

          <div className="view-box">

            <FaCheckCircle />

            <div>

              <h3>

                Service

              </h3>

              <p>

                {application.serviceName}

              </p>

            </div>

          </div>

          <div className="view-box">

            <FaCheckCircle />

            <div>

              <h3>

                Payment Status

              </h3>

              <p>

                {application.paymentStatus}

              </p>

            </div>

          </div>

        </div>

        {/* DOCUMENTS */}

        <div className="documents-section">

          <h2>

            Uploaded Documents

          </h2>

          <div className="documents-grid">

            {

              application.aadhaarCard && (

                <a

                  href={docUrl(
                    application.aadhaarCard
                  )}

                  target="_blank"

                  rel="noreferrer"

                  className="doc-card"

                >

                  <FaFilePdf />

                  Aadhaar Card

                </a>

              )

            }

            {

              application.panCard && (

                <a

                  href={docUrl(
                    application.panCard
                  )}

                  target="_blank"

                  rel="noreferrer"

                  className="doc-card"

                >

                  <FaFilePdf />

                  PAN Card

                </a>

              )

            }

            {

              application.passport && (

                <a

                  href={docUrl(
                    application.passport
                  )}

                  target="_blank"

                  rel="noreferrer"

                  className="doc-card"

                >

                  <FaFilePdf />

                  Passport

                </a>

              )

            }

            {

              application.selfDeclaration && (

                <a

                  href={docUrl(
                    application.selfDeclaration
                  )}

                  target="_blank"

                  rel="noreferrer"

                  className="doc-card"

                >

                  <FaFilePdf />

                  Self Declaration

                </a>

              )

            }

            {

              application.rationCard && (

                <a

                  href={docUrl(
                    application.rationCard
                  )}

                  target="_blank"

                  rel="noreferrer"

                  className="doc-card"

                >

                  <FaFilePdf />

                  Ration Card

                </a>

              )

            }

            {

              application.residenceProof && (

                <a

                  href={docUrl(
                    application.residenceProof
                  )}

                  target="_blank"

                  rel="noreferrer"

                  className="doc-card"

                >

                  <FaFilePdf />

                  Residence Proof

                </a>

              )

            }

          </div>

        </div>

        {/* TIMELINE */}

        <div className="timeline-section">

          <h2>

            Application Timeline

          </h2>

          {

            application.tracking?.map(

              (item,index)=>(

                <div
                  className="timeline-item"
                  key={index}
                >

                  <div className="timeline-dot"></div>

                  <div>

                    <h4>

                      {item.status}

                    </h4>

                    <p>

                      {item.date}

                    </p>

                  </div>

                </div>

              )

            )

          }

        </div>

      </div>

    </div>

  );

}

export default ViewApplication;