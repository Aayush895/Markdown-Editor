import express from "express";
import { validateRequestData } from "../../middlewares/zodMiddleware.js";
import { userRegisterationSchema } from "../../validators/userSchema.js";
import { upload } from "../../config/multerConfig.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  userTokenAuth,
} from "../../controllers/users.controller.js";

const router = express.Router();

// Below route is used for resgistering a user
router.post(
  "/register",
  upload.single("profilePic"),
  validateRequestData(userRegisterationSchema),
  registerUser
);

router.post("/login", validateRequestData(userRegisterationSchema), loginUser);
router.post("/logout", logoutUser);
router.post("/refresh-token", refreshAccessToken);
router.get("/check", userTokenAuth)

export default router;