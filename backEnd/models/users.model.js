import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    country: {
      type: String,
      default: "Not Added",
    },
    number: {
      type: String,
      default: "Not Added",
    },
    address: {
      type: String,
      default: "Not Added",
    },
    orders: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "productmodel",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        orderedAt: { type: Date, default: Date.now },

        status: { type: String, default: "Processing" },
      },
    ],
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productmodel",
      },
    ],
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("UserModel", userSchema);
