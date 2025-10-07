import { createSlice } from "@reduxjs/toolkit";
import {
  addToCartThunk,
  getAllUsersCountThunk,
  getAllUsersThunk,
  getCartThunk,
  getUserThunk,
  loginUserThunk,
  logoutUserThunk,
  signupUserFacebookThunk,
  signupUserGoogleThunk,
  signupUserThunk,
  updateUserThunk,
} from "./user.thunk";

const initialState = {
  authCheck: false,
  userProfile: null,
  screenLoading: true,
  cart: null,
  cartLength: null,
  favorite: null,
  orders: null,
  allOrders: null,
  allUsers: null,
  allUsersCount: null,
  nationalCustomers: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // signup
    builder.addCase(signupUserThunk.pending, (state, action) => {
      state.authCheck = false;
      state.screenLoading = true;
    });
    builder.addCase(signupUserThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      state.authCheck = true;
      state.userProfile = action.payload?.User;
    });
    builder.addCase(signupUserThunk.rejected, (state, action) => {
      state.authCheck = false;
      state.screenLoading = false;
    });

    // login
    builder.addCase(loginUserThunk.pending, (state, action) => {
      state.screenLoading = true;
      state.authCheck = false;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      state.authCheck = true;
      state.userProfile = action.payload?.User;
    });
    builder.addCase(loginUserThunk.rejected, (state, action) => {
      state.screenLoading = false;
      state.authCheck = false;
    });

    // get user
    builder.addCase(getUserThunk.pending, (state, action) => {
      state.screenLoading = true;
      state.userProfile = null;
    });
    builder.addCase(getUserThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload?.User;
      state.authCheck = true;
      state.screenLoading = false;
    });
    builder.addCase(getUserThunk.rejected, (state, action) => {
      state.screenLoading = false;
      state.userProfile = null;
      state.authCheck = false;
    });

    // get all users count
    builder.addCase(getAllUsersCountThunk.pending, (state, action) => {
      state.userProfile = null;
    });
    builder.addCase(getAllUsersCountThunk.fulfilled, (state, action) => {
      state.allUsersCount = action.payload?.getAllUsersCount;
      state.nationalCustomers = action.payload?.nationalCustomers;
    });
    builder.addCase(getAllUsersCountThunk.rejected, (state, action) => {
    });

    // get all users
    builder.addCase(getAllUsersThunk.pending, (state, action) => {
      state.screenLoading = true;
      state.userProfile = null;
    });
    builder.addCase(getAllUsersThunk.fulfilled, (state, action) => {
      state.allUsers = action.payload?.allUsers;
      state.screenLoading = false;
    });
    builder.addCase(getAllUsersThunk.rejected, (state, action) => {
      state.screenLoading = false;
    });

    // update
    builder.addCase(updateUserThunk.pending, (state, action) => {
      state.screenLoading = true;
    });
    builder.addCase(updateUserThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      state.userProfile = action.payload?.User;
    });
    builder.addCase(updateUserThunk.rejected, (state, action) => {
      state.screenLoading = false;
    });

    // logout
    builder.addCase(logoutUserThunk.pending, (state, action) => {
      state.screenLoading = true;
    });
    builder.addCase(logoutUserThunk.fulfilled, (state, action) => {
      state.authCheck = false;
      state.screenLoading = false;
      state.userProfile = null;
    });
    builder.addCase(logoutUserThunk.rejected, (state, action) => {
      state.screenLoading = false;
    });

    // signup google
    builder.addCase(signupUserGoogleThunk.pending, (state, action) => {
      state.authCheck = false;
      state.screenLoading = true;
    });
    builder.addCase(signupUserGoogleThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload;
      state.screenLoading = false;
      state.authCheck = true;
    });
    builder.addCase(signupUserGoogleThunk.rejected, (state, action) => {
      state.authCheck = false;
      state.screenLoading = false;
    });

    // signup fb
    builder.addCase(signupUserFacebookThunk.pending, (state, action) => {
      state.authCheck = false;
      state.screenLoading = true;
    });
    builder.addCase(signupUserFacebookThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload;
      state.screenLoading = false;
      state.authCheck = true;
    });
    builder.addCase(signupUserFacebookThunk.rejected, (state, action) => {
      state.authCheck = false;
      state.screenLoading = false;
    });

    // add to cart
    builder.addCase(addToCartThunk.pending, (state, action) => {
      state.screenLoading = true;
    });
    builder.addCase(addToCartThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      state.cartLength = action?.payload?.response?.cartLength;
    });
    builder.addCase(addToCartThunk.rejected, (state, action) => {
      state.screenLoading = false;
    });

    // get to cart
    builder.addCase(getCartThunk.pending, (state, action) => {
    });
    builder.addCase(getCartThunk.fulfilled, (state, action) => {
      state.cart = action?.payload?.response?.cart;
    });
    builder.addCase(getCartThunk.rejected, (state, action) => {
    });
  },
});

export default userSlice.reducer;
