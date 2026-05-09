import "./myApplications.scss";

import { useEffect,useState }
from "react";

import axios from "axios";

function MyApplications(){

  const [applications,
  setApplications]

  = useState([]);

  const user = JSON.parse(

    localStorage.getItem("user")

  );

  useEffect(()=>{

    fetchApplications();

  },[]);

  const fetchApplications =
  async()=>{

    try{

      const res =
      await axios.get(

        `https://aapli-seva.onrender.com/api/application/user/${user.id}`

      );

      setApplications(

        res.data.applications

      );

    }catch(error){

      console.log(error);

    }

  };

  return(

    <div className="myapps-page">

      <h1>
        My Applications
      </h1>

      <div className="apps-grid">

        {

          applications.map((app)=>(

            <div
              className="app-card"
              key={app._id}
            >

              <h2>

                {app.serviceName}

              </h2>

              <p>

                Tracking ID:
                {" "}
                {app.trackingId}

              </p>

              <p>

                Status:
                {" "}
                {app.applicationStatus}

              </p>

              <p>

                Payment:
                {" "}
                {app.paymentStatus}

              </p>

            </div>

          ))

        }

      </div>

    </div>

  );

}

export default MyApplications;