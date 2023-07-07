//each time we have error in our backend ,api will know exactly what it is and also the code status
const ErrorResponse = require("../utils/errorResponse");

//handle all custom error
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  if (err.name === "castError") {
    const message = `Resource not found ${err.value}`;
    error = new ErrorResponse(message, 404);
  }
  //mongoose duplicate value
  if (err.code === 11000) {
    const message = `Duplicate field value entered`;
    error = new ErrorResponse(message, 400);
  }

  //mongoose validation error
  if (err.name === "validationError") {
    const message = object.values(err.errors).map((val) => " " + val.message); //object create array form
    error = new ErrorResponse(message, 400);
  }
  //if server eror return json
  res.status(error.codeStatus || 500).json({
    success: false,
    error: error.message || "server error",
  });
};
module.exports = errorHandler;
