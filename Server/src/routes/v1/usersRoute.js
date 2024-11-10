import express from "express";
import { validateRequestData } from "../../middlewares/zodMiddleware.js";
import { userRegisterationSchema } from "../../validators/userSchema.js";
import { upload } from "../../config/multerConfig.js";
import { registerUser } from "../../controllers/users.controller.js";

const router = express.Router();

// Below route is used for resgistering a user
router.post(
  "/register",
  upload.single("profilePic"),
  validateRequestData(userRegisterationSchema),
  registerUser
);

export default router;
