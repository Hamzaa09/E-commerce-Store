import { BlogModel } from "../models/blogs.model.js";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { uploadToCloudinary } from "../utilities/cloudinary.utility.js";
import ErrorHandler from "../utilities/customError.utility.js";

export const createBlog = asyncHandler(async (req, res, next) => {
  const { blogTitle, blogContent } = req.body;

  // ✅ Check for existing blog
  let existingBlog = await BlogModel.findOne({ blogTitle });
  if (existingBlog) {
    return next(new ErrorHandler("Blog already exists!", 405));
  }

  const data = { blogTitle, blogContent };

  // ✅ Handle image upload if provided
  if (req.file && req.file.buffer) {
    const uploadResult = await uploadToCloudinary(req.file.buffer);
    if (uploadResult && uploadResult.secure_url) {
      data.blogImage = uploadResult.secure_url;
    }
  }

  // ✅ Create new blog
  const blog = await BlogModel.create(data);
  if (!blog) {
    return next(new ErrorHandler("Database Error!", 400));
  }

  res.status(201).json({
    success: true,
    message: "Blog created successfully",
    response: { blog },
  });
});

export const updateBlog = asyncHandler(async (req, res, next) => {
  const { _id, blogTitle, blogContent } = req.body;

  const data = { blogTitle, blogContent };

  // ✅ Upload new image if provided
  if (req.file && req.file.buffer) {
    const uploadResult = await uploadToCloudinary(req.file.buffer);
    if (uploadResult && uploadResult.secure_url) {
      data.blogImage = uploadResult.secure_url;
    }
  }

  const blog = await BlogModel.findByIdAndUpdate(_id, data, { new: true });

  if (!blog) {
    return next(new ErrorHandler("Blog not found or database error!", 400));
  }

  res.status(200).json({
    success: true,
    message: "Blog updated successfully",
    response: { blog },
  });
});

export const getBlogs = asyncHandler(async (req, res, next) => {
  const allblogs = await BlogModel.find({});
  const total = await BlogModel.find({}).countDocuments();

  if (!allblogs) return next(new ErrorHandler("No blogs!", 404));

  res.status(200).json({
    success: true,
    response: {
      allblogs,
      total,
    },
  });
});

export const getsingleblog = asyncHandler(async (req, res, next) => {
  const { _id } = req.query;

  const blog = await BlogModel.findById({ _id });

  if (!blog) return next(new ErrorHandler("Blog not Found!", 404));

  res.status(200).json({
    success: true,
    response: {
      blog,
    },
  });
});

export const deleteBlog = asyncHandler(async (req, res, next) => {
  const { _id } = req.query;

  const blog = await BlogModel.findByIdAndDelete({ _id });

  if (!blog) return next(new ErrorHandler("Blog not Found!", 404));

  res.status(200).json({
    success: true,
    response: {
      message: "User Deleted!",
    },
  });
});
