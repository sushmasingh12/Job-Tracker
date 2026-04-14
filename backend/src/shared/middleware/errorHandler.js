import ApiError from "../utils/ApiError.js";

/**
 * @description Global error handling middleware
 */
const errorHandler = (err, req, res, next) => {
  let error = err;

  // If error is not an instance of ApiError, normalize it
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || (error.name === "ValidationError" ? 400 : 500);
    const message = error.message || "Internal Server Error";
    
    // Handle Mongoose/MongoDB errors specifically
    if (error.name === "CastError") {
      error = new ApiError(400, `Invalid ${error.path}: ${error.value}`);
    } else if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      error = new ApiError(400, `Duplicate field value: ${field}. Please use another value!`);
    } else if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      error = new ApiError(400, `Validation Error: ${messages.join(", ")}`, messages);
    } else if (error.name === "JsonWebTokenError") {
      error = new ApiError(401, "Invalid token. Please log in again!");
    } else if (error.name === "TokenExpiredError") {
      error = new ApiError(401, "Your token has expired! Please log in again.");
    } else {
      error = new ApiError(statusCode, message, [], err.stack);
    }
  }

  // Response structure
  const response = {
    success: false,
    message: error.message,
    errors: error.errors || [],
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  };

  // Log error in development
  if (process.env.NODE_ENV === "development") {
    console.error(`[Error] ${req.method} ${req.path} >>`, err);
  }

  res.status(error.statusCode || 500).json(response);
};

export default errorHandler;
