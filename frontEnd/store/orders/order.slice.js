import { createSlice } from "@reduxjs/toolkit";
import {
  getAllOrdersAdminThunk,
  getAllOrdersCountThunk,
  getAllOrdersThunk,
} from "./order.thunk";
import { act } from "react";

const initialState = {
  allOrdersData: [],
  allOrders: [],
  allOrdersDataAdmin: [],
  allOrdersAdmin: [],
  allOrdersCount: null,
};

const orderSlice = createSlice({
  name: "orders",
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllOrdersCountThunk.pending, (state) => {});
    builder.addCase(getAllOrdersCountThunk.fulfilled, (state, action) => {
      state.allOrdersCount = action?.payload?.response?.orderedProductsCount;
    });
    builder.addCase(getAllOrdersCountThunk.rejected, (state) => {});

    builder.addCase(getAllOrdersThunk.pending, (state) => {});
    builder.addCase(getAllOrdersThunk.fulfilled, (state, action) => {
      state.allOrders = action?.payload?.response?.orderedProducts;
      state.allOrdersData = action?.payload?.response?.ordersData;
    });
    builder.addCase(getAllOrdersThunk.rejected, (state) => {});

    // admin
    builder.addCase(getAllOrdersAdminThunk.pending, (state) => {});
    builder.addCase(getAllOrdersAdminThunk.fulfilled, (state, action) => {
      state.allOrdersAdmin = action?.payload?.response?.orderedProducts;
      state.allOrdersDataAdmin = action?.payload?.response?.ordersData;
    });
    builder.addCase(getAllOrdersAdminThunk.rejected, (state) => {});
  },
});

export default orderSlice.reducer;
