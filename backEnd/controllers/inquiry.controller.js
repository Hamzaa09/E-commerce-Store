import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import ErrorHandler from "../utilities/customError.utility.js";
import { InquiryModel } from "../models/inquiries.model.js";

export const sendInquiry = asyncHandler(async (req, res, next) => {
  const { inqEmail, inqText, inqNumber } = req.body;

  const inquiry = await InquiryModel.create({
    inqEmail,
    inqText,
    inqNumber,
  });

  res.status(201).json({
    success: true,
    response: {
      inquiry,
    },
  });
});

export const getInquiry = asyncHandler(async (req, res, next) => {
  const allInq = await InquiryModel.find({});

  if (!allInq) return next(new ErrorHandler("No inquiry found!", 404));

  res.status(200).json({
    success: true,
    response: {
      allInq,
    },
  });
});
