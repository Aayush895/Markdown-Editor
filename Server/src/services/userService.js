// All business logic is written here
import { StatusCodes } from "http-status-codes";
import {
  checkExisitingUserRepository,
  fetchUserbyId,
  registerUserRepository,
} from "../repository/userRepository.js";
import { uploadOnCloudinary } from "../config/cloudinaryConfig.js";
import ApiError from "../utils/ApiError.js";

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
