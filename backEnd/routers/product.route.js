import express from "express";
import { upload } from "../middlewares/uploadFile.middleware.js";
import {
  addProduct,
  allProducts,
  dealsProducts,
  deleteProduct,
  getAllProducts,
  getCartProducts,
  getCollectionData,
  getIndependentRoutes,
  getNav,
  getProductForUpdate,
  getSneakers,
  latestProducts,
  popularProducts,
  singleProduct,
  updateProduct,
  updateReviews,
} from "../controllers/product.controller.js";
import { authCheckMiddleware } from "../middlewares/auth.middleware.js";
import { adminCheck } from "../middlewares/admin.middleware.js";

const router = express.Router();

router.post(
  "/addProduct",
  authCheckMiddleware,
  adminCheck,
  upload.array("productImages", 10),
  addProduct
);
router.patch(
  "/updateProduct/:id",
  authCheckMiddleware,
  adminCheck,
  upload.array("productImages", 10),
  addProduct,
  updateProduct
);
router.post("/getProducts", latestProducts);
router.post("/popularProducts", popularProducts);
router.post("/dealsProducts", dealsProducts);
router.post("/allProducts", allProducts);
router.post("/updateReviews", updateReviews);
router.get("/getNav", getNav);
router.post("/getCollectionData", getCollectionData);
router.post("/getSneakers", getSneakers);
router.get("/singleProduct", singleProduct);
router.post("/getcartproducts", getCartProducts);
router.post("/:category", getIndependentRoutes);
router.get("/getAllProducts", getAllProducts);
router.get("/getProductForUpdate", getProductForUpdate);
router.delete("/deleteProduct/:id", deleteProduct);

export default router;
