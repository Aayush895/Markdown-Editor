import express from "express";
import { validateRequestData } from "../../middlewares/zodMiddleware.js";
import { userRegisterationSchema } from "../../validators/userSchema.js";
import { upload } from "../../config/multerConfig.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
} from "../../controllers/users.controller.js";
import { jwtValidation } from "../../middlewares/jwtValidationMiddleware.js";
import { jwtUserVaidation } from "../../middlewares/jwtUserAuth.js";

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
router.get("/check", jwtUserVaidation)

export default router;