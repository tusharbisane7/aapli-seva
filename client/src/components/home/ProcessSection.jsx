import "./ProcessSection.scss";

import {
  FaUserCheck,
  FaFileSignature,
  FaUpload,
  FaSearch,
  FaCheckCircle
} from "react-icons/fa";

function ProcessSection() {

  const steps = [

    {
      icon:<FaUserCheck />,
      title:"Register/Login",
      desc:"Create your account securely and access all services."
    },

    {
      icon:<FaFileSignature />,
      title:"Fill Application",
      desc:"Enter all required citizen and document information."
    },

    {
      icon:<FaUpload />,
      title:"Upload Documents",
      desc:"Upload PDFs, images and verification documents safely."
    },

    {
      icon:<FaSearch />,
      title:"Admin Verification",
      desc:"Authorities verify submitted applications carefully."
    },

    {
      icon:<FaCheckCircle />,
      title:"Approval & Download",
      desc:"Get approval notification and download your documents."
    },

  ];

  return (

    <section className="process-section">

      <div className="container">

        <div className="section-header">

         

          <h2>
            Easy Government Document Process
          </h2>

       

        </div>

        <div className="timeline">

          {
            steps.map((step,index)=>(

              <div
                className="timeline-card"
                key={index}
              >

                <div className="step-number">
                  0{index + 1}
                </div>

                <div className="timeline-icon">
                  {step.icon}
                </div>

                <h3>
                  {step.title}
                </h3>

                <p>
                  {step.desc}
                </p>

              </div>

            ))
          }

        </div>

      </div>

    </section>

  );
}

export default ProcessSection;