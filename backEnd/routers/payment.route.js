import express from "express";
import { getPayment, getSession } from "../controllers/payment.controller.js";
import { authCheckMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/payment", authCheckMiddleware, getPayment);
router.get("/session/:id", authCheckMiddleware, getSession);

export default router;
