import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    blogImage: {
      type: String,
      required: true,
    },
    blogTitle: {
      type: String,
      required: true,
    },
    blogContent: {
      type: String,
      required: true,
    },
    blogDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const BlogModel = mongoose.model("BlogModel", blogSchema);
