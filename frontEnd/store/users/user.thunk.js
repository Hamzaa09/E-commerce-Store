import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utilities/axios.instance";
import { toast } from "react-hot-toast";

export const signupUserThunk = createAsyncThunk(
  "/user/signup",
  async (
    { userName, email, password, confirmPassword },
    { rejectWithValue }
  ) => {
    try {
      const request = await axiosInstance.post("/user/signup", {
        userName,
        email,
        password,
        confirmPassword,
      });

      return request.data;
    } catch (err) {
      console.log(err);
      const errMessage = err.response?.data?.error || "Something went wrong";
      toast.error(errMessage);
      return rejectWithValue(errMessage);
    }
  }
);

export const loginUserThunk = createAsyncThunk(
  "/user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.post("/user/login", {
        email,
        password,
      });

      return request.data;
    } catch (err) {
      console.log(err);
      const errMessage = err.response?.data?.error || "Something went wrong";
      toast.error(errMessage);
      return rejectWithValue(errMessage);
    }
  }
);

export const getUserThunk = createAsyncThunk(
  "/user/get",
  async (_, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.get("/user/get");

      return request.data;
    } catch (err) {
      const errMessage = err.response?.data?.error || "Something went wrong";
      toast.error(errMessage);
      return rejectWithValue(errMessage);
    }
  }
);

export const getAllUsersThunk = createAsyncThunk(
  "/user/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.get("/user/getAllUsers");

      return request.data;
    } catch (err) {
      const errMessage = err.response?.data?.error || "Something went wrong";
      toast.error(errMessage);
      return rejectWithValue(errMessage);
    }
  }
);

export const getAllUsersCountThunk = createAsyncThunk(
  "/user/getAllUsersCount",
  async (_, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.get("/user/getAllUsersCount");

      return request.data;
    } catch (err) {
      const errMessage = err.response?.data?.error || "Something went wrong";
      toast.error(errMessage);
      return rejectWithValue(errMessage);
    }
  }
);

export const updateUserThunk = createAsyncThunk(
  "/user/update",
  async (
    { userName, email, number, address, password, confirmPassword, country },
    { rejectWithValue }
  ) => {
    try {
      const request = await axiosInstance.patch("/user/update", {
        userName,
        email,
        country,
        number,
        address,
        password,
        confirmPassword,
      });

      return request.data;
    } catch (err) {
      const errMessage = err.response?.data?.error || "Something went wrong";
      toast.error(errMessage);
      return rejectWithValue(errMessage);
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  "/user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.post("/user/logout");

      return request.data;
    } catch (err) {
      errMessage = err?.response?.data?.err;
      toast.error(errMessage);
      return rejectWithValue(errMessage);
    }
  }
);

// using google
export const signupUserGoogleThunk = createAsyncThunk(
  `/user/signupGoogle`,
  async ({ code }, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.get(
        `/user/signupGoogle?code=${code}`
      );

      return request.data;
    } catch (err) {
      const errMessage = err.response?.data?.error || "Something went wrong";
      toast.error(errMessage);
      return rejectWithValue(errMessage);
    }
  }
);

// using fb
export const signupUserFacebookThunk = createAsyncThunk(
  `/user/signupFacebook`,
  async ({ accessToken }, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.post(`/user/signupFacebook`, {
        accessToken,
      });

      return request.data;
    } catch (err) {
      const errMessage = err.response?.data?.error || "Something went wrong";
      toast.error(errMessage);
      return rejectWithValue(errMessage);
    }
  }
);

//cart, favorite, orders

export const getCartThunk = createAsyncThunk(
  "/user/getcart",
  async (_, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.get("/user/getcart");

      return request.data;
    } catch (err) {
      const errMessage = err.response?.data?.error || "Something went wrong";
      return rejectWithValue(errMessage);
    }
  }
);

export const addToCartThunk = createAsyncThunk(
  "/user/addtocart",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.post("/user/addtocart", productId);

      return request.data;
    } catch (err) {
      const errMessage = err.response?.data?.error || "Something went wrong";
      return rejectWithValue(errMessage);
    }
  }
);

export const deleteCartThunk = createAsyncThunk(
  "/user/deletecart",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.delete("/user/deletecart", {
        params: { userId, productId },
      });

      return request.data;
    } catch (err) {
      const errMessage = err.response?.data?.error || "Something went wrong";
      return rejectWithValue(errMessage);
    }
  }
);
