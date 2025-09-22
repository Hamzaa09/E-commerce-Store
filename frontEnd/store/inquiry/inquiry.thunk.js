import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utilities/axios.instance";

export const sendInquiryThunk = createAsyncThunk(
  "/inquiry/sendInquiry",
  async ({ inqEmail, inqNumber, inqText }, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.post("/inquiry/sendInquiry", {
        inqEmail,
        inqNumber,
        inqText,
      });

      return request.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getInquiryThunk = createAsyncThunk(
  "/inquiry/getInquiry",
  async (_, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.get("/inquiry/getInquiry");

      return request.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);
