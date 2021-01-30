/**
 * Creates a try-catch wrapper for express route
 * callbacks that are asynchronous in nature. This will mitigate
 * writing excessive try-catch blocks in controller actions, unless
 * we want to catch specific Execptions. Plus, it creates sort of
 * adapter for betweent the responses of our controllers and Express Response.
 *
 * @param {function} cb
 */
module.exports = function expressAdapter(cb) {
  return async (req, res, next) => {
    try {
      const response = await cb(req, res);

      return res
        .status(response.status || 204)
        .set(response.headers || {})
        .send(response.body || '');
    } catch (e) {
      // pass error unto error middleware.
      return next(e);
    }
  };
};
