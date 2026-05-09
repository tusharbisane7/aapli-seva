import "./NewsTicker.scss";

import {
  useEffect,
  useState
} from "react";

import axios from "axios";

function NewsTicker() {

  const [news,setNews]
  = useState([]);

  /* ===================================
     FETCH TICKER NEWS
  =================================== */

  useEffect(()=>{

    fetchTickerNews();

  },[]);

  const fetchTickerNews = async()=>{

    try{

      const res = await axios.get(

        "https://aapli-seva.onrender.com/api/ticker/latest"

      );

      if(
        res.data.success
      ){

        setNews([
          res.data.news
        ]);

      }

    }catch(error){

      console.log(error);

    }

  };

  /* ===================================
     DEFAULT NEWS
  =================================== */

  const defaultNews = [

    "⚠ Heavy Rain Alert in City",

    "📢 New Maha Setu Services Available",

    "🚨 Emergency Helpline Updated",

    "🏨 50+ New Hotels Added",

    "🎉 Smart City Festival Starts This Week"

  ];

  /* ===================================
     FINAL DATA
  =================================== */

  const tickerData =

    Array.isArray(news) &&
    news.length > 0 &&
    news[0] !== ""

    ? news

    : defaultNews;

  return (

    <div className="news-ticker">

      <div className="ticker-wrapper">

        <div className="ticker-content">

          {

            tickerData.map((item,index)=>(

              <span key={index}>

                {

                  typeof item === "string"

                  ? item

                  : item.news

                }

                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

              </span>

            ))

          }

        </div>

      </div>

    </div>

  );

}

export default NewsTicker;