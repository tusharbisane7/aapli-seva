// FILE: src/pages/transportation/Transportation.jsx

import "./transportation.scss";

import Navbar
from "../../components/navbar/Navbar";

import Footer
from "../../components/footer/Footer";

import TransportHero
from "../../components/transportation/TransportHero";

import QuickTransport
from "../../components/transportation/QuickTransport";

import GovernmentTransport
from "../../components/transportation/GovernmentTransport";

import PrivateTransport
from "../../components/transportation/PrivateTransport";

import TransportRoutes
from "../../components/transportation/TransportRoutes";

function Transportation(){

  return(

    <div className="transport-page">

      {/* NAVBAR */}

      <Navbar />

      {/* HERO */}

      <TransportHero />

      {/* QUICK SERVICES */}

      <QuickTransport />

      {/* GOVERNMENT BUSES */}

      <GovernmentTransport />

      {/* PRIVATE BUSES */}

      <PrivateTransport />

      {/* ROUTES */}

      <TransportRoutes />

      {/* FOOTER */}

      <Footer />

    </div>

  );

}

export default Transportation;