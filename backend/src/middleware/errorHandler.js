// global error handler — sits at the end of the middleware chain
// any next(err) call from a controller ends up here
// keeps error formatting consistent across the whole api

function errorHandler(err, req, res, next) {
  console.error("[ERROR]", err.message);

  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || "Something went wrong on the server.",
  });
}

module.exports = errorHandler;
