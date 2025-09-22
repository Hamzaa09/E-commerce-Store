import express from "express";
import { getPayment, getSession } from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/payment", getPayment);
router.get("/session/:id", getSession);

export default router;
