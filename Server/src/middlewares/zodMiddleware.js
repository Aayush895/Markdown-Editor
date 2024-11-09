// Returns a zod validation middleware which will be used to validate the incoming request from client
import apiResponse from "../utils/ApiResponse.js";
import apiError from "../utils/ApiError.js";
import { ZodError } from "zod";

export function validateRequestData(schema) {
  return async function validationMiddleware(req, res, next) {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      return apiError(req, res, error);
    }
  };
}
