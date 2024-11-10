// To upload image on server after which we upload image from server to cloud

import multer from "multer";
import path from "path";
// import fs from "fs";

const serverRoot = path.resolve();
// Create the upload directory if it doesn't exist
const uploadDir = path.join(serverRoot, "public", "temp");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Keep the original name of the file which we are gonna upload
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
