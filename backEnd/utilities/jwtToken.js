import jwt from "jsonwebtoken";

export const generateToken = (res, user, statusCode) => {
  // token generation
  const tokenData = {
    _id: user?._id,
  };

  const token = jwt.sign(tokenData, process.env.JWT_TOKEN_SECRET, {
    expiresIn: process.env.JWT_TOKEN_PERIOD,
  });

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_TOKEN_PERIOD_LIMIT * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV == "production" ? "none" : "lax",
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    response: {
      user,
      token,
    },
  });
};
