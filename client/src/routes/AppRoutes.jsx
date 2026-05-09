import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

/* =========================
   AUTH PAGES
========================= */

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";

/* =========================
   PROFILE PAGES
========================= */

import Profile from "../pages/profile/Profile";
import Settings from "../pages/profile/Settings";

/* =========================
   ADMIN PAGES
========================= */

import AdminDashboard from "../pages/admin/AdminDashboard";
import AddHotel from "../pages/admin/AddHotel";
import AdminApplications from "../pages/admin/AdminApplications";
import ViewApplication from "../pages/admin/ViewApplication";

/* =========================
   USER APPLICATION PAGES
========================= */

import ApplyService from "../pages/user/ApplyService";
import MyApplications from "../pages/user/MyApplications";

/* =========================
   SETU PORTAL
========================= */

import SetuPortal from "../pages/setu/SetuPortal";

/* =========================
   TOURISM
========================= */

import Tourism from "../pages/tourism/Tourism";

/* =========================
   TRANSPORTATION
========================= */

import Transportation
from "../pages/transportation/Transportation";

import TransportBooking
from "../pages/transportation/TransportBooking";

import LiveTracking
from "../pages/transportation/LiveTracking";

import TransportTicket
from "../pages/transportation/TransportTicket";

import MyBusBookings
from "../pages/transportation/MyBusBookings";

import TrackBus
from "../pages/transportation/TrackBus";

/* =========================
   EMERGENCY
========================= */

import Emergency from "../pages/emergency/Emergency";

/* =========================
   HOTELS
========================= */

import Hotels from "../pages/hotels/Hotels";

import HotelDetails from "../pages/hotels/HotelDetails";

import HotelBooking from "../pages/hotels/HotelBooking";

import HotelBookingTracking
from "../pages/hotels/HotelBookingTracking";

import UserBookings
from "../pages/hotels/UserBookings";

/* =========================
   APPLICATION
========================= */

import ApplicationForm
from "../pages/application/ApplicationForm";

/* =========================
   PAYMENT
========================= */

import PaymentPage
from "../pages/payment/PaymentPage";

/* =========================
   TRACKING
========================= */

import TrackingPage
from "../pages/tracking/TrackingPage";

/* =========================
   HOME COMPONENTS
========================= */

import Navbar
from "../components/navbar/Navbar";

import Hero
from "../components/hero/Hero";

import NewsTicker
from "../components/home/NewsTicker";

import QuickServices
from "../components/home/QuickServices";

import ExploreCity
from "../components/home/ExploreCity";


import ProcessSection
from "../components/home/ProcessSection";

import EventsSection
from "../components/home/EventsSection";

import Testimonials
from "../components/home/Testimonials";

import Footer
from "../components/footer/Footer";

/* =========================
   HOME PAGE
========================= */

function HomePage() {

  return (

    <div>

      <Navbar />

      <Hero />

      <NewsTicker />

      <QuickServices />

      <ExploreCity />


      <ProcessSection />

      <EventsSection />

      <Testimonials />

      <Footer />

    </div>

  );

}

/* =========================
   APP ROUTES
========================= */

function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        {/* =========================
            HOME
        ========================= */}

        <Route
          path="/"
          element={<HomePage />}
        />

        {/* =========================
            AUTH
        ========================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        {/* =========================
            PROFILE
        ========================= */}

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

        {/* =========================
            ADMIN
        ========================= */}

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/add-hotel"
          element={<AddHotel />}
        />

        <Route
          path="/admin-applications"
          element={<AdminApplications />}
        />

        <Route
          path="/view-application/:trackingId"
          element={<ViewApplication />}
        />

        {/* =========================
            USER APPLICATION
        ========================= */}

        <Route
          path="/apply-service"
          element={<ApplyService />}
        />

        <Route
          path="/my-applications"
          element={<MyApplications />}
        />

        {/* =========================
            SETU PORTAL
        ========================= */}

        <Route
          path="/setu"
          element={<SetuPortal />}
        />

        {/* =========================
            TOURISM
        ========================= */}

        <Route
          path="/tourism"
          element={<Tourism />}
        />

        {/* =========================
            TRANSPORTATION
        ========================= */}

        <Route
          path="/transportation"
          element={<Transportation />}
        />

        {/* =========================
            TRANSPORT BOOKING
        ========================= */}

        <Route
          path="/transport-booking/:id"
          element={<TransportBooking />}
        />

        {/* =========================
            LIVE TRACKING
        ========================= */}

        <Route
          path="/transport-tracking/:id"
          element={<LiveTracking />}
        />

        {/* =========================
            TRACK BUS BY LAST 4 DIGITS
        ========================= */}

        <Route
          path="/transport-track/:id"
          element={<TrackBus />}
        />

        {/* =========================
            TRANSPORT TICKET
        ========================= */}

        <Route
          path="/transport-ticket/:id"
          element={<TransportTicket />}
        />

        {/* =========================
            MY BUS BOOKINGS
        ========================= */}

        <Route
          path="/my-bus-bookings"
          element={<MyBusBookings />}
        />

        {/* =========================
            EMERGENCY
        ========================= */}

        <Route
          path="/emergency"
          element={<Emergency />}
        />

        {/* =========================
            HOTELS
        ========================= */}

        <Route
          path="/hotels"
          element={<Hotels />}
        />

        <Route
          path="/hotel/:id"
          element={<HotelDetails />}
        />

        <Route
          path="/hotel-book/:id"
          element={<HotelBooking />}
        />

        <Route
          path="/hotel-booking"
          element={<HotelBookingTracking />}
        />

        <Route
          path="/my-bookings"
          element={<UserBookings />}
        />

        {/* =========================
            APPLICATION
        ========================= */}

        <Route
          path="/application"
          element={<ApplicationForm />}
        />

        {/* =========================
            PAYMENT
        ========================= */}

        <Route
          path="/payment"
          element={<PaymentPage />}
        />

        {/* =========================
            TRACKING
        ========================= */}

        <Route
          path="/tracking"
          element={<TrackingPage />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default AppRoutes;