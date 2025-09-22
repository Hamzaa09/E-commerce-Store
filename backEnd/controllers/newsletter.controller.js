// controllers/newsletterController.js
import { NewsletterModel } from "../models/newsletter.model.js";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { sendEmail } from "../utilities/newsletter.utility.js";

// ✅ Subscribe
export const subscribe = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  }

  const existing = await NewsletterModel.findOne({ email });
  if (existing) {
    return res
      .status(400)
      .json({ success: false, message: "Already subscribed" });
  }

  const newSub = await NewsletterModel.create({ email });

  // Send welcome email
  await sendEmail({
    to: email,
    subject: "🎉 Welcome to Our Newsletter!",
    text: `Hi, thanks for subscribing to our store newsletter!`,
    html: `<h2>Welcome to Our Store 🎉</h2>
           <p>Hi there,</p>
           <p>Thanks for subscribing to our newsletter. You’ll now get updates on our latest products, deals, and offers!</p>
           <p>Stay connected,<br><strong>Your Store Team</strong></p>`,
  });

  res.status(201).json({
    success: true,
    response: {
      message: "Subscribed successfully! Welcome email sent.",
      data: newSub,
    },
  });
});

// ✅ Unsubscribe
// export const unsubscribe = asyncHandler(async (req, res) => {
//   const { email } = req.body;

//   const removed = await NewsletterModel.findOneAndDelete({ email });
//   if (!removed) {
//     return res.status(404).json({ success: false, message: "Email not found" });
//   }

//   res.json({ success: true, message: "Unsubscribed successfully!" });
// });

// ✅ Get all subscribers (Admin)
export const getSubscribers = asyncHandler(async (req, res) => {
  const subs = await NewsletterModel.find().sort({ subscribedAt: -1 });
  res.json({ success: true, response: { data: subs } });
});
