import logger from "../../logs/logger.js";

const errorMiddleware = (err, req, res, next) => {
  const isOperationalError = err.isOperational || false;

  // Log the error with stack trace in the logs
  logger.error(
    `Error: ${err.statusCode || 500} - ${err.message} - ${err.stack}`
  );

  if (isOperationalError) {
    // Operational errors (client-related) - send detailed message
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  // For unexpected (system) errors, do not expose stack trace in production
  // if (process.env.NODE_ENV === "production") {
  //   return res.status(500).json({
  //     status: "error",
  //     message: "Internal Server Error. Please try again later.",
  //   });
  // }

  // In development, provide full stack trace for debugging
  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
    stack: err.stack,
  });
};

export default errorMiddleware;
