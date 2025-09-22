import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
    },
    productCategory: {
      type: String,
    },
    productPrice: {
      type: Number,
    },
    productBrand: {
      type: String,
    },
    productDescription: {
      type: String,
    },
    productDiscount: {
      type: Number,
    },
    productStock: {
      type: Number,
    },
    productRating: {
      type: [Number],
      default: 0,
    },
    productImages: {
      type: [],
    },
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model("ProductModel", productSchema);
