import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import {
  registerUserService,
  loginUserService,
  refreshAccessTokenService,
} from "../services/userService.js";
import generateAccessRefreshToken from "../utils/generateAccessAndRefreshTokens.js";
import ApiError from "../utils/ApiError.js";
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} from "../config/serverConfig.js";
import { fetchUserbyId } from "../repository/userRepository.js";

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
      .cookie("refreshToken", refreshToken, options)
      .json({
        success: true,
        data: incomingResponseData,
        accessToken,
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
async function refreshAccessToken(req, res, next) {
  try {
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
      throw new ApiError(
        "Refresh token not received",
        StatusCodes.UNAUTHORIZED
      );
    }

    // New logic for generating the access token:
    const decoded = await jwt.verify(
      incomingRefreshToken,
      REFRESH_TOKEN_SECRET
    );

    const user = await fetchUserbyId(decoded._id);
    const newAccessToken = await user.generateAccessToken();
    console.log("New token: ", newAccessToken);

    return newAccessToken;
  } catch (error) {
    next(error);
  }
}

// Token auth for protected routes in client side
export async function userTokenAuth(req, res, next) {
  try {
    const token = req.body.accessToken;
    const incomingRefreshToken = req.cookies.refreshToken;

    if (!token) {
      throw new ApiError("Access Token not received", StatusCodes.UNAUTHORIZED);
    }

    if(!incomingRefreshToken) {
      throw new ApiError("Refresh Token not received", StatusCodes.UNAUTHORIZED)
    }

    const decodeToken = await jwt.verify(token, ACCESS_TOKEN_SECRET, {
      ignoreExpiration: true,
    });

    const decodeRefreshToken = await jwt.verify(incomingRefreshToken, REFRESH_TOKEN_SECRET, {
      ignoreExpiration: true,
    });

    if (decodeToken.exp && Date.now() >= decodeToken.exp * 1000) {
      const newAccessToken = await refreshAccessToken(req, res, next);
      if (newAccessToken) {
        return res.status(StatusCodes.OK).json({
          success: true,
          newAccessToken,
          message: "New token generated",
        });
      } else {
        throw new ApiError("Access token has expired", StatusCodes.UNAUTHORIZED);
      }
    }

    if(decodeRefreshToken.exp && Date.now() >= decodeRefreshToken.exp * 1000) {
      throw new ApiError("Refresh token has expired", StatusCodes.UNAUTHORIZED);
    } 

    return res.status(StatusCodes.OK).json({
      success: true,
      data: {},
      message: "User is authorized",
    });
  } catch (error) {
    next(error);
  }
}
