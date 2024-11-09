// To upload image on server after which we upload image from server to cloud

import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (file, cb) {
    // Keep the original name of the file which we are gonna upload
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
