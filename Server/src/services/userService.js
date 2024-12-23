// All business logic is written here
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import {
  checkExisitingUserRepository,
  fetchUserbyId,
  registerUserRepository,
} from "../repository/userRepository.js";
import { uploadOnCloudinary } from "../config/cloudinaryConfig.js";
import ApiError from "../utils/ApiError.js";
import { REFRESH_TOKEN_SECRET } from "../config/serverConfig.js";
import { User } from "../models/users.models.js";
import generateAccessRefreshToken from "../utils/generateAccessAndRefreshTokens.js";

export async function registerUserService({
  username,
  email,
  password,
  profilePic,
}) {
  try {
    const doesUserExist = await checkExisitingUserRepository(username, email);

    if (doesUserExist) {
      throw new ApiError(
        "User with this username or email already exists",
        StatusCodes.BAD_REQUEST
      );
    }

    // Check if the file is uploaded
    if (!profilePic) {
      throw new ApiError("Profile pic is required", StatusCodes.BAD_REQUEST);
    }

    // Upload the image on cloudinary
    const profilePicture = await uploadOnCloudinary(profilePic);

    if (!profilePicture) {
      throw new ApiError("Profile pic upload failed", StatusCodes.BAD_REQUEST);
    }

    // Create the user object and store it in DB
    const user = await registerUserRepository({
      username: username.toLowerCase().trim(),
      email,
      password,
      profilePic: profilePicture.url,
    });

    // Again fetch the user and remove pass and token
    const modifiedUserData = await fetchUserbyId(user._id);

    return modifiedUserData;
  } catch (error) {
    // Propagate the error to the controller
    if (!(error instanceof ApiError)) {
      // In case a non-ApiError is thrown (for example, unexpected errors), throw a general internal server error
      throw new ApiError(
        "An unexpected error occurred. Please try again later.",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
    // If it is an instance of ApiError, just rethrow it as it has the correct status and message
    throw error;
  }
}

export async function loginUserService({ username, email, password }) {
  try {
    const doesUserExist = await checkExisitingUserRepository(username, email);

    if (!doesUserExist) {
      throw new Error({
        message: "Invalid username or email, please check your credentials!",
      });
    }

    const validatePass = await doesUserExist.isPasswordCorrect(password);
    if (!validatePass) {
      throw new Error({
        message: "Invalid password, please check it and try again!",
        status: StatusCodes.BAD_REQUEST,
      });
    }

    const fetchUser = await fetchUserbyId(doesUserExist._id);

    return fetchUser;
  } catch (error) {
    if (!(error instanceof ApiError)) {
      throw new ApiError(
        "An unexpected error occurred. Please try again later.",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }

    throw error;
  }
}

export async function refreshAccessTokenService(incomingRefreshToken) {
  const decodeincomingToken = await jwt.verify(
    incomingRefreshToken,
    REFRESH_TOKEN_SECRET
  );

  const user = await User.findById(decodeincomingToken._id);
  if (!user) {
    throw new ApiError("Invalid refresh token", StatusCodes.UNAUTHORIZED);
  }

  if (incomingRefreshToken !== user?.refreshToken) {
    throw new ApiError(
      "Refresh token is expired or used",
      StatusCodes.UNAUTHORIZED
    );
  }

  const { accessToken, refreshToken } = await generateAccessRefreshToken(
    user._id
  );

  return { accessToken, refreshToken };
}
