import { StatusCodes } from "http-status-codes";
import {
  registerUserService,
  loginUserService,
  refreshAccessTokenService,
} from "../services/userService.js";
import generateAccessRefreshToken from "../utils/generateAccessAndRefreshTokens.js";
import { User } from "../models/users.models.js";
import ApiError from "../utils/ApiError.js";

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

// User login controller
export async function loginUser(req, res, next) {
  try {
    const incomingResponseData = await loginUserService({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    const { accessToken, refreshToken } = await generateAccessRefreshToken(
      incomingResponseData._id
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(StatusCodes.OK)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        success: true,
        data: incomingResponseData,
        message: "User logged in successfully",
      });
  } catch (error) {
    next(error);
  }
}

// User logout controller
export async function logoutUser(req, res, next) {
  try {
    const options = {
      httpOnly: true,
      secure: true,
    };

    res.clearCookie("accessToken", options);
    res.clearCookie("refreshToken", options);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
}

// Refresh access token
export async function refreshAccessToken(req, res, next) {
  try {
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
      throw new ApiError("Unauthorized Access", StatusCodes.UNAUTHORIZED);
    }

    // Below are the newly generated access and refresh tokens
    const { accessToken, refreshToken } =
      await refreshAccessTokenService(incomingRefreshToken);
    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        success: true,
        message: "Access token refreshed",
        accessToken,
        refreshToken,
      });
  } catch (error) {
    next(error);
  }
}
