export const customError = (
  error = "Internal Server Error",
  status,
  success
) => {
  console.log(error.message);
  res.status(status).json({
    success: success,
    message: error.message,
  });
};
