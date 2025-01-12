// To upload image on server after which we upload image from server to cloud

// The below code does not work in production
// This is because:

// This is happening because file system paths and permissions work differently in production (Render) compared to your local environment. In your local environment, the relative path "./public/temp" works because:

// 1.) You have full permissions to create directories
// 2.) The relative path resolves correctly to your project directory

// However, on Render:

// 1.) The server may not have permission to create/write to directories in certain locations
// 2.) The path "/opt/render/project/src/Server/public/temp" (as shown in your error) isn't accessible or writable

// That's why even though the same code works locally, it fails in production.

// Using os.tmpdir() fixes this because:
// It uses a system-provided temporary directory that's guaranteed to be writable
// It's available in both local and production environments
// Render specifically allows writing to the temporary directory

// import multer from "multer";
// import path from "path";

// const serverRoot = path.resolve();
// // Create the upload directory if it doesn't exist
// const uploadDir = path.join(serverRoot, "public", "temp");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     // Keep the original name of the file which we are gonna upload
//     cb(null, file.originalname);
//   },
// });

// export const upload = multer({ storage });

import multer from "multer";
import path from "path";
import fs from "fs";
import os from "os";

// tmpdir provides a temporary directory parh that's guaranteed to be writable
// Adding 'public' to the path doesn't provide any additional benefits in the temporary directory context
// The files in os.tmpdir() are typically meant to be temporary - they're just intermediary storage before being uploaded to your cloud storage 
const uploadDir = path.join(os.tmpdir(), "public", "temp");

// Create directory if it doesn't exist
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
