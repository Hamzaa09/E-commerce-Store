import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import ErrorHandler from "../utilities/customError.utility.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET);

export const getPayment = asyncHandler(async (req, res, next) => {
  const { orders, quantity } = req.body;
  const ordersId = orders.map((item) => item._id);
  const lineitems = orders.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.productName,
        images: [item.productImages[0]],
      },
      unit_amount: Math.round(item.productPrice * 100),
    },
    quantity: quantity[item._id] || quantity[0],
  }));

  const session = await stripe.checkout.sessions.create({
    line_items: lineitems,
    mode: "payment",
    success_url:
      process.env.FRONTEND_URI + "/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: process.env.FRONTEND_URI + "/cancel",
    metadata: {
      orders: JSON.stringify(ordersId),
      quantity: JSON.stringify(quantity),
    },
  });

  res.json({ id: session.id });
});

export const getSession = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const session = await stripe.checkout.sessions.retrieve(id);

  res.json({ session });
});
