const multer = require("multer");
const path = require("path")

const imgStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  const upload = multer({
    storage: imgStorage,
    fileFilter: (req, file, cb) => {
      const fileTypes = /jpg|jpeg|png|gif/;
      const mimeType = fileTypes.test(file.mimetype);
      const extname = fileTypes.test(path.extname(file.originalname));
      if (mimeType && extname) {
        console.log(file);
        return cb(null, true);
      }
      cb("error occurred");
    },
  }).single("profilePic");


  module.exports = upload