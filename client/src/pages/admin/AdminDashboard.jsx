import "./admin.scss";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUsers, FaFileAlt, FaSearch, FaTrash, FaHotel, FaPlus, FaClipboardList,
  FaHome, FaCommentDots, FaStar, FaBus, FaBars, FaTimes, FaPhoneAlt,
  FaMapMarkerAlt, FaRoad, FaCalendarAlt, FaClock, FaChair, FaMoneyBillWave,
  FaCalendarCheck, FaGlobeAsia, FaNewspaper
} from "react-icons/fa";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  /* ========================= UI STATES ========================= */
  const [activeSection, setActiveSection] = useState("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  /* ========================= DATA STATES ========================= */
  const [stats, setStats] = useState({ totalUsers: 0 });
  const [applications, setApplications] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [transportBookings, setTransportBookings] = useState([]);
  const [availableBuses, setAvailableBuses] = useState([]);

  const [events, setEvents] = useState([]);
  const [explorePlaces, setExplorePlaces] = useState([]);
  const [tickerNews, setTickerNews] = useState("");

  /* ========================= FORMS ========================= */
  const defaultStops = Array.from({ length: 6 }, () => ({
    stopName: "", arrivalTime: "", fare: ""
  }));

  const [busForm, setBusForm] = useState({
    busNumber: "", busName: "", busType: "", busCategory: "Government",
    from: "", to: "", departureTime: "", arrivalTime: "", price: "",
    availableSeats: "", operator: "", contact: "", amenities: "",
    stops: defaultStops,
  });
  const [editBusId, setEditBusId] = useState(null);

  const [hotelForm, setHotelForm] = useState({
    hotelName: "", hotelAddress: "", hotelType: "", price: "", rating: "",
    description: "", thumbnail: "", image1: "", image2: "", image3: "",
    image4: "", image5: "", image6: ""
  });
  const [editHotelId, setEditHotelId] = useState(null);

  const [eventForm, setEventForm] = useState({
    title: "", location: "", date: "", time: "", thumbnail: "", description: "",
    image1: "", image2: "", image3: "", image4: "", image5: "", image6: ""
  });

  const [exploreForm, setExploreForm] = useState({
    title: "", location: "", rating: "", thumbnail: "", description: "",
    image1: "", image2: "", image3: "", image4: "", image5: "", image6: ""
  });

  /* ========================= FETCH ALL ========================= */
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = () => {
    fetchStats();
    fetchApplications();
    fetchHotels();
    fetchBookings();
    fetchReviews();
    fetchTransportBookings();
    fetchBuses();
    fetchEvents();
    fetchExplorePlaces();
    fetchTicker();
  };

  /* ========================= FETCH FUNCTIONS ========================= */
  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/admin/stats");
      setStats(res.data);
    } catch (error) { console.log(error); }
  };

  const fetchApplications = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/application/all");
      setApplications(Array.isArray(res.data) ? res.data : res.data.applications || []);
    } catch (error) { console.log(error); }
  };

  const fetchHotels = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/hotels/all");
      setHotels(Array.isArray(res.data) ? res.data : res.data.hotels || []);
    } catch (error) { console.log(error); }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bookings/all");
      setBookings(Array.isArray(res.data) ? res.data : res.data.bookings || []);
    } catch (error) { console.log(error); }
  };

  const fetchReviews = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/reviews");
      setReviews(res.data.reviews || []);
    } catch (error) { console.log(error); }
  };

 const fetchTransportBookings = async () => {

  try {

    const res = await axios.get(

      "http://localhost:5000/api/transport-bookings/all"

    );

    setTransportBookings(

      Array.isArray(
        res.data.bookings
      )

      ?

      res.data.bookings

      :

      []

    );

  } catch (error) {

    console.log(error);

  }

};

  const fetchBuses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/transport/all");
      setAvailableBuses(res.data.buses || []);
    } catch (error) { console.log(error); }
  };

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/events/all");
      setEvents(res.data.events || []);
    } catch (error) { console.log(error); }
  };

  const fetchExplorePlaces = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/explore/all");
      setExplorePlaces(res.data.places || []);
    } catch (error) { console.log(error); }
  };

  const fetchTicker = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/ticker/latest");
      setTickerNews(res.data.news || "");
    } catch (error) { console.log(error); }
  };

/* =========================
   HOTEL HANDLERS
========================= */

