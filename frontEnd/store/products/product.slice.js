import { createSlice } from "@reduxjs/toolkit";
import {
  addProductThunk,
  deleteProductThunk,
  getAllProductsThunk,
  getAllProductThunk,
  getCartProductsThunk,
  getCollectionDataThunk,
  getDealsProductsThunk,
  getIndependentRoutesThunk,
  getNavThunk,
  getPopularProductsThunk,
  getProductForUpdateThunk,
  getProductsThunk,
  getSingleProductThunk,
  getSneakersThunk,
  updateReviewThunk,
} from "./product.thunk";

const initialState = {
  allProducts: [],
  popProducts: [],
  dealsProducts: [],
  halfAllProducts: [],
  totalPages: null,
  totalProducts: null,
  whichfilter: null,
  productLoading: false,
  prodBrands: [],
  prodCategories: [],
  collectionProducts: [],
  collectionItems: [],
  allSneakers: [],
  sneakerPages: null,
  singleProd: null,
  cartProducts: [],
  totalCartProducts: null,
  completeProducts: [],
  prodForUpdate: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //post product
    builder.addCase(getProductForUpdateThunk.pending, (state, action) => {});
    builder.addCase(getProductForUpdateThunk.fulfilled, (state, action) => {
      state.prodForUpdate = action?.payload?.response?.product;
    });
    builder.addCase(getProductForUpdateThunk.rejected, (state, action) => {});

    //delete prods
    builder.addCase(deleteProductThunk.pending, (state, action) => {});
    builder.addCase(deleteProductThunk.fulfilled, (state, action) => {
      state.completeProducts = action?.payload?.response?.remainingProds;
    });
    builder.addCase(deleteProductThunk.rejected, (state, action) => {});

    //get products
    builder.addCase(getProductsThunk.pending, (state, action) => {
      state.productLoading = true;
    });
    builder.addCase(getProductsThunk.fulfilled, (state, action) => {
      state.allProducts = action?.payload?.response?.products;
      state.totalPages = action?.payload?.response?.total;
      state.productLoading = false;
    });
    builder.addCase(getProductsThunk.rejected, (state, action) => {
      state.productLoading = false;
      state.allProducts = [];
    });

    // all Products

    builder.addCase(getAllProductThunk.pending, (state, action) => {
      state.productLoading = true;
    });
    builder.addCase(getAllProductThunk.fulfilled, (state, action) => {
      state.completeProducts = action?.payload?.response?.allProducts;
      state.productLoading = false;
    });
    builder.addCase(getAllProductThunk.rejected, (state, action) => {
      state.productLoading = false;
      state.allProducts = [];
    });

    //independent routes
    builder.addCase(getIndependentRoutesThunk.pending, (state, action) => {
      state.productLoading = true;
    });
    builder.addCase(getIndependentRoutesThunk.fulfilled, (state, action) => {
      state.productLoading = false;
      state.allProducts = action?.payload?.response?.product;
      state.totalPages = action?.payload?.response?.total;
      state.whichfilter = action?.payload?.response?.filter;
    });
    builder.addCase(getIndependentRoutesThunk.rejected, (state, action) => {
      state.productLoading = false;
      state.allProducts = [];
    });

    //popular products
    builder.addCase(getPopularProductsThunk.pending, (state, action) => {
      state.productLoading = true;
    });
    builder.addCase(getPopularProductsThunk.fulfilled, (state, action) => {
      state.productLoading = false;
      state.popProducts = action?.payload?.response?.products;
    });
    builder.addCase(getPopularProductsThunk.rejected, (state, action) => {
      state.productLoading = false;
      state.allProducts = [];
    });

    //deals products
    builder.addCase(getDealsProductsThunk.pending, (state, action) => {
      state.productLoading = true;
    });
    builder.addCase(getDealsProductsThunk.fulfilled, (state, action) => {
      state.productLoading = false;
      state.dealsProducts = action?.payload?.response?.products;
    });
    builder.addCase(getDealsProductsThunk.rejected, (state, action) => {
      state.productLoading = false;
      state.allProducts = [];
    });

    //all products
    builder.addCase(getAllProductsThunk.pending, (state, action) => {
      state.productLoading = true;
    });
    builder.addCase(getAllProductsThunk.fulfilled, (state, action) => {
      state.productLoading = false;
      state.halfAllProducts = action?.payload?.response?.products;
    });
    builder.addCase(getAllProductsThunk.rejected, (state, action) => {
      state.productLoading = false;
      state.allProducts = [];
    });

    //get nav
    builder.addCase(getNavThunk.pending, (state, action) => {
      state.productLoading = true;
    });
    builder.addCase(getNavThunk.fulfilled, (state, action) => {
      state.productLoading = false;
      state.prodBrands = action?.payload?.response?.prodbrand;
      state.prodCategories = action?.payload?.response?.prodcategory;
    });
    builder.addCase(getNavThunk.rejected, (state, action) => {
      state.productLoading = false;
      state.allProducts = [];
    });

    //getCollection
    builder.addCase(getCollectionDataThunk.pending, (state, action) => {
      state.productLoading = true;
    });
    builder.addCase(getCollectionDataThunk.fulfilled, (state, action) => {
      state.productLoading = false;
      state.collectionItems = action?.payload?.response?.totalProducts;
      state.collectionProducts = action?.payload?.response?.collectionProducts;
    });
    builder.addCase(getCollectionDataThunk.rejected, (state, action) => {
      state.productLoading = false;
    });

    //get Sneakers
    builder.addCase(getSneakersThunk.pending, (state, action) => {
      state.productLoading = true;
    });
    builder.addCase(getSneakersThunk.fulfilled, (state, action) => {
      state.productLoading = false;
      state.allSneakers = action?.payload?.response?.product;
      state.sneakerPages = action?.payload?.response?.page;
    });
    builder.addCase(getSneakersThunk.rejected, (state, action) => {
      state.productLoading = false;
    });

    //get single  prod
    builder.addCase(getSingleProductThunk.pending, (state, action) => {
      state.productLoading = true;
    });
    builder.addCase(getSingleProductThunk.fulfilled, (state, action) => {
      state.productLoading = false;
      state.singleProd = action?.payload?.response?.product;
    });
    builder.addCase(getSingleProductThunk.rejected, (state, action) => {
      state.productLoading = false;
    });

    //get cart  prod
    builder.addCase(getCartProductsThunk.pending, (state, action) => {
      state.productLoading = true;
    });
    builder.addCase(getCartProductsThunk.fulfilled, (state, action) => {
      state.productLoading = false;
      state.cartProducts = action?.payload?.response?.cartProducts;
      state.totalCartProducts = action?.payload?.response?.totalCartProducts;
    });
    builder.addCase(getCartProductsThunk.rejected, (state, action) => {
      state.productLoading = false;
    });
  },
});

export default productSlice.reducer;
