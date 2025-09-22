import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utilities/axios.instance";

export const emptyCartThunk = createAsyncThunk(
  "/orders/emptyCart",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/orders/emptyCart");

      return data;
    } catch (err) {
      const errMessage = err?.response?.data?.error;
      return rejectWithValue(errMessage);
    }
  }
);

export const addOrderThunk = createAsyncThunk(
  "/orders/addOrder",
  async (orders, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/orders/addOrder", { orders });

      return data;
    } catch (err) {
      const errMessage = err?.response?.data?.error;
      return rejectWithValue(errMessage);
    }
  }
);

export const getAllOrdersThunk = createAsyncThunk(
  "/orders/getAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/orders/getAllOrders");

      return data;
    } catch (err) {
      const errMessage = err?.response?.data?.error;
      return rejectWithValue(errMessage);
    }
  }
);

export const getAllOrdersCountThunk = createAsyncThunk(
  "/orders/getAllOrdersCount",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/orders/getAllOrdersCount");

      return data;
    } catch (err) {
      const errMessage = err?.response?.data?.error;
      return rejectWithValue(errMessage);
    }
  }
);

export const getAllOrdersAdminThunk = createAsyncThunk(
  "/orders/getAllOrdersAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/orders/getAllOrdersAdmin");

      return data;
    } catch (err) {
      const errMessage = err?.response?.data?.error;
      return rejectWithValue(errMessage);
    }
  }
);
