import "./payment.scss";

import axios from "axios";

import Navbar from "../../components/navbar/Navbar";

function PaymentPage(){

  const trackingId =
  localStorage.getItem(
    "trackingId"
  );

  const handlePayment = async () => {

    try{

      /* CREATE ORDER */

      const orderRes =
      await axios.post(

        "http://localhost:5000/api/payment/create-order"

      );

      const order =
      orderRes.data.order;

      console.log(order);

      /* RAZORPAY OPTIONS */

      const options = {

        key:

        import.meta.env
        .VITE_RAZORPAY_KEY,

        amount:
        order.amount,

        currency:
        order.currency,

        name:
        "Aapli Seva",

        description:
        "Government Service Payment",

        order_id:
        order.id,

        method: {

          upi: true,

          card: true,

          netbanking: true,

          wallet: true

        },

        handler: async(response)=>{

          console.log(response);

          try{

            const verifyRes =
            await axios.post(

              "http://localhost:5000/api/payment/verify-payment",

              {

                razorpay_order_id:
                response.razorpay_order_id,

                razorpay_payment_id:
                response.razorpay_payment_id,

                razorpay_signature:
                response.razorpay_signature,

                trackingId

              }

            );

            if(
              verifyRes.data.success
            ){

              alert(
                "✅ Payment Successful"
              );

              window.location.href =
              "/tracking";

            }else{

              alert(
                "Payment Verification Failed"
              );

            }

          }catch(error){

            console.log(error);

            alert(
              "Verification Failed"
            );

          }

        },

        modal: {

          ondismiss: function () {

            alert(
              "Payment popup closed"
            );

          }

        },

        prefill:{

          name:"Citizen",

          email:
          "citizen@gmail.com",

          contact:
          "9999999999"

        },

        theme:{

          color:"#0f172a"

        }

      };

      /* OPEN RAZORPAY */

      const razor =
      new window.Razorpay(
        options
      );

      razor.open();

    }catch(error){

      console.log(error);

      console.log(
        error.response
      );

      alert(
        "❌ Payment Failed"
      );

    }

  };

  return(

    <div className="payment-page">

      <Navbar />

      <div className="payment-container">

        <h1>

          Maharashtra Setu Payment

        </h1>

        <div className="payment-card">

          <h2>

            Service Fee

          </h2>

          <h3>

            ₹105

          </h3>

          <p>

            GST Included

          </p>

          <div className="tracking-box">

            Tracking ID:

            <strong>

              {trackingId}

            </strong>

          </div>

          <button
            onClick={handlePayment}
          >

            Pay With Razorpay

          </button>

        </div>

      </div>

    </div>

  );

}

export default PaymentPage;