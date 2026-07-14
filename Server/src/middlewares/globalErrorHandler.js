import AppError from "../utils/AppError.js";

// Helper to handle MongoDB CastError (e.g. invalid ObjectId format)
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400, "DB_CAST_ERROR");
};

// Helper to handle MongoDB duplicate key errors (code 11000)
const handleDuplicateFieldsDB = (err) => {
  const fieldName = err.keyValue ? Object.keys(err.keyValue)[0] : "field";
  const value = err.keyValue ? err.keyValue[fieldName] : "";
  const message = `Duplicate field value: "${value}". Please use another ${fieldName}.`;
  return new AppError(message, 400, "DUPLICATE_KEY_ERROR");
};

// Helper to handle Mongoose validation errors
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data: ${errors.join(". ")}`;
  return new AppError(message, 400, "VALIDATION_ERROR");
};

// Helper to handle JWT errors
const handleJWTError = () => {
  return new AppError("Invalid session. Please log in again.", 401, "INVALID_TOKEN");
};

const handleJWTExpiredError = () => {
  return new AppError("Your session has expired. Please log in again.", 401, "SESSION_EXPIRED");
};

// Helper to handle Multer file upload errors
const handleMulterError = (err) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    return new AppError("File size exceeds the 4MB limit. Please upload a smaller file.", 400, "FILE_TOO_LARGE");
  }
  return new AppError(err.message, 400, "FILE_UPLOAD_ERROR");
};

// Development Response Format
const sendErrorDev = (err, res) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message,
    code: err.code || "INTERNAL_SERVER_ERROR",
    error: err.message,
    stack: err.stack,
  });
};

// Production Response Format
const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      code: err.code || "INTERNAL_SERVER_ERROR",
    });
  } else {
    // Programming or other unknown error: don't leak details
    console.error("ERROR 💥", err);

    res.status(500).json({
      success: false,
      message: "An unexpected error occurred on the server.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else {
    let error = Object.create(err);
    error.message = err.message;
    error.stack = err.stack;

    // Handle database specific errors
    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "ValidationError") error = handleValidationErrorDB(error);

    // Handle authentication errors
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

    // Handle file upload errors
    if (error.name === "MulterError" || error.code?.startsWith("LIMIT_")) error = handleMulterError(error);

    // Handle other operational errors or keep default
    sendErrorProd(error, res);
  }
};

export default globalErrorHandler;
