import express from "express";
import { validateRequestData } from "../../middlewares/zodMiddleware";
import { userRegisterationSchema } from "../../validators/userSchema";
import { upload } from "../../config/multerConfig.js";

const router = express.Router();

// Below route is used for resgistering a user
router.post(
  "/register",
  validateRequestData(userRegisterationSchema),
  upload.fields([{ name: "profilePic", maxCount: 1 }])
);

export default router;
