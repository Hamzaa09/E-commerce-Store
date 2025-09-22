import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./users/user.slice";
import productSlice from "./products/product.slice";
import blogSlice from "./blogs/blog.slice";
import inquirySlice from "./inquiry/inquiry.slice.js";
import newsletterSlice from "./newsletter/newsletter.slice.js";
import paymentSlice from "./payment/payment.slice.js";
import orderSlice from "./orders/order.slice.js";

export const store = configureStore({
  reducer: {
    userSlice,
    productSlice,
    blogSlice,
    inquirySlice,
    newsletterSlice,
    paymentSlice,
    orderSlice,
  },
});
