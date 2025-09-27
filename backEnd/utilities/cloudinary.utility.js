import cloudinaryPkg from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const cloudinary = cloudinaryPkg.v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("Cloudinary: ", process.env.CLOUDINARY_NAME);

const uploadToCloudinary = async (localPath) => {
  try {
    if (!localPath) return;

    const result = await cloudinary.uploader.upload(localPath, {
      resource_type: "auto",
    });

    fs.unlinkSync(localPath);

    return result;
  } catch (error) {
    fs.unlinkSync(localPath);
    console.log("Error: ", error);
    return null;
  }
};

export { uploadToCloudinary };
