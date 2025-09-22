import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axiosInstance } from "../../utilities/axios.instance";

export const addProductThunk = createAsyncThunk(
  "/product/addProduct",
  async (formValues, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      //appending all fields to form data
      formData.append("productName", formValues.productName);
      formData.append("productStock", formValues.productStock);
      formData.append("productDescription", formValues.productDescription);
      formData.append("productPrice", formValues.productPrice);
      formData.append("productBrand", formValues.productBrand);
      formData.append("productCategory", formValues.productCategory);
      formData.append("productDiscount", formValues.productDiscount);

      for (const image of formValues.productImages) {
        formData.append("productImages", image);
      }

      const request = await axiosInstance.post(
        "/product/addProduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return request.data;
    } catch (err) {
      const errMessage = err.response?.data?.error;
      toast.error(errMessage);
      return rejectWithValue(errMessage);
    }
  }
);

export const getProductsThunk = createAsyncThunk(
  "/product/getProducts",
  async ({ filters, page }, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.post("/product/getProducts", {
        filters,
        page,
      });

      return request.data;
    } catch (err) {
      const errMessage = err?.reponse?.data?.error;
      toast.error(errMessage);
      return rejectWithValue(errMessage);
    }
  }
);

export const getPopularProductsThunk = createAsyncThunk(
  "/product/popularProducts",
  async ({ rating }, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.post("/product/popularProducts", {
        rating,
      });

      return request.data;
    } catch (err) {
      const errMessage = err?.reponse?.data?.error;
      toast.error(errMessage);
      return rejectWithValue(errMessage);
    }
  }
);

export const getDealsProductsThunk = createAsyncThunk(
  "/product/dealsProducts",
  async ({ deals }, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.post("/product/dealsProducts", {
        deals,
      });

      return request.data;
    } catch (err) {
      const errMessage = err?.reponse?.data?.error;
      toast.error(errMessage);
      return rejectWithValue(errMessage);
    }
  }
);

export const getAllProductsThunk = createAsyncThunk(
  "/product/allProducts",
  async ({ prods }, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.post("/product/allProducts", {
        prods,
      });

      return request.data;
    } catch (err) {
      const errMessage = err?.reponse?.data?.error;
      toast.error(errMessage);
      return rejectWithValue(errMessage);
    }
  }
);

export const updateReviewThunk = createAsyncThunk(
  "/product/updateReviews",
  async ({ value, id }, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.post("/product/updateReviews", {
        value,
        id,
      });

      return request.data;
    } catch (err) {
      const errMessage = err?.response?.data?.error || "Error Updating!";
      console.log(errMessage);
      return rejectWithValue(errMessage);
    }
  }
);

export const getNavThunk = createAsyncThunk(
  "/product/getNav",
  async (_, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.get("/product/getNav");

      return request.data;
    } catch (err) {
      const errMessage = err?.response?.data?.error || "Error!";
      console.log(errMessage);
      return rejectWithValue(errMessage);
    }
  }
);

export const getIndependentRoutesThunk = createAsyncThunk(
  "/product/:category",
  async ({ category, filters, page }, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.post(`/product/${category}`, {
        category,
        filters,
        page,
      });
      return request.data;
    } catch (err) {
      const errMessage =
        err?.response?.data?.error || "Error from GetIndependent Route!";
      return rejectWithValue(errMessage);
    }
  }
);

export const getCollectionDataThunk = createAsyncThunk(
  "/product/getCollectionData",
  async ({ prodCategories }, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.post(`/product/getCollectionData`, {
        categories: prodCategories,
      });
      return request.data;
    } catch (err) {
      const errMessage =
        err?.response?.data?.error || "Error from GetIndependent Route!";
      return rejectWithValue(errMessage);
    }
  }
);

export const getSneakersThunk = createAsyncThunk(
  "/product/getSneakers",
  async ({ category, filters, page }, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.post(`/product/getSneakers`, {
        category,
        filters,
        page,
      });
      return request.data;
    } catch (err) {
      const errMessage =
        err?.response?.data?.error || "Error from GetIndependent Route!";
      return rejectWithValue(errMessage);
    }
  }
);

export const getSingleProductThunk = createAsyncThunk(
  "/product/singleProduct",
  async ({ id }, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.get("/product/singleProduct", {
        params: { id },
      });

      return request.data;
    } catch (err) {
      const errMessage = err?.response?.data?.error || "Product Error!";
      return rejectWithValue(errMessage);
    }
  }
);

export const getCartProductsThunk = createAsyncThunk(
  "/product/getcartproducts",
  async (cart, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.post(`/product/getcartproducts`, {
        cart,
      });

      return request.data;
    } catch (err) {
      const errMessage =
        err?.response?.data?.error || "Error from Cart Products!";
      return rejectWithValue(errMessage);
    }
  }
);

export const getProductForUpdateThunk = createAsyncThunk(
  "/product/getProductForUpdate",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/product/getProductForUpdate", {
        params: { id },
      });

      return data;
    } catch (err) {
      const errMessage =
        err?.response?.data?.error || "Error in fetching product for updation!";
      return rejectWithValue(err);
    }
  }
);

export const updateProductThunk = createAsyncThunk(
  "/product/updateProduct/:id",
  async ({ id, formValues }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      formData.append("productName", formValues.productName);
      formData.append("productStock", formValues.productStock);
      formData.append("productDescription", formValues.productDescription);
      formData.append("productPrice", formValues.productPrice);
      formData.append("productBrand", formValues.productBrand);
      formData.append("productCategory", formValues.productCategory);
      formData.append("productDiscount", formValues.productDiscount);

      if (formValues.productImages && formValues.productImages.length > 0) {
        for (const image of formValues.productImages) {
          formData.append("productImages", image);
        }
      }

      const { data } = await axiosInstance.patch(
        `/product/updateProduct/${id}`,
        formData
      );

      return data;
    } catch (err) {
      console.log(err);
      const errMessage =
        err?.response?.data?.error || "Error in fetching product for updation!";
      return rejectWithValue(errMessage);
    }
  }
);

export const getAllProductThunk = createAsyncThunk(
  "/product/getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.get("/product/getAllProducts");

      return request.data;
    } catch (err) {
      errMessage =
        err?.response?.data?.error || "Error in fetching all products!";
      return rejectWithValue(errMessage);
    }
  }
);

export const deleteProductThunk = createAsyncThunk(
  "/product/deleteProduct/:id",
  async (id, { rejectWithValue }) => {
    try {
      const request = await axiosInstance.delete(
        `/product/deleteProduct/${id}`
      );

      return request.data;
    } catch (err) {
      errMessage =
        err?.response?.data?.error || "Error in fetching all products!";
      return rejectWithValue(errMessage);
    }
  }
);
