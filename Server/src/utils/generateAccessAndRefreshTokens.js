import { StatusCodes } from "http-status-codes";
import { fetchUserbyId } from "../repository/userRepository.js";
import ApiError from "./ApiError.js";

async function generateAccessRefreshToken(userId) {
  try {
    const user = await fetchUserbyId(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError({
      message:
        "Something went wrong while generating referesh and access token",
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
}

export default generateAccessRefreshToken;
