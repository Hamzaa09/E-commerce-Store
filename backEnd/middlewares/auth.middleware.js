import jwt from "jsonwebtoken";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import ErrorHandler from "../utilities/customError.utility.js";

export const authCheckMiddleware = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return;
  const tokenData = await jwt.verify(token, process.env.JWT_TOKEN_SECRET);

  req.user = tokenData;
  next();
});
