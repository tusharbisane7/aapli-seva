import "./adminApplications.scss";

import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import { Link } from "react-router-dom";

function AdminApplications(){

  const [
    applications,
    setApplications
  ] = useState([]);

  /* FETCH */

  useEffect(()=>{

    fetchApplications();

  },[]);

  const fetchApplications =
  async()=>{

    try{

      const res =
      await axios.get(

        "http://localhost:5000/api/application/all"

      );

      /* FIX */

      setApplications(res.data);

    }catch(error){

      console.log(error);

    }

  };

  return(

    <div className="adminapps-page">

      <h1 className="adminapps-title">

        All Applications

      </h1>

      <div className="admin-table">

        <table>

          <thead>

            <tr>

              <th>Name</th>

              <th>Service</th>

              <th>Tracking ID</th>

              <th>Status</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {

              applications?.length > 0

              ? (

                applications.map((app)=>(

                  <tr key={app._id}>

                    <td>

                      {app.firstName}
                      {" "}
                      {app.lastName}

                    </td>

                    <td>

                      {app.serviceName}

                    </td>

                    <td>

                      {app.trackingId}

                    </td>

                    <td>

                      {app.applicationStatus}

                    </td>

                    <td>

                      <Link

                        to={`/view-application/${app.trackingId}`}

                        className="view-btn"

                      >

                        View

                      </Link>

                    </td>

                  </tr>

                ))

              )

              : (

                <tr>

                  <td
                    colSpan="5"
                    style={{

                      textAlign:"center",
                      color:"white",
                      padding:"25px"

                    }}

                  >

                    No Applications Found

                  </td>

                </tr>

              )

            }

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default AdminApplications;