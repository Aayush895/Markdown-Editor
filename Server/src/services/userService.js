// All business logic is written here
import { StatusCodes } from "http-status-codes";
import {
  checkExisitingUserRepository,
  fetchUserbyId,
  registerUserRepository,
} from "../repository/userRepository.js";
import { uploadOnCloudinary } from "../config/cloudinaryConfig.js";
import apiResponse from "../utils/ApiResponse.js";
import apiError from "../utils/ApiError.js";

export async function registerUserService({
  username,
  email,
  password,
  profilePic,
}) {
  try {
    const doesUserExist = await checkExisitingUserRepository(username, email);

    if (doesUserExist === true) {
      throw {
        message: "User already exists!",
        status: StatusCodes.CONFLICT,
      };
    }

    // Check if the file is uploaded
    if (!profilePic) {
      throw {
        message: "Profile pic is required",
        status: StatusCodes.BAD_REQUEST,
      };
    }

    // Upload the image on cloudinary
    // console.log(profilePic)
    const profilePicture = await uploadOnCloudinary(profilePic);
    
    if (!profilePicture) {
      throw {
        message: "Profile pic upload failed",
        status: StatusCodes.BAD_REQUEST,
      };
    }

    // Create the user object and store it in DB
    const user = await registerUserRepository({
      username: username.toLowerCase().trim(),
      email,
      password,
      profilePic: profilePicture.url,
    });

    // Again fetch the user and remove pass and token
    // console.log(user);
    
    const modifiedUserData = await fetchUserbyId(user._id);

    return modifiedUserData;
  } catch (error) {
    // Propagate the error to the controller
    throw error;
  }
}