import express from "express";
import {
  addOrder,
  emptyCart,
  getAllOrders,
  getAllOrdersAdmin,
  getAllOrdersCount,
} from "../controllers/order.controller.js";
import { authCheckMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/emptyCart", authCheckMiddleware, emptyCart);
router.post("/addOrder", authCheckMiddleware, addOrder);
router.get("/getAllOrders", authCheckMiddleware, getAllOrders);
router.get("/getAllOrdersCount", authCheckMiddleware, getAllOrdersCount);
router.get("/getAllOrdersAdmin", getAllOrdersAdmin);

export default router;
