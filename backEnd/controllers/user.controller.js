import { UserModel } from "../models/users.model.js";
import { ProductModel } from "../models/products.model.js";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utilities/jwtToken.js";
import ErrorHandler from "../utilities/customError.utility.js";
import { oauth2client } from "../utilities/googleAuth.utility.js";
import axios from "axios";
import { google } from "googleapis";

export const signupUser = asyncHandler(async (req, res, next) => {
  const { userName, password, email } = req.body;

  const checkUser = await UserModel.findOne({ email });
  if (checkUser) {
    return next(new ErrorHandler("User found with the same Email!", 409));
  }
  const encryptedPass = await bcrypt.hash(password, 13);

  const User = await UserModel.create({
    userName,
    email,
    password: encryptedPass,
  });

  generateToken(res, User, 200);
});

export const loginUser = asyncHandler(async (req, res, next) => {
  const { password, email } = req.body;

  const User = await UserModel.findOne({ email });

  if (!User) return next(new ErrorHandler("Wrong Email or Password!", 401));

  const comparedPass = await bcrypt.compare(password, User.password);

  if (!comparedPass)
    return next(new ErrorHandler("Wrong Email or Password!", 401));

  generateToken(res, User, 200);
});

export const updateUser = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;

  if (!_id) return next(new ErrorHandler("User Not Found!", 404));

  const User = await UserModel.findByIdAndUpdate(_id, req.body, {
    new: true,
  });

  if (!User) return next(new ErrorHandler("Error updating Account", 404));

  res.status(200).json({
    success: true,
    User,
  });
});

export const getUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  if (!_id) {
    res.send("User not found");
    return;
  }

  const User = await UserModel.findById({ _id });

  if (!User) {
    res.send("Error getting an Account");
    return;
  }

  res.status(200).json({
    success: true,
    User,
  });
});

export const getAllUsersCount = asyncHandler(async (req, res) => {
  const getAllUsersCount = await UserModel.find({}).countDocuments();

  const nationalCustomers = await UserModel.find({
    country: "Pakistan",
  }).countDocuments();

  if (!getAllUsersCount) {
    res.send("Error getting an Account");
    return;
  }

  res.status(200).json({
    success: true,
    getAllUsersCount,
    nationalCustomers,
  });
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const allUsers = await UserModel.find({});

  if (!allUsers) {
    res.send("Error getting an Account");
    return;
  }

  res.status(200).json({
    success: true,
    allUsers,
  });
});

export const logoutUser = asyncHandler(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logout Successfull!",
    });
});

export const signupUserGoogle = asyncHandler(async (req, res, next) => {
  const { code } = req.query;

  const { tokens } = await oauth2client.getToken(code);
  oauth2client.setCredentials(tokens);

  const oauth2 = google.oauth2({
    auth: oauth2client,
    version: "v2",
  });

  const { data: profile } = await oauth2.userinfo.get();
  const { email, name } = profile;

  let User = await UserModel.findOne({ email });
  if (!User) {
    User = await UserModel.create({
      userName: name,
      email,
    });
  }

  generateToken(res, User, 200);
});

export const signupUserFacebook = asyncHandler(async (req, res, next) => {
  const { accessToken } = req.body;

  const response = await axios.get(`https://graph.facebook.com/me`, {
    params: {
      access_token: accessToken,
      fields: "name,email",
    },
  });

  const { name, email } = response.data;

  let User = await UserModel.findOne({ email });
  if (!User) {
    User = await UserModel.create({
      userName: name,
      email,
    });
  }

  generateToken(res, User, 200);
});

//cart , favorite & orders

export const addToCart = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const { id } = req.body;

  const userId = _id;
  const productId = id;

  if (!userId || !productId) return next(new ErrorHandler("Id error!", 405));

  let user = await UserModel.findById(userId);
  if (!user) return next(new ErrorHandler("User not Found!", 404));

  const product = await ProductModel.findById(productId);
  if (!product) return next(new ErrorHandler("Product not Found!", 404));

  user = await UserModel.findByIdAndUpdate(
    userId,
    { $push: { cart: productId } },
    { new: true }
  );
  if (!user) return next(new ErrorHandler("User not updated!", 404));

  res.status(201).json({
    success: true,
    response: {
      cart: user.cart,
      cartLength: user.cart.length,
    },
  });
});

export const deleteCart = asyncHandler(async (req, res, next) => {
  const { userId, productId } = req.query;

  if (!userId || !productId) return next(new ErrorHandler("Id error!", 405));

  let user = await UserModel.findById(userId);
  if (!user) return next(new ErrorHandler("User not Found!", 404));

  const product = await UserModel.findByIdAndUpdate(
    userId,
    {
      $pull: { cart: productId },
    },
    { new: true }
  );
  if (!product) return next(new ErrorHandler("Product not Found!", 404));

  res.status(201).json({
    success: true,
    response: {
      cart: user.cart,
    },
  });
});

export const getCart = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;

  const userId = _id;

  // if (!userId) return next(new ErrorHandler("Id error!", 405));

  let user = await UserModel.findById(userId);
  if (!user) return next(new ErrorHandler("User not Found!", 404));

  res.status(201).json({
    success: true,
    response: {
      cart: user.cart,
    },
  });
});
