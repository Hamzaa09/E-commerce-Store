import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    inqEmail: {
      type: String,
      required: true,
    },
    inqText: {
      type: String,
      required: true,
    },
    inqNumber: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const InquiryModel = mongoose.model("InquiryModel", inquirySchema);
