import express from "express";
import {
  createBlog,
  deleteBlog,
  getBlogs,
  getsingleblog,
  updateBlog,
} from "../controllers/blog.controller.js";
import { authCheckMiddleware } from "../middlewares/auth.middleware.js";
import { adminCheck } from "../middlewares/admin.middleware.js";
import { upload } from "../middlewares/uploadFile.middleware.js";

const router = express.Router();

router.get("/getblog", getBlogs);
router.post(
  "/createblog",
  authCheckMiddleware,
  adminCheck,
  upload.single("blogImg"),
  createBlog
);
router.patch(
  "/updateblog",
  authCheckMiddleware,
  adminCheck,
  upload.single("blogImg"),
  updateBlog
);
router.delete("/deleteblog", authCheckMiddleware, adminCheck, deleteBlog);
router.get("/getsingleblog", authCheckMiddleware, adminCheck, getsingleblog);

export default router;
