import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { StatusCodes } from "http-status-codes";
import ApiError from "../utils/ApiError.js";
import { ACCESS_TOKEN_SECRET } from "../config/serverConfig.js";
import { fetchUserbyId } from "../repository/userRepository.js";

dotenv.config();
export async function jwtValidation(req, res, next) {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError("Unauthorised access", StatusCodes.UNAUTHORIZED);
  }

  try {
    const decodeToken = await jwt.verify(token, ACCESS_TOKEN_SECRET);
    const user = await fetchUserbyId(decodeToken._id);

    req.user = user._id;

    next();
  } catch (error) {
    throw new ApiError(
      error?.message || "Invalid access token",
      StatusCodes.UNAUTHORIZED
    );
  }
}
