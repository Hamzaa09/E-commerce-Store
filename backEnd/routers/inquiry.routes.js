import express from "express";
import { getInquiry, sendInquiry } from "../controllers/inquiry.controller.js";
import { authCheckMiddleware } from "../middlewares/auth.middleware.js";
import { adminCheck } from "../middlewares/admin.middleware.js";

const router = express.Router();

router.get("/getInquiry", authCheckMiddleware, adminCheck, getInquiry);
router.post("/sendInquiry", sendInquiry);

export default router
