import "./tracking.scss";

import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  FaSearch,
  FaClipboardCheck
} from "react-icons/fa";

import Navbar from "../../components/navbar/Navbar";

function TrackingPage(){

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [applications,setApplications]
  = useState([]);

  const [trackingId,setTrackingId]
  = useState("");

  const [searchedApplication,
  setSearchedApplication]

  = useState(null);

  /* FETCH USER APPLICATIONS */

  useEffect(()=>{

    fetchApplications();

  },[]);

  const fetchApplications =
  async() => {

    try{

      const res =
      await axios.get(

        `https://aapli-seva.onrender.com/api/application/user/${user?._id || user?.id}`

      );

      setApplications(

        res.data.applications

      );

    }catch(error){

      console.log(error);

    }

  };

  /* SEARCH APPLICATION */

  const searchTracking =
  async() => {

    if(!trackingId){

      alert(
        "Enter Tracking ID"
      );

      return;

    }

    try{

      const res =
      await axios.get(

        `https://aapli-seva.onrender.com/api/application/track/${trackingId}`

      );

      setSearchedApplication(

        res.data.application

      );

    }catch(error){

      console.log(error);

      alert(
        "Application Not Found"
      );

      setSearchedApplication(
        null
      );

    }

  };

  return(

    <div className="tracking-page">

      <Navbar />

      <div className="tracking-container">

        {/* HEADER */}

        <div className="tracking-header">

          <h1>

            Application Tracking
            & History

          </h1>

          <p>

            Track your application
            status and view your
            submitted application
            history.

          </p>

        </div>

        {/* SEARCH */}

        <div className="tracking-search-box">

          <div className="tracking-input">

            <FaSearch />

            <input

              type="text"

              placeholder="Enter Tracking ID"

              value={trackingId}

              onChange={(e)=>

                setTrackingId(
                  e.target.value
                )

              }

            />

          </div>

          <button
            onClick={searchTracking}
          >

            Track Application

          </button>

        </div>

        {/* TRACKING RESULT */}

        {

          searchedApplication && (

            <div className="tracking-result-card">

              <div className="result-top">

                <FaClipboardCheck />

                <h2>

                  Tracking Result

                </h2>

              </div>

              <p>

                <strong>
                  Service:
                </strong>

                {" "}

                {

                  searchedApplication
                  .serviceName

                }

              </p>

              <p>

                <strong>
                  Tracking ID:
                </strong>

                {" "}

                {

                  searchedApplication
                  .trackingId

                }

              </p>

              <p>

                <strong>
                  Applicant:
                </strong>

                {" "}

                {

                  searchedApplication
                  .firstName

                }

                {" "}

                {

                  searchedApplication
                  .lastName

                }

              </p>

              <p>

                <strong>
                  Payment:
                </strong>

                {" "}

                {

                  searchedApplication
                  .paymentStatus

                }

              </p>

              <p>

                <strong>
                  Officer Remarks:
                </strong>

                {" "}

                {

                  searchedApplication
                  .remarks

                  ? searchedApplication
                    .remarks

                  : "No Remarks Yet"

                }

              </p>

              <p>

                <strong>
                  Approved By:
                </strong>

                {" "}

                {

                  searchedApplication
                  .approvedBy

                  ? searchedApplication
                    .approvedBy

                  : "Pending"

                }

              </p>

              <h3>

                Status:
                {" "}

                <span>

                  {

                    searchedApplication
                    .applicationStatus

                  }

                </span>

              </h3>

              {

                searchedApplication
                .approvedDocument && (

                  <a

                    href={

                      `https://aapli-seva.onrender.com/uploads/${searchedApplication.approvedDocument}`

                    }

                    target="_blank"

                    rel="noreferrer"

                    className="view-doc-btn"

                  >

                    View Approved Document

                  </a>

                )

              }

            </div>

          )

        }

        {/* HISTORY */}

        <div className="history-heading">

          <h2>

            My Application History

          </h2>

        </div>

        <div className="tracking-grid">

          {

            applications.length > 0 ? (

              applications.map((item,index)=>(

                <div
                  className="tracking-card"
                  key={index}
                >

                  <h2>

                    {item.serviceName}

                  </h2>

                  <p>

                    <strong>
                      Tracking ID:
                    </strong>

                    {" "}

                    {item.trackingId}

                  </p>

                  <p>

                    <strong>
                      Applicant:
                    </strong>

                    {" "}

                    {item.firstName}
                    {" "}
                    {item.lastName}

                  </p>

                  <p>

                    <strong>
                      Payment:
                    </strong>

                    {" "}

                    {item.paymentStatus}

                  </p>

                  <p>

                    <strong>
                      Officer Remarks:
                    </strong>

                    {" "}

                    {

                      item.remarks

                      ? item.remarks

                      : "No Remarks Yet"

                    }

                  </p>

                  <p>

                    <strong>
                      Approved By:
                    </strong>

                    {" "}

                    {

                      item.approvedBy

                      ? item.approvedBy

                      : "Pending"

                    }

                  </p>

                  <p>

                    <strong>
                      Applied Date:
                    </strong>

                    {" "}

                    {

                      new Date(

                        item.createdAt

                      ).toLocaleDateString()

                    }

                  </p>

                  <h3>

                    Status:
                    {" "}

                    <span>

                      {

                        item
                        .applicationStatus

                      }

                    </span>

                  </h3>

                  {

                    item.approvedDocument && (

                      <a

                        href={

                          `https://aapli-seva.onrender.com/uploads/${item.approvedDocument}`

                        }

                        target="_blank"

                        rel="noreferrer"

                        className="view-doc-btn"

                      >

                        View Approved Document

                      </a>

                    )

                  }

                </div>

              ))

            ) : (

              <div className="no-data">

                No Applications Found

              </div>

            )

          }

        </div>

      </div>

    </div>

  );

}

export default TrackingPage;