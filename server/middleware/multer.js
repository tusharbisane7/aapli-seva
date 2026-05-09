const multer = require("multer");

const path = require("path");

/* STORAGE */

const storage =
multer.diskStorage({

  destination:(req,file,cb)=>{

    cb(null,"uploads/");

  },

  filename:(req,file,cb)=>{

    cb(

      null,

      Date.now() +

      "-" +

      file.originalname

    );

  }

});

/* FILE FILTER */

const fileFilter =
(req,file,cb)=>{

  const allowedTypes =

  /jpg|jpeg|png|webp|pdf/;

  const extname =

  allowedTypes.test(

    path.extname(
      file.originalname
    ).toLowerCase()

  );

  const mimetype =

  file.mimetype ===
  "application/pdf"

  ||

  file.mimetype ===
  "image/jpeg"

  ||

  file.mimetype ===
  "image/jpg"

  ||

  file.mimetype ===
  "image/png"

  ||

  file.mimetype ===
  "image/webp";

  if(extname && mimetype){

    return cb(null,true);

  }

  cb(

    new Error(

      "Only Images & PDF Allowed"

    )

  );

};

/* MULTER */

const upload = multer({

  storage,

  limits:{

    fileSize:
    10 * 1024 * 1024

  },

  fileFilter

});

module.exports = upload;