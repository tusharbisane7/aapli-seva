const mongoose = require("mongoose");

const applicationSchema =
new mongoose.Schema({

  /* =========================
     USER INFO
  ========================= */

  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },

  userName:{
    type:String,
    default:""
  },

  userEmail:{
    type:String,
    default:""
  },

  userMobile:{
    type:String,
    default:""
  },

  /* =========================
     SERVICE INFO
  ========================= */

  serviceName:{
    type:String,
    required:true
  },

  serviceCategory:{
    type:String,
    default:"General"
  },

  trackingId:{
    type:String,
    unique:true
  },

  /* =========================
     APPLICANT DETAILS
  ========================= */

  firstName:{
    type:String,
    required:true
  },

  middleName:{
    type:String,
    default:""
  },

  lastName:{
    type:String,
    required:true
  },

  firstNameMarathi:{
    type:String,
    default:""
  },

  middleNameMarathi:{
    type:String,
    default:""
  },

  lastNameMarathi:{
    type:String,
    default:""
  },

  fatherName:{
    type:String,
    default:""
  },

  motherName:{
    type:String,
    default:""
  },

  age:{
    type:Number,
    default:0
  },

  dob:{
    type:String,
    default:""
  },

  gender:{
    type:String,
    default:""
  },

  occupation:{
    type:String,
    default:""
  },

  reason:{
    type:String,
    default:""
  },

  /* =========================
     ADDRESS DETAILS
  ========================= */

  address:{
    type:String,
    default:""
  },

  village:{
    type:String,
    default:""
  },

  taluka:{
    type:String,
    default:""
  },

  district:{
    type:String,
    default:""
  },

  state:{
    type:String,
    default:""
  },

  pincode:{
    type:String,
    default:""
  },

  /* =========================
     CONTACT DETAILS
  ========================= */

  mobile:{
    type:String,
    default:""
  },

  alternateMobile:{
    type:String,
    default:""
  },

  email:{
    type:String,
    default:""
  },

  /* =========================
     ID DETAILS
  ========================= */

  aadhaarNumber:{
    type:String,
    default:""
  },

  panNumber:{
    type:String,
    default:""
  },

  /* =========================
     DOCUMENTS
  ========================= */

  aadhaarCard:{
    type:String,
    default:""
  },

  panCard:{
    type:String,
    default:""
  },

  livePhoto:{
    type:String,
    default:""
  },

  passport:{
    type:String,
    default:""
  },

  selfDeclaration:{
    type:String,
    default:""
  },

  rationCard:{
    type:String,
    default:""
  },

  residenceProof:{
    type:String,
    default:""
  },

  incomeCertificate:{
    type:String,
    default:""
  },

  casteCertificate:{
    type:String,
    default:""
  },

  birthCertificate:{
    type:String,
    default:""
  },

  electricityBill:{
    type:String,
    default:""
  },

  otherDocuments:[

    {

      type:String

    }

  ],

  /* =========================
     PAYMENT
  ========================= */

  paymentId:{
    type:String,
    default:""
  },

  paymentMethod:{
    type:String,
    default:"Online"
  },

  paymentStatus:{
    type:String,
    enum:[
      "Pending",
      "Paid",
      "Failed"
    ],
    default:"Pending"
  },

  paymentAmount:{
    type:Number,
    default:105
  },

  /* =========================
     APPLICATION STATUS
  ========================= */

  applicationStatus:{
    type:String,
    enum:[
      "Submitted",
      "Under Review",
      "Approved",
      "Rejected",
      "Completed"
    ],
    default:"Submitted"
  },

  /* =========================
     ADMIN CONTROLS
  ========================= */

  remarks:{
    type:String,
    default:""
  },

  approvedDocument:{
    type:String,
    default:""
  },

  rejectedReason:{
    type:String,
    default:""
  },

  approvedBy:{
    type:String,
    default:""
  },

  approvedAt:{
    type:Date
  },

  /* =========================
     TRACKING TIMELINE
  ========================= */

  tracking:[

    {

      status:{
        type:String
      },

      message:{
        type:String
      },

      updatedBy:{
        type:String
      },

      date:{
        type:String
      }

    }

  ],

  /* =========================
     FLAGS
  ========================= */

  isUrgent:{
    type:Boolean,
    default:false
  },

  isViewedByAdmin:{
    type:Boolean,
    default:false
  }

},

{

  timestamps:true

});

const Application =
mongoose.model(

  "Application",

  applicationSchema

);

module.exports =
Application;