import ApiError from "../utils/ApiError.js";

/**
 * @description Middleware to catch 404 Not Found errors
 */
const notFound = (req, res, next) => {
  const error = new ApiError(404, `Route not found - ${req.originalUrl}`);
  next(error);
};

export default notFound;
