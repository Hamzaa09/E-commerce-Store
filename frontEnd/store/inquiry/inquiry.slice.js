import { createSlice } from "@reduxjs/toolkit";
import { getInquiryThunk, sendInquiryThunk } from "./inquiry.thunk";

const initialState = {
  inqLoading: false,
  allInq: null,
};

const inquirySlice = createSlice({
  name: "inquiry",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //send
    builder.addCase(sendInquiryThunk.pending, (state, action) => {
      state.inqLoading = true;
    });
    builder.addCase(sendInquiryThunk.fulfilled, (state, action) => {
      state.inqLoading = false;
    });
    builder.addCase(sendInquiryThunk.rejected, (state, action) => {
      state.inqLoading = false;
    });

    //send
    builder.addCase(getInquiryThunk.pending, (state, action) => {
      state.inqLoading = true;
    });
    builder.addCase(getInquiryThunk.fulfilled, (state, action) => {
      state.inqLoading = false;
      state.allInq = action?.payload?.response?.allInq;
    });
    builder.addCase(getInquiryThunk.rejected, (state, action) => {
      state.inqLoading = false;
    });
  },
});

export default inquirySlice.reducer;
