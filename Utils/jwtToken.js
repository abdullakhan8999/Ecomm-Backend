//Create a new token and save in cookie
const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();
  console.log("get token", token);

  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + 5 * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: 'none',
  };

  // Save token in local storage for 24 hours
  localStorage.setItem("token", token);

  //response
  res.status(statusCode).cookie("token", token, options).json({
    status: "success",
    token,
    user,
  });
};

module.exports = sendToken;