const addHotel = async () => {

  try {

    const payload = {

      hotelName:
      hotelForm.hotelName,

      hotelAddress:
      hotelForm.hotelAddress,

      hotelLicenseNo:
      hotelForm.hotelLicenseNo,

      hotelContact:
      hotelForm.hotelContact,

      hotelDescription:
      hotelForm.hotelDescription,

      pricePerNight:
      Number(hotelForm.pricePerNight),

      roomsAvailable:
      Number(hotelForm.roomsAvailable),

      beds:
      Number(hotelForm.beds),

      wifi:
      hotelForm.wifi,

      parking:
      hotelForm.parking,

      tv:
      hotelForm.tv,

      garden:
      hotelForm.garden,

      hotelImages:[

        hotelForm.image1,
        hotelForm.image2,
        hotelForm.image3,
        hotelForm.image4,
        hotelForm.image5,
        hotelForm.image6

      ].filter(Boolean)

    };

    await axios.post(

      "http://localhost:5000/api/hotels/add",

      payload

    );

    alert("✅ Hotel Added Successfully!");

    fetchHotels();

    resetHotelForm();

  } catch (error) {

    console.log(error);

    alert("❌ Failed to add hotel");

  }

};

const updateHotel = async () => {

  try {

    const payload = {

      hotelName:
      hotelForm.hotelName,

      hotelAddress:
      hotelForm.hotelAddress,

      hotelLicenseNo:
      hotelForm.hotelLicenseNo,

      hotelContact:
      hotelForm.hotelContact,

      hotelDescription:
      hotelForm.hotelDescription,

      pricePerNight:
      Number(hotelForm.pricePerNight),

      roomsAvailable:
      Number(hotelForm.roomsAvailable),

      beds:
      Number(hotelForm.beds),

      wifi:
      hotelForm.wifi,

      parking:
      hotelForm.parking,

      tv:
      hotelForm.tv,

      garden:
      hotelForm.garden,

      hotelImages:[

        hotelForm.image1,
        hotelForm.image2,
        hotelForm.image3,
        hotelForm.image4,
        hotelForm.image5,
        hotelForm.image6

      ].filter(Boolean)

    };

    await axios.put(

      `http://localhost:5000/api/hotels/update/${editHotelId}`,

      payload

    );

    alert("✅ Hotel Updated Successfully!");

    fetchHotels();

    resetHotelForm();

  } catch (error) {

    console.log(error);

    alert("❌ Failed to update hotel");

  }

};

const deleteHotel = async (id) => {

  if (!window.confirm("Delete this hotel?")) return;

  try {

    await axios.delete(

      `http://localhost:5000/api/hotels/delete/${id}`

    );

    fetchHotels();

  } catch (error) {

    console.log(error);

  }

};

const resetHotelForm = () => {

  setHotelForm({

    hotelName:"",
    hotelAddress:"",
    hotelLicenseNo:"",
    hotelContact:"",
    hotelDescription:"",

    pricePerNight:"",
    roomsAvailable:"",
    beds:"",

    wifi:false,
    parking:false,
    tv:false,
    garden:false,

    image1:"",
    image2:"",
    image3:"",
    image4:"",
    image5:"",
    image6:""

  });

  setEditHotelId(null);

};

