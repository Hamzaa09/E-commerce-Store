import { BlogModel } from "../models/blogs.model.js";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import ErrorHandler from "../utilities/customError.utility.js";

export const createBlog = asyncHandler(async (req, res, next) => {
  const { blogTitle, blogContent } = req.body;

  let blog = await BlogModel.findOne({ blogTitle });

  if (blog) {
    return next(new ErrorHandler("Blog Exist!", 405));
  }

  const data = { blogTitle, blogContent };
  if (req.file) {
    data.blogImage = process.env.IMAGE_URI + req.file.filename;
  }

  blog = await BlogModel.create(data);

  if (!blog) return next(new ErrorHandler("DataBase Error!", 400));

  res.status(201).json({
    success: true,
    response: {
      blog,
    },
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
export const updateBlog = asyncHandler(async (req, res, next) => {
  const { _id, blogTitle, blogContent } = req.body;

  const data = { blogTitle, blogContent };
  if (req.file) {
    data.blogImage = process.env.IMAGE_URI + req.file.filename;
  }

  const blog = await BlogModel.findByIdAndUpdate(_id, data, { new: true });

  if (!blog) return next(new ErrorHandler("DataBase Error!", 400));

  res.status(201).json({
    success: true,
    response: {
      blog,
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
