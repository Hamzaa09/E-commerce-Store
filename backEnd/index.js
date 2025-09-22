// imports
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./connection/db.connection.js";
import UserRoutes from "./routers/user.routes.js";
import ProductRoutes from "./routers/product.route.js";
import BlogRoutes from "./routers/blog.routes.js";
import InquiryRoutes from "./routers/inquiry.routes.js";
import PaymentRoute from "./routers/payment.route.js";
import NewsletterRoute from "./routers/newsletter.route.js";
import OrdersRoute from "./routers/order.route.js";
import cors from "cors";
import { errorMiddleWare } from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";

// pre reqs
dotenv.config();

// declarations
const app = express();
const PORT = process.env.PORT;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URI,
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// db connection
connectDB();

// routes
app.use("/user", UserRoutes);
app.use("/product", ProductRoutes);
app.use("/blog", BlogRoutes);
app.use("/inquiry", InquiryRoutes);
app.use("/stripe", PaymentRoute);
app.use("/newsletter", NewsletterRoute);
app.use("/orders", OrdersRoute);

//error middleware
app.use(errorMiddleWare);

// listen
// app.listen(PORT, () => {
//   console.log(`listening on http://localhost:${PORT}`);
// });

// for vercel
export default (req, res) => {
  return app(req, res);
};