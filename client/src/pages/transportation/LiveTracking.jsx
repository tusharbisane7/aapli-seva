import { useParams } from "react-router-dom";

function LiveTracking() {

  const { id } = useParams();

  return (

    <div
      style={{
        padding: "30px",
        minHeight: "100vh",
        background: "#f5f7fb"
      }}
    >

      <h1
        style={{
          marginBottom: "20px"
        }}
      >
        Live Bus Tracking
      </h1>

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
        }}
      >

        <h2>
          Bus ID: {id}
        </h2>

        <p>
          Real-time tracking will appear here.
        </p>

        <div
          style={{
            marginTop: "20px",
            height: "400px",
            borderRadius: "10px",
            background: "#ddd",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            fontWeight: "bold"
          }}
        >

          Google Map Integration Here

        </div>

      </div>

    </div>

  );

}

export default LiveTracking;