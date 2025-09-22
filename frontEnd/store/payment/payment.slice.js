import { createSlice } from "@reduxjs/toolkit";
import { getPaymentThunk } from "./payment.thunk";

const initialState = {
  orders: null,
  quantities: null,
  action: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPaymentThunk.pending, (state) => {});
    builder.addCase(getPaymentThunk.fulfilled, (state, action) => {});
    builder.addCase(getPaymentThunk.rejected, (state) => {});
  },
});

export default paymentSlice.reducer;
