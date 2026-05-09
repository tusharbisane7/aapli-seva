import "./trackBus.scss";

import {

  useParams

} from "react-router-dom";

function TrackBus(){

  const { id } = useParams();

  return(

    <div className="track-bus-page">

      <div className="track-box">

        <h1>
          Live Bus Tracking
        </h1>

        <h2>

          Tracking ID:
          {" "}

          #{id}

        </h2>

        <div className="live-status">

          <span className="pulse"></span>

          Bus Running Live

        </div>

        <div className="tracking-map">

          <iframe

            title="map"

            src="https://maps.google.com/maps?q=Nagpur&t=&z=13&ie=UTF8&iwloc=&output=embed"

            width="100%"

            height="300"

            style={{
              border:0,
              borderRadius:"14px"
            }}

            loading="lazy"

          />

        </div>

        <div className="tracking-details">

          <p>

            Current Location:
            Nagpur Highway

          </p>

          <p>

            Next Stop:
            Amravati

          </p>

          <p>

            Estimated Arrival:
            45 Minutes

          </p>

          <p>

            Speed:
            72 KM/H

          </p>

        </div>

      </div>

    </div>

  );

}

export default TrackBus;