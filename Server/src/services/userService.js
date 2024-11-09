// All business logic is written here
import { StatusCodes } from "http-status-codes";
import { checkExisitingUserRepository, registerUserRepository } from "../repository/userRepository";

export async function registerUserService({
  username,
  email,
  password,
  profilePic,
}) {
  const doesUserExist = await checkExisitingUserRepository(username, email);

  if (doesUserExist) {
    throw {
      message: "User already exists!",
      status: StatusCodes.CONFLICT,
    };
  }

  // Check if the file is uploaded on the server

  // Upload the image on cloudinary

  // Create the user object and store it in DB

  // Again fetch the user and remove pass and token

  // Send the response back to the client
}
