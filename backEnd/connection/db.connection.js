import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("DB connected Successfully!");
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
};
