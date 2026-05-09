import "./seatLayout.scss";

function SeatLayout({

  totalSeats,
  selectedSeats,
  setSelectedSeats

}) {

  const seats = Array.from(
    { length: totalSeats },
    (_, i) => i + 1
  );

  const toggleSeat = (seat) => {

    if(selectedSeats.includes(seat)) {

      setSelectedSeats(
        selectedSeats.filter(
          (s)=>s !== seat
        )
      );

    } else {

      setSelectedSeats([
        ...selectedSeats,
        seat
      ]);

    }

  };

  return (

    <div className="seat-layout">

      {

        seats.map((seat)=>(

          <div
            key={seat}
            className={`seat ${
              selectedSeats.includes(seat)
              ? "selected"
              : ""
            }`}
            onClick={()=>toggleSeat(seat)}
          >

            {seat}

          </div>

        ))

      }

    </div>

  );

}

export default SeatLayout;