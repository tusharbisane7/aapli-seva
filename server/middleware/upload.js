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

  const allowedExtensions =

  /jpg|jpeg|png|webp|pdf/;

  const extname =

  allowedExtensions.test(

    path.extname(
      file.originalname
    ).toLowerCase()

  );

  const allowedMimeTypes = [

    "image/jpeg",

    "image/jpg",

    "image/png",

    "image/webp",

    "application/pdf"

  ];

  const mimetype =

  allowedMimeTypes.includes(
    file.mimetype
  );

  if(extname && mimetype){

    return cb(null,true);

  }

  return cb(

    new Error(

      "Only Images and PDF files Allowed"

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