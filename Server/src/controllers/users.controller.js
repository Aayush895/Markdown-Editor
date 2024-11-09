import { StatusCodes } from "http-status-codes";
import apiResponse from "../utils/ApiResponse.js";
import apiError from "../utils/ApiError.js";
import { registerUserService } from "../services/userServicejs.js";

// User registeration controller
export async function registerUser(req, res) {
  try {
    const responseData = await registerUserService({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      profilePic: req.body.profilePic,
    });

    return apiResponse(
      responseData,
      StatusCodes.CREATED,
      "User registered successfully"
    );
  } catch (error) {
    return apiError(req, res, error);
  }
}
