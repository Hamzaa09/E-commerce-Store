import express from "express";
import {
  addToCart,
  deleteCart,
  getAllUsers,
  getAllUsersCount,
  getCart,
  getUser,
  loginUser,
  logoutUser,
  signupUser,
  signupUserFacebook,
  signupUserGoogle,
  updateUser,
} from "../controllers/user.controller.js";
import { authCheckMiddleware } from "../middlewares/auth.middleware.js";
import { adminCheck } from "../middlewares/admin.middleware.js";

const router = express();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/get", authCheckMiddleware, getUser);
router.get("/getAllUsers", authCheckMiddleware, adminCheck, getAllUsers);
router.get("/getAllUsersCount", authCheckMiddleware, adminCheck, getAllUsersCount);
router.patch("/update", authCheckMiddleware, updateUser);
router.post("/logout", authCheckMiddleware, logoutUser);
router.get("/signupGoogle", signupUserGoogle);
router.post("/signupFacebook", signupUserFacebook);

// cart, favorite and order
router.post("/addtocart", authCheckMiddleware, addToCart);
router.get("/getcart", authCheckMiddleware, getCart);
router.delete("/deletecart", deleteCart);

export default router;
