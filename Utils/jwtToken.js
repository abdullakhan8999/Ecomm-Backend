//Create a new token and save in cookie
const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();
  res.status(statusCode)
    .json({
      status: "success",
      token,
      user,
    });
};

module.exports = sendToken;
