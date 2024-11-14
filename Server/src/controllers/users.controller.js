import { StatusCodes } from "http-status-codes";
import { registerUserService,loginUserService } from "../services/userService.js";
import generateAccessRefreshToken from "../utils/generateAccessAndRefreshTokens.js";
import { User } from "../models/users.models.js";

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

export async function logoutUser(req, res, next) {
  try {
    const options = {
      httpOnly: true,
      secure: true,
    };

    res.clearCookie("accessToken", options)
    res.clearCookie("refreshToken", options)

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error)
  }
}