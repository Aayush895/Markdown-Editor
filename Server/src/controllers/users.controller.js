import { StatusCodes } from "http-status-codes";
import { registerUserService } from "../services/userService.js";

// User registeration controller
export async function registerUser(req, res, next) {
  try {
    const responseData = await registerUserService({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      profilePic: req.file.path,
    });

    return res.status(StatusCodes.CREATED).json({
      success: true,
      data: responseData,
      message: "User registered successfully",
    });
  } catch (error) {
    next(error);
  }
}
