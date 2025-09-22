import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { ProductModel } from "../models/products.model.js";
import ErrorHandler from "../utilities/customError.utility.js";

export const addProduct = asyncHandler(async (req, res, next) => {
  const {
    productName,
    productStock,
    productDescription,
    productPrice,
    productBrand,
    productCategory,
    productDiscount,
  } = req.body;
  const imageFiles = req.files.map(
    (file) => process.env.IMAGE_URI + file.filename
  );

  let product = await ProductModel.findOne({ productName });
  if (product) {
    return next(new ErrorHandler("Product Exists!", 409));
  }

  product = await ProductModel.create({
    productName,
    productStock,
    productDescription,
    productPrice,
    productBrand,
    productCategory,
    productDiscount,
    productImages: imageFiles,
  });

  res.status(201).json({
    success: true,
    response: { product },
  });
});

export const popularProducts = asyncHandler(async (req, res, next) => {
  const { rating } = req.body;
  const sort = {};

  if (rating) sort["productRating"] = -1;

  let products = await ProductModel.find({}).limit(10).sort(sort);

  if (!products) {
    return next(new ErrorHandler("Products not found!", 404));
  }

  res.status(201).json({
    success: true,
    response: {
      products,
    },
  });
});

export const allProducts = asyncHandler(async (req, res, next) => {
  const { prods } = req.body;
  const sort = {};

  if (prods) sort["createdAt"] = -1;

  let products = await ProductModel.find({}).limit(10).sort(sort);

  if (!products) {
    return next(new ErrorHandler("Products not found!", 404));
  }

  res.status(201).json({
    success: true,
    response: {
      products,
    },
  });
});

export const dealsProducts = asyncHandler(async (req, res, next) => {
  const { deals } = req.body;
  const sort = {};

  if (deals) sort["productDiscount"] = -1;

  let products = await ProductModel.find({}).limit(10).sort(sort);

  if (!products) {
    return next(new ErrorHandler("Products not found!", 404));
  }

  res.status(201).json({
    success: true,
    response: {
      products,
    },
  });
});

export const latestProducts = asyncHandler(async (req, res, next) => {
  const { filters, page } = req.body;

  const query = {};
  const sort = {};

  //filters
  if (filters.Availability.length && filters.Availability.length < 2) {
    filters.Availability.includes("inStock")
      ? (query["productStock"] = { $gt: 0 })
      : (query["productStock"] = 0);
  }
  if (filters.Brand.length) {
    query["productBrand"] = { $in: filters.Brand };
  }
  if (filters.Type.length) {
    query["productCategory"] = { $in: filters.Type };
  }
  if (filters.priceFrom && filters.priceTo) {
    query["productPrice"] = { $gte: filters.priceFrom, $lte: filters.priceTo };
  }
  if (filters.Sort) {
    if (filters.Sort === "L-H") sort["productPrice"] = 1;
    if (filters.Sort === "H-L") sort["productPrice"] = -1;
    if (filters.Sort === "A-Z") sort["productName"] = 1;
    if (filters.Sort === "Z-A") sort["productName"] = -1;
    if (filters.Sort === "Discount") sort["productDiscount"] = -1;
  }

  const pageNo = parseInt(page) || 1;
  const limit = 10;
  const skip = parseInt(pageNo - 1) * limit;

  let products = await ProductModel.find(query)
    .skip(skip)
    .limit(limit)
    .sort(sort);

  if (!products) {
    return next(new ErrorHandler("Products not found!", 404));
  }

  // for total products
  const totalProducts = await ProductModel.find(query);

  // //get brand and category names
  // const prodbrand = await ProductModel.find({}).distinct("productBrand");
  // const prodcategory = await ProductModel.find({}).distinct("productCategory");

  res.status(201).json({
    success: true,
    response: {
      products,
      total: Math.ceil(totalProducts.length / limit),
      currentPage: page,
      // prodbrand,
      // prodcategory,
    },
  });
});

export const updateReviews = asyncHandler(async (req, res, next) => {
  const { value, id } = req.body;

  const product = await ProductModel.findByIdAndUpdate(
    id,
    { $push: { productRating: value } },
    { new: true }
  );

  res.status(201).json({
    success: true,
    response: { product },
  });
});

export const getNav = asyncHandler(async (req, res, next) => {
  //get brand and category names
  const prodbrand = await ProductModel.find({}).distinct("productBrand");
  const prodcategory = await ProductModel.find({}).distinct("productCategory");

  res.status(200).json({
    success: true,
    response: {
      prodbrand,
      prodcategory,
    },
  });
});

