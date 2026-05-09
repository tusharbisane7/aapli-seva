import "./transportAnalytics.scss";

function TransportAdminAnalytics({

  buses,
  bookings

}) {

  const revenue =
  bookings.reduce(

    (acc,item)=>
    acc + Number(item.amount || 0),

    0

  );

  const seats =
  buses.reduce(

    (acc,item)=>
    acc + Number(item.availableSeats || 0),

    0

  );

  return (

    <div className="analytics-grid">

      <div className="analytics-card">

        <h2>Total Revenue</h2>

        <p>₹{revenue}</p>

      </div>

      <div className="analytics-card">

        <h2>Total Seats</h2>

        <p>{seats}</p>

      </div>

      <div className="analytics-card">

        <h2>Total Buses</h2>

        <p>{buses.length}</p>

      </div>

      <div className="analytics-card">

        <h2>Total Bookings</h2>

        <p>{bookings.length}</p>

      </div>

    </div>

  );

}

export default TransportAdminAnalytics;