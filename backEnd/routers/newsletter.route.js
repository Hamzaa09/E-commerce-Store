// routes/newsletterRoutes.js
import express from "express";
import {
  subscribe,
  getSubscribers,
} from "../controllers/newsletter.controller.js";
import { adminCheck } from "../middlewares/admin.middleware.js";

const router = express.Router();

router.post("/subscribe", subscribe);
router.get("/subscribers", adminCheck, getSubscribers);

export default router;
