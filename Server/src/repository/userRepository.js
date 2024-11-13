// Here all the database interaction will take place
import ApiError from "../config/ApiError.js";
import { User } from "../models/users.models.js";

export async function checkExisitingUserRepository(username, email) {
  try {
    const doesUserExist = await User.findOne({ $or: [{ username, email }] });
    return doesUserExist;
  } catch (error) {
    console.error("Error checking existing user:", error);
    throw new ApiError(
      "Database error while checking if user exists",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

export async function registerUserRepository({
  username,
  email,
  password,
  profilePic,
}) {
  try {
    const user = await User.create({ username, email, password, profilePic });

    return user;
  } catch (error) {
    console.error("Error registering user:", error);
    throw new ApiError(
      "Database error while registering the user",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

export async function fetchUserbyId(id) {
  try {
    const user = await User.findById(id).select("-password -refreshToken");
    if (!user) {
      // If the user is not found, throw an error
      throw new ApiError("User not found", StatusCodes.NOT_FOUND);
    }
    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new AppError(
      "Database error while fetching user by ID",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
