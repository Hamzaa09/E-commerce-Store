import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utilities/axios.instance";

export const getPaymentThunk = createAsyncThunk(
  "stripe/payment",
  async ({ orders, quantity }, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.post("stripe/payment", {
        orders,
        quantity,
      });

      return request.data;
    } catch (err) {
      const errMessage = err?.response?.data?.error || "Payment Error!";
      return rejectWithValue(errMessage);
    }
  }
);