export const getIndependentRoutes = asyncHandler(async (req, res, next) => {
  const { category, filters, page } = req.body;

  const prodbrand = await ProductModel.find({}).distinct("productBrand");
  const prodCategories = await ProductModel.find({}).distinct(
    "productCategory"
  );
  // console.log(prodbrand.includes(category))

  const query = {};
  const sort = {};

  //filters
  if (filters.Availability.length && filters.Availability.length < 2) {
    filters.Availability.includes("inStock")
      ? (query["productStock"] = { $gt: 0 })
      : (query["productStock"] = 0);
  }
  if (filters.Brand.length) {
    query["productBrand"] = { $in: filters.Brand };
  }
  if (prodbrand.includes(category)) {
    query["productBrand"] = { $in: category };
  }
  if (filters.Type.length) {
    query["productCategory"] = { $in: filters.Type };
  }
  if (prodCategories.includes(category)) {
    query["productCategory"] = { $in: category };
  }
  if (filters.priceFrom && filters.priceTo) {
    query["productPrice"] = { $gte: filters.priceFrom, $lte: filters.priceTo };
  }
  if (filters.Sort) {
    if (filters.Sort === "L-H") sort["productPrice"] = 1;
    if (filters.Sort === "H-L") sort["productPrice"] = -1;
    if (filters.Sort === "A-Z") sort["productName"] = 1;
    if (filters.Sort === "Z-A") sort["productName"] = -1;
    if (filters.Sort === "Discount") sort["productDiscount"] = -1;
  }

  const pageNo = page || 1;
  const limit = 10;
  const skip = (pageNo - 1) * limit;

  const product = await ProductModel.find(query)
    .limit(limit)
    .skip(skip)
    .sort(sort);

  const totalProducts = await ProductModel.find(query);

  res.status(200).json({
    success: true,
    response: {
      product,
      total: Math.ceil(totalProducts.length / limit),
      currentPage: page,
      filter: prodCategories.includes(category) ? 1 : 2,
    },
  });
});

export const getCollectionData = asyncHandler(async (req, res, next) => {
  const { categories } = req.body;

  const totalProducts = await Promise.all(
    categories.map(
      async (cat) =>
        await ProductModel.find({ productCategory: cat }).countDocuments()
    )
  );
  const collectionProducts = await Promise.all(
    categories.map(async (cat) => {
      return await ProductModel.findOne({ productCategory: cat }).sort({
        createdAt: -1,
      });
    })
  );

  res.status(200).json({
    success: true,
    response: {
      totalProducts,
      collectionProducts,
    },
  });
});

export const getSneakers = asyncHandler(async (req, res, next) => {
  const { category, filters, page } = req.body;

  const query = { productCategory: "Sneakers" };
  const sort = {};

  //filters
  if (filters.Availability.length && filters.Availability.length < 2) {
    filters.Availability.includes("inStock")
      ? (query["productStock"] = { $gt: 0 })
      : (query["productStock"] = 0);
  }
  if (category) {
    query["productBrand"] = { $in: category };
  }
  if (filters.Brand.length) {
    query["productBrand"] = { $in: filters.Brand };
  }
  if (filters.priceFrom && filters.priceTo) {
    query["productPrice"] = { $gte: filters.priceFrom, $lte: filters.priceTo };
  }
  if (filters.Sort) {
    if (filters.Sort === "L-H") sort["productPrice"] = 1;
    if (filters.Sort === "H-L") sort["productPrice"] = -1;
    if (filters.Sort === "A-Z") sort["productName"] = 1;
    if (filters.Sort === "Z-A") sort["productName"] = -1;
    if (filters.Sort === "Discount") sort["productDiscount"] = -1;
  }

  const pageNo = page || 1;
  const limit = 10;
  const skip = (pageNo - 1) * limit;

  const product = await ProductModel.find(query)
    .limit(limit)
    .skip(skip)
    .sort(sort);

  const total = await ProductModel.find(query).countDocuments();

  res.status(200).json({
    success: true,
    response: {
      product,
      page: Math.ceil(total / limit),
    },
  });
});

export const singleProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.query;

  const product = await ProductModel.findOne({ _id: id });

  const avgRating = product.productRating.reduce((sum, item) => sum + item, 0);

  res.status(200).json({
    success: true,
    response: {
      product,
    },
  });
});

export const getAllProducts = asyncHandler(async (req, res, next) => {
  const allProducts = await ProductModel.find({});

  if (!allProducts) {
    return next(new ErrorHandler("Product Doesn't Exist!", 404));
  }

  res.status(200).json({
    response: {
      allProducts,
    },
  });
});

export const updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const {
    productName,
    productStock,
    productDescription,
    productPrice,
    productBrand,
    productCategory,
    productDiscount,
  } = req.body;

  let imageFiles = [];
  if (req.files && req.files.length > 0) {
    imageFiles = req.files.map(
      (file) => process.env.IMAGE_URI + file.filename
    );
  }

  const data = {
    productName,
    productStock,
    productDescription,
    productPrice,
    productBrand,
    productCategory,
    productDiscount,
    ...(imageFiles.length > 0 && { productImages: imageFiles }),
  };

  const product = await ProductModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(new ErrorHandler("Product not found!", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

export const getProductForUpdate = asyncHandler(async (req, res, next) => {
  const { id } = req.query;

  const product = await ProductModel.findById(id);

  if (!product) {
    return next(new ErrorHandler("Product Doesn't Exist!", 404));
  }

  res.status(200).json({
    response: {
      product,
    },
  });
});

export const deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await ProductModel.findByIdAndDelete(id);

  if (!product) return next(new ErrorHandler("Product not found!", 404));

  const remainingProds = await ProductModel.find();

  res.status(204).json({
    response: {
      success: true,
      message: "Deletion Successfull!",
      remainingProds,
    },
  });
});

//cart, favorite, orders

export const getCartProducts = asyncHandler(async (req, res, next) => {
  const { cart } = req.body;

  const cartProducts = await ProductModel.find({ _id: { $in: cart } });

  res.status(200).json({
    success: true,
    response: {
      cartProducts,
      totalCartProducts: cartProducts.length,
    },
  });
});
