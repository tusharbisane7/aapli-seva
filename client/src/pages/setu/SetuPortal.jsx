import "./setu.scss";

import {
  useState
} from "react";

import {
  FaSearch
} from "react-icons/fa";

import Navbar from "../../components/navbar/Navbar";

import Footer from "../../components/footer/Footer";

import setuServices from "../../data/setuServices";

function SetuPortal(){

  const [selectedCategory,setSelectedCategory]
  = useState("All");

  const [search,setSearch]
  = useState("");

  /* Filter Services */

  const filteredCategories = setuServices
    .filter((category)=>{

      if(selectedCategory === "All"){

        return true;

      }

      return category.category === selectedCategory;

    })
    .map((category)=>({

      ...category,

      services:category.services.filter(
        (service)=>

          service.toLowerCase().includes(
            search.toLowerCase()
          )
      )

    }));

  return(

    <div className="setu-page">

      <Navbar />

      {/* Hero */}

      <div className="setu-hero">

        <h1>
          Maharashtra Setu Portal
        </h1>

        <p>
          Access Maharashtra Government
          Services Online
        </p>

      </div>

      {/* Filters */}

      <div className="setu-topbar">

        {/* Search */}

        <div className="setu-search">

          <FaSearch />

          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={(e)=>
              setSearch(e.target.value)
            }
          />

        </div>

        {/* Category Dropdown */}

        <select
          value={selectedCategory}
          onChange={(e)=>
            setSelectedCategory(
              e.target.value
            )
          }
        >

          <option value="All">
            All Categories
          </option>

          {
            setuServices.map((item,index)=>(

              <option
                key={index}
                value={item.category}
              >

                {item.category}

              </option>

            ))
          }

        </select>

      </div>

      {/* Services */}

      <div className="setu-container">

        {
          filteredCategories.map((category,index)=>(

            category.services.length > 0 && (

              <div
                className="setu-category"
                key={index}
              >

                <h2>
                  {category.category}
                </h2>

                <div className="services-grid">

                  {
                    category.services.map(
                      (service,i)=>(

                        <div
                          className="service-card"
                          key={i}
                        >

                          <h3>
                            {service}
                          </h3>

                          <button

                            onClick={() => {

                              const user =
                              JSON.parse(

                                localStorage.getItem(
                                  "user"
                                )

                              );

                              /* Login Check */

                              if(!user){

                                alert(

                                  "Please login first to apply for services."

                                );

                                window.location.href =
                                "/login";

                                return;

                              }

                              /* Save Selected Service */

                              localStorage.setItem(

                                "selectedService",

                                service

                              );

                              /* Redirect */

                              window.location.href =
                              "/application";

                            }}

                          >
                            Apply Now
                          </button>

                        </div>

                      )
                    )
                  }

                </div>

              </div>

            )

          ))
        }

      </div>

      <Footer />

    </div>

  );

}

export default SetuPortal;