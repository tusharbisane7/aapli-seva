import "./tourism.scss";

import Navbar from "../../components/navbar/Navbar";

import Footer from "../../components/footer/Footer";

function Tourism(){

  return(

    <div className="tourism-page">

      <Navbar />

      {/* Hero Section */}

      <div className="tourism-hero">

        <div className="overlay">

          <h1>
            Tourism in Achalpur
          </h1>

          <p>
            Discover the Cultural &
            Natural Beauty of Achalpur
          </p>

        </div>

      </div>

      {/* Main Content */}

      <div className="tourism-container">

        {/* Intro */}

        <div className="tourism-section">

          <h2>
            Welcome to Achalpur
          </h2>

          <p>

            Achalpur, located in the
            Amravati district of Maharashtra,
            is a historic and culturally rich
            destination surrounded by hills,
            forests, temples, and heritage
            monuments.

          </p>

          <p>

            Formerly known as Ellichpur,
            the city reflects a glorious
            historical legacy along with
            deep-rooted religious traditions
            and cultural harmony.

          </p>

        </div>

        {/* Attractions */}

        <div className="tourism-section">

          <h2>
            Major Tourist Attractions
          </h2>

          <div className="tourism-grid">

            {/* Chikhaldara */}

            <div className="tourism-card">

              <img
                src="/images/chikhaldara.jpg"
                alt="Chikhaldara"
              />

              <h3>
                Chikhaldara Hill Station
              </h3>

              <p>

                Maharashtra’s famous
                hill station known for
                waterfalls, coffee plantations,
                valleys, and cool climate.

              </p>

              <ul>

                <li>Bhimkund</li>

                <li>Hurricane Point</li>

                <li>Mozari Point</li>

                <li>Sunset Point</li>

              </ul>

            </div>

            {/* Gavilgad */}

            <div className="tourism-card">

              <img
                src="/images/gavilgad.jpg"
                alt="Gavilgad Fort"
              />

              <h3>
                Gavilgad Fort
              </h3>

              <p>

                Ancient hill fort with
                medieval architecture,
                giant stone walls, and
                breathtaking valley views.

              </p>

            </div>

            {/* Bahiram Baba */}

            <div className="tourism-card">

              <img
                src="/images/bahiram.jpg"
                alt="Bahiram Baba"
              />

              <h3>
                Bahiram Baba Sansthan
              </h3>

              <p>

                One of the most respected
                spiritual destinations in
                the region surrounded by
                scenic natural beauty.

              </p>

            </div>

            {/* Waghmata */}

            <div className="tourism-card">

              <img
                src="/images/waghmata.jpg"
                alt="Waghmata Temple"
              />

              <h3>
                Waghmata Temple
              </h3>

              <p>

                Famous religious center
                attracting huge crowds
                during Navratri festival.

              </p>

            </div>

            {/* Shiv Temple */}

            <div className="tourism-card">

              <img
                src="/images/shivtemple.jpg"
                alt="Shiv Temple"
              />

              <h3>
                Chandur Bazar Shiv Temple
              </h3>

              <p>

                Ancient Shiva Temple known
                for Mahashivratri celebrations
                and peaceful spiritual
                atmosphere.

              </p>

            </div>

            {/* Melghat */}

            <div className="tourism-card">

              <img
                src="/images/melghat.jpg"
                alt="Melghat"
              />

              <h3>
                Melghat Tiger Reserve
              </h3>

              <p>

                Wildlife paradise with
                jungle safaris, bird
                watching, trekking, and
                eco-tourism activities.

              </p>

            </div>

          </div>

        </div>

        {/* Festivals */}

        <div className="tourism-section">

          <h2>
            Festivals of Achalpur
          </h2>

          <div className="festival-grid">

            <div className="festival-card">
              Navratri
            </div>

            <div className="festival-card">
              Ganesh Chaturthi
            </div>

            <div className="festival-card">
              Mahashivratri
            </div>

            <div className="festival-card">
              Diwali
            </div>

            <div className="festival-card">
              Eid
            </div>

            <div className="festival-card">
              Holi
            </div>

          </div>

        </div>

        {/* Food */}

        <div className="tourism-section">

          <h2>
            Local Culture & Food
          </h2>

          <p>

            Achalpur showcases authentic
            Maharashtrian culture with
            traditional fairs, folk art,
            devotional events, and local
            cuisine.

          </p>

          <ul className="food-list">

            <li>Poha</li>

            <li>Bhakri</li>

            <li>Zunka</li>

            <li>Maharashtrian Curries</li>

            <li>Traditional Sweets</li>

          </ul>

        </div>

        {/* Visit */}

        <div className="tourism-section">

          <h2>
            Best Time to Visit
          </h2>

          <p>

            October to February is the
            ideal season to visit Achalpur
            and Chikhaldara due to cool
            climate and pleasant weather.

          </p>

        </div>

        {/* Reach */}

        <div className="tourism-section">

          <h2>
            How to Reach Achalpur
          </h2>

          <div className="reach-grid">

            <div className="reach-card">

              <h3>
                By Road
              </h3>

              <p>

                Connected to Amravati,
                Nagpur, Akola &
                Chikhaldara.

              </p>

            </div>

            <div className="reach-card">

              <h3>
                By Rail
              </h3>

              <p>

                Nearby railway connectivity
                through Amravati.

              </p>

            </div>

            <div className="reach-card">

              <h3>
                By Air
              </h3>

              <p>

                Nearest airport:
                Dr. Babasaheb Ambedkar
                International Airport,
                Nagpur.

              </p>

            </div>

          </div>

        </div>

      </div>

      <Footer />

    </div>

  );

}

export default Tourism;