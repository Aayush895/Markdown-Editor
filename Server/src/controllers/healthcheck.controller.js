import { StatusCodes } from "http-status-codes";
import apiResponse from "../utils/ApiResponse.js";
import apiError from "../utils/ApiError.js";

function routehealthCheck(req, res) {
  try {
    return apiResponse(
      req,
      res,
      {},
      StatusCodes.OK,
      "Health check route is working fine!"
    );
  } catch (error) {
    return apiError(req, res, error);
  }
}

export default routehealthCheck;
