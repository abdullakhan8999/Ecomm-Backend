const ErrorHandler = require("../Utils/ErrorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {

  // get token from local storage
  let Token = localStorage.getItem("token");
  console.log(Token);

  const { token } = req.cookies;


  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);
  next();
});

exports.authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler("Not authorized to access this route", 401));
    }
    next();
  };
};
