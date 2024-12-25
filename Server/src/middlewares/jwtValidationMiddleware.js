import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { StatusCodes } from "http-status-codes";
import ApiError from "../utils/ApiError.js";
import { ACCESS_TOKEN_SECRET } from "../config/serverConfig.js";
import { fetchUserbyId } from "../repository/userRepository.js";

dotenv.config();
export async function jwtValidation(req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError("Unauthorised access", StatusCodes.UNAUTHORIZED);
  }

  try {
    const decodeToken = await jwt.verify(token, ACCESS_TOKEN_SECRET);
    const user = await fetchUserbyId(decodeToken._id);

    req.user = user._id;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(
        new ApiError("Access token has expired", StatusCodes.UNAUTHORIZED)
      );
    }

    // Handle specific JWT errors (expired or invalid)
    if (error instanceof jwt.JsonWebTokenError) {
      return next(
        new ApiError(
          "Invalid or malformed access token",
          StatusCodes.UNAUTHORIZED
        )
      );
    }

    // Catch any other errors (e.g., database issues or unexpected errors)
    return next(
      new ApiError(
        error?.message || "Internal server error",
        StatusCodes.INTERNAL_SERVER_ERROR
      )
    );
  }
}
