/**
 * @description Wrapper to catch errors from async routes and forward them to the error handler
 * @param {Function} fn - Async controller function
 * @returns {Function} - Express middleware function
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
