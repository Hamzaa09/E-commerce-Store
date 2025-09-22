import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utilities/axios.instance";

export const getBlogThunk = createAsyncThunk(
  "/blog/getblog",
  async (_, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.get("/blog/getblog");

      return request.data;
    } catch (err) {
      const errMessage =
        err?.response?.data?.message || "Error in getting blogs!";
      return rejectWithValue(errMessage);
    }
  }
);

export const createBlogThunk = createAsyncThunk(
  "/blog/createblog",
  async (form, { rejectWithValue }) => {
    try {
      let formData = new FormData();

      formData.append("blogTitle", form.blogTitle);
      formData.append("blogContent", form.blogContent);
      if (form.blogImg && form.blogImg.length > 0) {
        formData.append("blogImg", form.blogImg[0]);
      }

      // console.log(formData.entries())
      const request = await axiosInstance.post("/blog/createblog", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return request.data;
    } catch (err) {
      const errMessage = err?.response || "Error in creating blogs!";
      return rejectWithValue(errMessage);
    }
  }
);

export const updateBlogThunk = createAsyncThunk(
  "/blog/updateblog",
  async ({ _id, form }, { rejectWithValue }) => {
    try {
      let formData = new FormData();

      formData.append("_id", _id);
      formData.append("blogTitle", form.blogTitle);
      formData.append("blogContent", form.blogContent);
      if (form.blogImg && form.blogImg.length > 0) {
        formData.append("blogImg", form.blogImg[0]); // actual file
      }

      // console.log(formData.entries())
      const request = await axiosInstance.patch("/blog/updateblog", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return request.data;
    } catch (err) {
      console.log(err);
      const errMessage =
        err?.response?.data?.message || "Error in updating blogs!";
      return rejectWithValue(errMessage);
    }
  }
);

export const deleteBlogThunk = createAsyncThunk(
  "/blog/deleteblog",
  async ({ _id }, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.delete("/blog/deleteblog", {
        params: {
          _id,
        },
      });

      return request.data;
    } catch (err) {
      const errMessage =
        err?.response?.data?.message || "Error in deleting blogs!";
      return rejectWithValue(errMessage);
    }
  }
);

export const singleBlogThunk = createAsyncThunk(
  "/blog/getsingleblog",
  async ({ _id }, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.get("/blog/getsingleblog", {
        params: {
          _id,
        },
      });

      return request.data;
    } catch (err) {
      const errMessage =
        err?.response?.data?.message || "Error in deleting blogs!";
      return rejectWithValue(errMessage);
    }
  }
);
