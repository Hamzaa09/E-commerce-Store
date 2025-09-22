import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { UserModel } from "../models/users.model.js";
import { ProductModel } from "../models/products.model.js";
import mongoose from "mongoose";

export const emptyCart = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;

  const user = await UserModel.findByIdAndUpdate(
    _id,
    { $set: { cart: [] } },
    { new: true }
  );

  res.status(201).json({
    success: true,
    response: {
      user,
    },
  });
});

export const addOrder = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const { orders } = req.body;

  const user = await UserModel.findByIdAndUpdate(
    _id,
    { $push: { orders: { $each: orders } } },
    { new: true }
  );

  res.status(201).json({
    success: true,
    response: {
      user,
    },
  });
});

export const getAllOrders = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const user = await UserModel.findById(_id);

  const productIds = user.orders.map((element) => {
    return element.product.toString();
  });

  const products = await ProductModel.find({ _id: { $in: productIds } });

  res.status(200).json({
    success: true,
    response: { ordersData: user.orders, orderedProducts: products },
  });
});

export const getAllOrdersCount = asyncHandler(async (req, res, next) => {
  const products = await ProductModel.find({}).countDocuments();

  res.status(200).json({
    success: true,
    response: { orderedProductsCount: products },
  });
});

export const getAllOrdersAdmin = asyncHandler(async (req, res, next) => {
  const users = await UserModel.find({});

  const productsIds = users.map((user) =>
    user.orders.map((element) => {
      return element.product.toString();
    })
  );

  const products = await Promise.all(
    productsIds.map(async (ids) => {
      return await ProductModel.find({ _id: { $in: ids } });
    })
  );

  res.status(200).json({
    success: true,
    response: { ordersData: users, orderedProducts: products },
  });
});

export const updateOrder = asyncHandler(async (req, res, next) => {
  const { userId, productId, status } = req.body;

  const user = await UserModel.findById(userId);
});
