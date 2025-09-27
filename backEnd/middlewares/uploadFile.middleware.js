import multer from "multer";
import path from "path";
import ErrorHandler from "../utilities/customError.utility.js";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const updateDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(updateDir)) {
  fs.mkdirSync(updateDir, { recursive: true });
}

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb, next) => {
  const allowed = /jpeg|jpg|png|webp/;
  const ext = allowed.test(path.extname(file.originalname).toLowerCase());
  const mine = allowed.test(file.mimetype);

  if (ext && mine) cb(null, true);
  else cb(new ErrorHandler("Only images are allowed!", 404), false);
};

export const upload = multer({
  storage,
  fileFilter,
});
