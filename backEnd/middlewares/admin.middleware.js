import { UserModel } from "../models/users.model.js";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import ErrorHandler from "../utilities/customError.utility.js";

export const adminCheck = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;

  const user = await UserModel.findById(_id);

  if (!user) return next(new ErrorHandler("User not found!", 404));

  if (user.role) {
    if (user.role !== "admin") {
      return next(new ErrorHandler("Not an Admin!", 403));
    }
  }

  req.user = user;
  next();
});