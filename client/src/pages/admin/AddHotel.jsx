import "./addHotel.scss";

import {
  useState
} from "react";

import axios from "axios";

function AddHotel(){

  const [hotelData,setHotelData]
  = useState({

    hotelName:"",

    hotelAddress:"",

    hotelLicenseNo:"",

    hotelContact:"",

    hotelDescription:"",

    image1:"",

    image2:"",

    image3:"",

    image4:"",

    image5:"",

    wifi:false,

    parking:false,

    tv:false,

    garden:false,

    beds:1,

    roomsAvailable:1,

    pricePerNight:""

  });

  /* Handle Inputs */

  const handleChange = (e) => {

    const {

      name,
      value,
      type,
      checked

    } = e.target;

    setHotelData({

      ...hotelData,

      [name]:

      type === "checkbox"

      ? checked

      : value

    });

  };

  /* Add Hotel */

  const addHotel = async(e) => {

    e.preventDefault();

    try{

      const payload = {

        hotelName:
        hotelData.hotelName,

        hotelAddress:
        hotelData.hotelAddress,

        hotelLicenseNo:
        hotelData.hotelLicenseNo,

        hotelContact:
        hotelData.hotelContact,

        hotelDescription:
        hotelData.hotelDescription,

        hotelImages:[

          hotelData.image1,

          hotelData.image2,

          hotelData.image3,

          hotelData.image4,

          hotelData.image5

        ],

        wifi:
        hotelData.wifi,

        parking:
        hotelData.parking,

        tv:
        hotelData.tv,

        garden:
        hotelData.garden,

        beds:
        hotelData.beds,

        roomsAvailable:
        hotelData.roomsAvailable,

        pricePerNight:
        hotelData.pricePerNight

      };

      await axios.post(

        "https://aapli-seva.onrender.com/api/hotels/add",

        payload

      );

      alert(
        "Hotel Added Successfully"
      );

      window.location.reload();

    }catch(error){

      console.log(error);

      alert("Failed To Add Hotel");

    }

  };

  return(

    <div className="add-hotel-page">

      <div className="add-hotel-container">

        <h1>
          Add Hotel
        </h1>

        <form onSubmit={addHotel}>

          <input
            type="text"
            name="hotelName"
            placeholder="Hotel Name"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="hotelAddress"
            placeholder="Hotel Address"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="hotelLicenseNo"
            placeholder="License Number"
            onChange={handleChange}
          />

          <input
            type="text"
            name="hotelContact"
            placeholder="Hotel Contact"
            onChange={handleChange}
          />

          <textarea
            name="hotelDescription"
            placeholder="Hotel Description"
            onChange={handleChange}
          />

          {/* Images */}

          <input
            type="text"
            name="image1"
            placeholder="Image URL 1"
            onChange={handleChange}
          />

          <input
            type="text"
            name="image2"
            placeholder="Image URL 2"
            onChange={handleChange}
          />

          <input
            type="text"
            name="image3"
            placeholder="Image URL 3"
            onChange={handleChange}
          />

          <input
            type="text"
            name="image4"
            placeholder="Image URL 4"
            onChange={handleChange}
          />

          <input
            type="text"
            name="image5"
            placeholder="Image URL 5"
            onChange={handleChange}
          />

          {/* Facilities */}

          <div className="facility-grid">

            <label>

              <input
                type="checkbox"
                name="wifi"
                onChange={handleChange}
              />

              WiFi

            </label>

            <label>

              <input
                type="checkbox"
                name="parking"
                onChange={handleChange}
              />

              Parking

            </label>

            <label>

              <input
                type="checkbox"
                name="tv"
                onChange={handleChange}
              />

              TV

            </label>

            <label>

              <input
                type="checkbox"
                name="garden"
                onChange={handleChange}
              />

              Garden

            </label>

          </div>

          {/* Room Info */}

          <input
            type="number"
            name="beds"
            placeholder="Beds"
            onChange={handleChange}
          />

          <input
            type="number"
            name="roomsAvailable"
            placeholder="Rooms Available"
            onChange={handleChange}
          />

          <input
            type="number"
            name="pricePerNight"
            placeholder="Price Per Night"
            onChange={handleChange}
          />

          <button type="submit">

            Add Hotel

          </button>

        </form>

      </div>

    </div>

  );

}

export default AddHotel;