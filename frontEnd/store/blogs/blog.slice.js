import { createSlice } from "@reduxjs/toolkit";
import {
  createBlogThunk,
  deleteBlogThunk,
  getBlogThunk,
  singleBlogThunk,
  updateBlogThunk,
} from "./blog.thunk";

const initialState = {
  blogLoading: false,
  allblogs: null,
  singleBlog: null,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get
    builder.addCase(getBlogThunk.pending, (state, action) => {
      state.blogLoading = true;
    });
    builder.addCase(getBlogThunk.fulfilled, (state, action) => {
      state.blogLoading = false;
      state.allblogs = action?.payload?.response?.allblogs;
    });
    builder.addCase(getBlogThunk.rejected, (state, action) => {
      state.blogLoading = false;
    });

    //get
    builder.addCase(createBlogThunk.pending, (state, action) => {
      state.blogLoading = true;
    });
    builder.addCase(createBlogThunk.fulfilled, (state, action) => {
      state.blogLoading = false;
    });
    builder.addCase(createBlogThunk.rejected, (state, action) => {
      state.blogLoading = false;
    });

    //delete
    builder.addCase(deleteBlogThunk.pending, (state, action) => {
      state.blogLoading = true;
    });
    builder.addCase(deleteBlogThunk.fulfilled, (state, action) => {
      state.blogLoading = false;
    });
    builder.addCase(deleteBlogThunk.rejected, (state, action) => {
      state.blogLoading = false;
    });

    //update
    builder.addCase(updateBlogThunk.pending, (state, action) => {
      state.blogLoading = true;
    });
    builder.addCase(updateBlogThunk.fulfilled, (state, action) => {
      state.blogLoading = false;
    });
    builder.addCase(updateBlogThunk.rejected, (state, action) => {
      state.blogLoading = false;
    });

    //single
    builder.addCase(singleBlogThunk.pending, (state, action) => {
      state.blogLoading = true;
    });
    builder.addCase(singleBlogThunk.fulfilled, (state, action) => {
      state.blogLoading = false;
      state.singleBlog = action?.payload?.response?.blog;
    });
    builder.addCase(singleBlogThunk.rejected, (state, action) => {
      state.blogLoading = false;
    });
  },
});

export default blogSlice.reducer;