const editHotel = (hotel) => {

  setEditHotelId(hotel._id);

  setHotelForm({

    hotelName:
    hotel.hotelName || "",

    hotelAddress:
    hotel.hotelAddress || "",

    hotelLicenseNo:
    hotel.hotelLicenseNo || "",

    hotelContact:
    hotel.hotelContact || "",

    hotelDescription:
    hotel.hotelDescription || "",

    pricePerNight:
    hotel.pricePerNight || "",

    roomsAvailable:
    hotel.roomsAvailable || "",

    beds:
    hotel.beds || "",

    wifi:
    hotel.wifi || false,

    parking:
    hotel.parking || false,

    tv:
    hotel.tv || false,

    garden:
    hotel.garden || false,

    image1:
    hotel?.hotelImages?.[0] || "",

    image2:
    hotel?.hotelImages?.[1] || "",

    image3:
    hotel?.hotelImages?.[2] || "",

    image4:
    hotel?.hotelImages?.[3] || "",

    image5:
    hotel?.hotelImages?.[4] || "",

    image6:
    hotel?.hotelImages?.[5] || ""

  });

};

  /* ========================= OTHER HANDLERS ========================= */
  const handleStopChange = (index, field, value) => {
    const updatedStops = [...busForm.stops];
    updatedStops[index][field] = value;
    setBusForm({ ...busForm, stops: updatedStops });
  };

  const handleAddBus = async (e) => {
    e.preventDefault();
    const payload = {
      ...busForm,
      amenities: busForm.amenities ? busForm.amenities.split(",").map(item => item.trim()).filter(Boolean) : [],
    };
    try {
      if (editBusId) {
        await axios.put(`http://localhost:5000/api/transport/update/${editBusId}`, payload);
        alert("✅ Bus Updated!");
      } else {
        await axios.post("http://localhost:5000/api/transport/add", payload);
        alert("✅ Bus Added!");
      }
      setEditBusId(null);
      setBusForm({ ...busForm, stops: defaultStops, amenities: "" });
      fetchBuses();
    } catch (error) {
      console.log(error);
      alert("❌ Operation Failed");
    }
  };

  const addEvent = async () => {
    try {
      await axios.post("http://localhost:5000/api/events/add", eventForm);
      alert("✅ Event Added!");
      fetchEvents();
      setEventForm({ title: "", location: "", date: "", time: "", thumbnail: "", description: "", image1: "", image2: "", image3: "", image4: "", image5: "", image6: "" });
    } catch (error) {
      console.log(error);
      alert("❌ Failed to add event");
    }
  };

  const deleteEvent = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/events/delete/${id}`);
      fetchEvents();
    } catch (error) { console.log(error); }
  };

  const addExplorePlace = async () => {
    try {
      await axios.post("http://localhost:5000/api/explore/add", exploreForm);
      alert("✅ Place Added!");
      fetchExplorePlaces();
      setExploreForm({ title: "", location: "", rating: "", thumbnail: "", description: "", image1: "", image2: "", image3: "", image4: "", image5: "", image6: "" });
    } catch (error) {
      console.log(error);
      alert("❌ Failed to add place");
    }
  };

  const deleteExplorePlace = async (id) => {
    if (!window.confirm("Delete this place?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/explore/delete/${id}`);
      fetchExplorePlaces();
    } catch (error) { console.log(error); }
  };

  const updateTicker = async () => {
    try {
      await axios.put("http://localhost:5000/api/ticker/update", { news: tickerNews });
      alert("✅ Ticker Updated!");
      fetchTicker();
    } catch (error) {
      console.log(error);
      alert("❌ Failed to update ticker");
    }
  };

  const updateBookingStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/bookings/admin/update/${id}`, { bookingStatus: status });
      fetchTransportBookings();
    } catch (error) { console.log(error); }
  };

  const deleteReview = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/reviews/delete/${id}`);
      fetchReviews();
    } catch (error) { console.log(error); }
  };

  const updateApplication = async (trackingId, status, remarks, file) => {
    try {
      const data = new FormData();
      data.append("status", status);
      data.append("remarks", remarks);
      data.append("approvedBy", `${user?.firstName} ${user?.lastName}`);
      if (file) data.append("approvedDocument", file);
      await axios.put(`http://localhost:5000/api/application/admin/update/${trackingId}`, data);
      fetchApplications();
    } catch (error) { console.log(error); }
  };

  const deleteApplication = async (trackingId) => {
    try {
      await axios.delete(`http://localhost:5000/api/application/delete/${trackingId}`);
      fetchApplications();
    } catch (error) { console.log(error); }
  };

  const deleteTransport = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/transport/delete/${id}`);
      fetchBuses();
    } catch (error) { console.log(error); }
  };

  /* ========================= FILTERS ========================= */
  const filteredApplications = applications.filter((item) =>
    item?.trackingId?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredBuses = availableBuses.filter((bus) =>
    (bus.busName || "").toLowerCase().includes(search.toLowerCase()) ||
    (bus.busNumber || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-dashboard">
      <div className="admin-topbar">
        <div className="top-left">
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
          <h1>Smart City Admin</h1>
        </div>
      </div>

      <div className="admin-layout">
        <div className={`admin-sidebar ${menuOpen ? "open" : ""}`}>
          <ul>
            <li onClick={() => setActiveSection("dashboard")}><FaUsers /> Dashboard</li>
            <li onClick={() => setActiveSection("applications")}><FaClipboardList /> Applications</li>
            <li onClick={() => setActiveSection("transport")}><FaBus /> Transport</li>
            <li onClick={() => setActiveSection("user-bookings")}><FaChair /> User Bookings</li>
            <li onClick={() => setActiveSection("hotels")}><FaHotel /> Hotels</li>
            <li onClick={() => setActiveSection("bookings")}><FaFileAlt /> Bookings</li>
            <li onClick={() => setActiveSection("reviews")}><FaCommentDots /> Reviews</li>
            <li onClick={() => setActiveSection("events")}><FaCalendarCheck /> Events</li>
            <li onClick={() => setActiveSection("explore")}><FaGlobeAsia /> Explore Places</li>
            <li onClick={() => setActiveSection("ticker")}><FaNewspaper /> News Ticker</li>
          </ul>
        </div>

        <div className="admin-main">
          {/* DASHBOARD */}
          {activeSection === "dashboard" && (
            <div className="admin-cards">
              <div className="admin-card"><FaUsers /><h2>Users</h2><p>{stats.totalUsers}</p></div>
              <div className="admin-card"><FaClipboardList /><h2>Applications</h2><p>{applications.length}</p></div>
              <div className="admin-card"><FaHotel /><h2>Hotels</h2><p>{hotels.length}</p></div>
              <div className="admin-card"><FaFileAlt /><h2>Bookings</h2><p>{bookings.length}</p></div>
              <div className="admin-card"><FaCommentDots /><h2>Reviews</h2><p>{reviews.length}</p></div>
              <div className="admin-card"><FaBus /><h2>Buses</h2><p>{availableBuses.length}</p></div>
            </div>
          )}

          {/* APPLICATIONS */}
          {activeSection === "applications" && (
            <>
              <div className="search-bar">
                <FaSearch />
                <input type="text" placeholder="Search Tracking ID" onChange={(e) => setSearch(e.target.value)} />
              </div>
              <div className="applications-wrapper">
                {filteredApplications.length > 0 ? (
                  filteredApplications.map((item, index) => (
                    <ApplicationCard key={index} item={item} updateApplication={updateApplication} deleteApplication={deleteApplication} />
                  ))
                ) : <p className="no-data">No Applications Found</p>}
              </div>
            </>
          )}

          {/* TRANSPORT */}
          {activeSection === "transport" && (
            <div className="transport-mgmt">
              <div className="transport-header">
                <h1>Transport Management</h1>
                <p>Add / Edit Bus Routes with Stops & Amenities</p>
              </div>

              <div className="application-card transport-form">
                <h2>{editBusId ? "Update Bus Route" : "Add New Bus Route"}</h2>
                <form className="form-grid" onSubmit={handleAddBus}>
                  <input type="text" placeholder="Bus Number" required value={busForm.busNumber} onChange={(e) => setBusForm({ ...busForm, busNumber: e.target.value })} />
                  <input type="text" placeholder="Bus Name" required value={busForm.busName} onChange={(e) => setBusForm({ ...busForm, busName: e.target.value })} />
                  <select value={busForm.busCategory} onChange={(e) => setBusForm({ ...busForm, busCategory: e.target.value })}>
                    <option value="Government">Government</option>
                    <option value="Private">Private</option>
                  </select>
                  <input type="text" placeholder="From" required value={busForm.from} onChange={(e) => setBusForm({ ...busForm, from: e.target.value })} />
                  <input type="text" placeholder="To" required value={busForm.to} onChange={(e) => setBusForm({ ...busForm, to: e.target.value })} />
                  <input type="text" placeholder="Departure Time" value={busForm.departureTime} onChange={(e) => setBusForm({ ...busForm, departureTime: e.target.value })} />
                  <input type="number" placeholder="Price (₹)" required value={busForm.price} onChange={(e) => setBusForm({ ...busForm, price: e.target.value })} />
                  <input type="number" placeholder="Available Seats" required value={busForm.availableSeats} onChange={(e) => setBusForm({ ...busForm, availableSeats: e.target.value })} />
                  <input type="text" placeholder="Amenities" value={busForm.amenities} onChange={(e) => setBusForm({ ...busForm, amenities: e.target.value })} />

                  <div className="stops-wrapper">
                    <h3><FaRoad /> Bus Stops</h3>
                    {busForm.stops.map((stop, index) => (
                      <div className="stop-box" key={index}>
                        <input type="text" placeholder={`Stop ${index + 1}`} value={stop.stopName} onChange={(e) => handleStopChange(index, "stopName", e.target.value)} />
                        <input type="text" placeholder="Arrival Time" value={stop.arrivalTime} onChange={(e) => handleStopChange(index, "arrivalTime", e.target.value)} />
                        <input type="number" placeholder="Fare" value={stop.fare} onChange={(e) => handleStopChange(index, "fare", e.target.value)} />
                      </div>
                    ))}
                  </div>

                  <button type="submit" className="update-btn">
                    <FaPlus /> {editBusId ? "Update Bus" : "Add Bus Route"}
                  </button>
                </form>
              </div>

              <div className="hotel-admin-grid">
                {filteredBuses.map((bus) => (
                  <div className="hotel-admin-card" key={bus._id}>
                    <h2>{bus.busName}</h2>
                    <p><strong>Route:</strong> {bus.from} → {bus.to}</p>
                    <p><strong>Price:</strong> ₹{bus.price}</p>
                    <p><strong>Seats:</strong> {bus.availableSeats}</p>
                    <div className="booking-buttons">
                      <button className="update-btn" onClick={() => handleEditBus(bus)}>Edit</button>
                      <button className="reject-btn" onClick={() => deleteTransport(bus._id)}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

         

{activeSection === "user-bookings" && (

  <div className="transport-bookings">

    <div className="section-title">

      <h2>

        User Bus Bookings
        ({transportBookings.length})

      </h2>

    </div>

    <div className="hotel-bookings-grid">

      {

        transportBookings.length > 0

        ?

        transportBookings.map((b,index)=>(

          <div
            className="booking-admin-card"
            key={index}
          >

            {/* USER DETAILS */}

            <h2>

              {

                b?.fullName
                || "User"

              }

            </h2>

            <p>

              <strong>
                Mobile:
              </strong>

              {

                b?.mobile
                || "N/A"

              }

            </p>

            <p>

              <strong>
                Email:
              </strong>

              {

                b?.email
                || "N/A"

              }

            </p>

            <p>

              <strong>
                Address:
              </strong>

              {

                b?.address
                || "N/A"

              }

            </p>

            {/* BUS DETAILS */}

            <p>

              <strong>
                Bus:
              </strong>

              {

                b?.busName
                || "N/A"

              }

              {" "}

              (

              {

                b?.busNumber
                || "N/A"

              }

              )

            </p>

            <p>

              <strong>
                Route:
              </strong>

              {

                b?.from
                || "N/A"

              }

              {" → "}

              {

                b?.to
                || "N/A"

              }

            </p>

            <p>

              <strong>
                Travel Date:
              </strong>

              {

                b?.travelDate
                || "N/A"

              }

            </p>

            <p>

              <strong>
                Departure:
              </strong>

              {

                b?.departureTime
                || "N/A"

              }

            </p>

            <p>

              <strong>
                Seats:
              </strong>

              {

                b?.seats
                || "0"

              }

            </p>

            <p>

              <strong>
                Amount:
              </strong>

              ₹{

                b?.amount
                || 0

              }

            </p>

            {/* STATUS */}

            <span
              className={`status-badge ${(b?.bookingStatus || "pending").toLowerCase()}`}
            >

              {

                b?.bookingStatus
                || "Pending"

              }

            </span>

            {/* ACTIONS */}

            <div className="booking-buttons">

              <button

                className="approve-btn"

                onClick={()=>

                  updateBookingStatus(

                    b._id,
                    "Confirmed"

                  )

                }

              >

                Confirm

              </button>

              <button

                className="reject-btn"

                onClick={()=>

                  updateBookingStatus(

                    b._id,
                    "Cancelled"

                  )

                }

              >

                Cancel

              </button>

            </div>

          </div>

        ))

        :

        <p className="no-data">

          No User Bookings Found

        </p>

      }

    </div>

  </div>

)}

         {/* HOTELS */}
{activeSection === "hotels" && (

  <div className="admin-section">

    <h2>

      {

        editHotelId

        ? "Update Hotel"

        : "Add New Hotel"

      }

    </h2>

    <div className="form-grid">

      <input
        type="text"
        placeholder="Hotel Name"
        value={hotelForm.hotelName}
        onChange={(e)=>
          setHotelForm({
            ...hotelForm,
            hotelName:e.target.value
          })
        }
      />

      <input
        type="text"
        placeholder="Hotel Address"
        value={hotelForm.hotelAddress}
        onChange={(e)=>
          setHotelForm({
            ...hotelForm,
            hotelAddress:e.target.value
          })
        }
      />

      <input
        type="text"
        placeholder="License Number"
        value={hotelForm.hotelLicenseNo}
        onChange={(e)=>
          setHotelForm({
            ...hotelForm,
            hotelLicenseNo:e.target.value
          })
        }
      />

      <input
        type="text"
        placeholder="Contact Number"
        value={hotelForm.hotelContact}
        onChange={(e)=>
          setHotelForm({
            ...hotelForm,
            hotelContact:e.target.value
          })
        }
      />

      <input
        type="number"
        placeholder="Price Per Night"
        value={hotelForm.pricePerNight}
        onChange={(e)=>
          setHotelForm({
            ...hotelForm,
            pricePerNight:e.target.value
          })
        }
      />

      <input
        type="number"
        placeholder="Rooms Available"
        value={hotelForm.roomsAvailable}
        onChange={(e)=>
          setHotelForm({
            ...hotelForm,
            roomsAvailable:e.target.value
          })
        }
      />

      <input
        type="number"
        placeholder="Beds"
        value={hotelForm.beds}
        onChange={(e)=>
          setHotelForm({
            ...hotelForm,
            beds:e.target.value
          })
        }
      />

      <textarea
        placeholder="Hotel Description"
        value={hotelForm.hotelDescription}
        onChange={(e)=>
          setHotelForm({
            ...hotelForm,
            hotelDescription:e.target.value
          })
        }
      />

      <input
        type="text"
        placeholder="Image URL 1"
        value={hotelForm.image1}
        onChange={(e)=>
          setHotelForm({
            ...hotelForm,
            image1:e.target.value
          })
        }
      />

      <input
        type="text"
        placeholder="Image URL 2"
        value={hotelForm.image2}
        onChange={(e)=>
          setHotelForm({
            ...hotelForm,
            image2:e.target.value
          })
        }
      />

      <input
        type="text"
        placeholder="Image URL 3"
        value={hotelForm.image3}
        onChange={(e)=>
          setHotelForm({
            ...hotelForm,
            image3:e.target.value
          })
        }
      />

      <label>
        <input
          type="checkbox"
          checked={hotelForm.wifi}
          onChange={(e)=>
            setHotelForm({
              ...hotelForm,
              wifi:e.target.checked
            })
          }
        />
        WiFi
      </label>

      <label>
        <input
          type="checkbox"
          checked={hotelForm.parking}
          onChange={(e)=>
            setHotelForm({
              ...hotelForm,
              parking:e.target.checked
            })
          }
        />
        Parking
      </label>

      <label>
        <input
          type="checkbox"
          checked={hotelForm.tv}
          onChange={(e)=>
            setHotelForm({
              ...hotelForm,
              tv:e.target.checked
            })
          }
        />
        TV
      </label>

      <label>
        <input
          type="checkbox"
          checked={hotelForm.garden}
          onChange={(e)=>
            setHotelForm({
              ...hotelForm,
              garden:e.target.checked
            })
          }
        />
        Garden
      </label>

      <button
        className="update-btn"
        onClick={

          editHotelId

          ? updateHotel

          : addHotel

        }
      >

        {

          editHotelId

          ? "Update Hotel"

          : "Add Hotel"

        }

      </button>

    </div>

    {/* HOTEL LIST */}

    <div className="hotel-admin-grid">

      {

        hotels.map((h)=>(

          <div
            className="hotel-admin-card"
            key={h._id}
          >

            <img

              src={

                h?.hotelImages?.[0]

                ||

                "https://images.unsplash.com/photo-1566073771259-6a8506099945"

              }

              alt="hotel"

              style={{

                width:"100%",
                height:"180px",
                objectFit:"cover"

              }}

            />

            <h3>

              {h.hotelName}

            </h3>

            <p>

              {h.hotelAddress}

            </p>

            <p>

              ₹{h.pricePerNight}

            </p>

            <div className="booking-buttons">

              <button
                className="update-btn"
                onClick={()=>editHotel(h)}
              >

                Edit

              </button>

              <button
                className="reject-btn"
                onClick={()=>
                  deleteHotel(h._id)
                }
              >

                Delete

              </button>

            </div>

          </div>

        ))

      }

    </div>

  </div>

)}

             
          {/* BOOKINGS */}
          {activeSection === "bookings" && (
            <div className="hotel-bookings-grid">
              {bookings.length > 0 ? bookings.map((item, index) => (
                <div className="booking-admin-card" key={index}>
                  <h2>{item.fullName}</h2>
                  <p><FaPhoneAlt /> {item.mobile}</p>
                  <p><FaMapMarkerAlt /> {item.reason}</p>
                  <span className={`status-badge ${item.bookingStatus?.toLowerCase()}`}>{item.bookingStatus}</span>
                  <div className="booking-buttons">
                    <button className="approve-btn" onClick={() => updateBookingStatus(item._id, "Approved")}>Approve</button>
                    <button className="reject-btn" onClick={() => updateBookingStatus(item._id, "Rejected")}>Reject</button>
                  </div>
                </div>
              )) : <p className="no-data">No Bookings Found</p>}
            </div>
          )}

          {/* REVIEWS */}
          {activeSection === "reviews" && (
            <div className="reviews-admin-grid">
              {reviews.length > 0 ? reviews.map((item, index) => (
                <div className="review-admin-card" key={index}>
                  <h3>{item.anonymous ? "Anonymous User" : `${item.firstName || ""} ${item.lastName || ""}`}</h3>
                  <div className="review-stars">
                    {[...Array(item.rating || 5)].map((_, i) => <FaStar key={i} />)}
                  </div>
                  <p className="review-text">{item.review}</p>
                  <button className="delete-review-btn" onClick={() => deleteReview(item._id)}>
                    <FaTrash /> Delete
                  </button>
                </div>
              )) : <p className="no-data">No Reviews Found</p>}
            </div>
          )}

          {/* EVENTS */}
          {activeSection === "events" && (
            <div className="admin-section">
              <h2>Add New Event</h2>
              <div className="form-grid">
                <input type="text" placeholder="Title" value={eventForm.title} onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })} />
                <input type="text" placeholder="Location" value={eventForm.location} onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })} />
                <input type="date" value={eventForm.date} onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })} />
                <input type="text" placeholder="Time" value={eventForm.time} onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })} />
                <input type="text" placeholder="Thumbnail URL" value={eventForm.thumbnail} onChange={(e) => setEventForm({ ...eventForm, thumbnail: e.target.value })} />
                <textarea placeholder="Description" value={eventForm.description} onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })} />
                {[1,2,3,4,5,6].map(i => (
                  <input key={i} type="text" placeholder={`Image ${i} URL`} value={eventForm[`image${i}`]} onChange={(e) => setEventForm({ ...eventForm, [`image${i}`]: e.target.value })} />
                ))}
                <button className="update-btn" onClick={addEvent}>Add Event</button>
              </div>

              <div className="applications-wrapper">
                {events.map((item) => (
                  <div className="application-card" key={item._id}>
                    <img src={item.thumbnail} alt="" style={{ width: "100%", height: "180px", objectFit: "cover" }} />
                    <h3>{item.title}</h3>
                    <p>{item.location} | {item.date}</p>
                    <button className="delete-btn" onClick={() => deleteEvent(item._id)}>Delete</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EXPLORE PLACES */}
          {activeSection === "explore" && (
            <div className="admin-section">
              <h2>Add Explore Place</h2>
              <div className="form-grid">
                <input type="text" placeholder="Title" value={exploreForm.title} onChange={(e) => setExploreForm({ ...exploreForm, title: e.target.value })} />
                <input type="text" placeholder="Location" value={exploreForm.location} onChange={(e) => setExploreForm({ ...exploreForm, location: e.target.value })} />
                <input type="text" placeholder="Rating" value={exploreForm.rating} onChange={(e) => setExploreForm({ ...exploreForm, rating: e.target.value })} />
                <input type="text" placeholder="Thumbnail URL" value={exploreForm.thumbnail} onChange={(e) => setExploreForm({ ...exploreForm, thumbnail: e.target.value })} />
                <textarea placeholder="Description" value={exploreForm.description} onChange={(e) => setExploreForm({ ...exploreForm, description: e.target.value })} />
                {[1,2,3,4,5,6].map(i => (
                  <input key={i} type="text" placeholder={`Image ${i} URL`} value={exploreForm[`image${i}`]} onChange={(e) => setExploreForm({ ...exploreForm, [`image${i}`]: e.target.value })} />
                ))}
                <button className="update-btn" onClick={addExplorePlace}>Add Place</button>
              </div>

              <div className="applications-wrapper">
                {explorePlaces.map((item) => (
                  <div className="application-card" key={item._id}>
                    <img src={item.thumbnail} alt="" style={{ width: "100%", height: "180px", objectFit: "cover" }} />
                    <h3>{item.title}</h3>
                    <p>{item.location} • {item.rating} ⭐</p>
                    <button className="delete-btn" onClick={() => deleteExplorePlace(item._id)}>Delete</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* NEWS TICKER */}
          {activeSection === "ticker" && (
            <div className="admin-section">
              <h2>News Ticker Management</h2>
              <textarea
                placeholder="Enter scrolling news ticker text here..."
                value={tickerNews}
                onChange={(e) => setTickerNews(e.target.value)}
                rows="5"
                style={{ width: "100%", marginBottom: "20px" }}
              />
              <button className="update-btn" onClick={updateTicker}>Update Ticker</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================
   APPLICATION CARD
========================= */

function ApplicationCard({

  item,
  updateApplication,
  deleteApplication

}) {

  const [status,setStatus]
  = useState(

    item?.applicationStatus
    || "Submitted"

  );

  const [remarks,setRemarks]
  = useState(

    item?.remarks || ""

  );

  const [officer,setOfficer]
  = useState(

    item?.approvedBy || ""

  );

  const [file,setFile]
  = useState(null);

  return (

    <div className="application-card">

      {/* HEADER */}

      <div className="app-top">

        <h2>

          {

            item?.serviceName
            || "Application"

          }

        </h2>

        <span
          className={`status-badge ${(status || "submitted").toLowerCase()}`}
        >

          {status}

        </span>

      </div>

      {/* USER DETAILS */}

      <div className="app-details">

        <p>

          <strong>
            Tracking ID:
          </strong>

          {

            item?.trackingId
            || "N/A"

          }

        </p>

        <p>

          <strong>
            Applicant:
          </strong>

          {

            item?.fullName
            || "N/A"

          }

        </p>

        <p>

          <strong>
            Mobile:
          </strong>

          {

            item?.mobile
            || "N/A"

          }

        </p>

        <p>

          <strong>
            Email:
          </strong>

          {

            item?.email
            || "N/A"

          }

        </p>

        <p>

          <strong>
            Address:
          </strong>

          {

            item?.address
            || "N/A"

          }

        </p>

      </div>

      {/* DOCUMENTS */}

      <div className="documents-section">

        <h3>

          Uploaded Documents

        </h3>

        {

          Array.isArray(
            item?.documents
          ) &&

          item.documents.length > 0

          ?

          item.documents.map((doc,index)=>(

            <a

              key={index}

              href={`http://localhost:5000/${doc}`}

              target="_blank"

              rel="noreferrer"

              className="doc-link"

            >

              View Document {index + 1}

            </a>

          ))

          :

          <p>

            No Documents Uploaded

          </p>

        }

      </div>

      {/* STATUS */}

      <select

        value={status}

        onChange={(e)=>

          setStatus(
            e.target.value
          )

        }

      >

        <option value="Submitted">

          Submitted

        </option>

        <option value="Under Review">

          Under Review

        </option>

        <option value="Approved">

          Approved

        </option>

        <option value="Rejected">

          Rejected

        </option>

      </select>

      {/* OFFICER */}

      <input

        type="text"

        placeholder="Officer Name"

        value={officer}

        onChange={(e)=>

          setOfficer(
            e.target.value
          )

        }

      />

      {/* REMARKS */}

      <textarea

        placeholder="Officer Remarks"

        value={remarks}

        onChange={(e)=>

          setRemarks(
            e.target.value
          )

        }

      />

      {/* APPROVAL DOCUMENT */}

      <input

        type="file"

        onChange={(e)=>

          setFile(
            e.target.files[0]
          )

        }

      />

      {/* BUTTONS */}

      <div className="card-buttons">

        <button

          className="update-btn"

          onClick={()=>

            updateApplication(

              item?.trackingId,
              status,
              remarks,
              file,
              officer

            )

          }

        >

          Update

        </button>

        <button

          className="delete-btn"

          onClick={()=>

            deleteApplication(

              item?.trackingId

            )

          }

        >

          <FaTrash />

        </button>

      </div>

    </div>

  );

}

export default AdminDashboard;