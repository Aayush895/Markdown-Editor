// Here all the database interaction will take place
import { StatusCodes } from "http-status-codes";
import { User } from "../models/users.models.js";

export async function checkExisitingUserRepository(username, email) {
  try {
    const doesUserExist = await User.find({ $or: [{ username, email }] });
    return doesUserExist;
  } catch (error) {
    console.log(error);
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
    console.log(error);
  }
}

export async function fetchUserbyId(id) {
  try {
    const user = await User.findById(id).select("-password -refreshToken");
    return user;
  } catch (error) {
    console.log(error);
  }
}
