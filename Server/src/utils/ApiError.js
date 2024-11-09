import { StatusCodes } from "http-status-codes";

function apiError(req, res, error) {
  console.log(error);
  if (error.status) {
    return res.status(error.status).json({
      message: error.message,
      success: false,
    });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: "Internal server error",
    success: false,
  });
}

export default apiError;
