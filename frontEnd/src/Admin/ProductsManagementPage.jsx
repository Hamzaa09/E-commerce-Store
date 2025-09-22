import SideBarComponent from "./SideBarComponent";
import AdminNav from "./AdminNav";
import PageChunk from "./Divs/PageChunk";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductThunk,
  updateProductThunk,
} from "../../store/products/product.thunk";
import toast from "react-hot-toast";

const ProductsManagementPage = () => {
  const [addProduct, setAddProduct] = useState(false);
  const [images, setImages] = useState([]);
  const [error, seterror] = useState("");
  const { prodForUpdate } = useSelector((state) => state.productSlice);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  useEffect(() => {
    if (prodForUpdate) {
      setAddProduct(true);
      reset({
        productName: prodForUpdate.productName,
        productStock: prodForUpdate.productStock,
        productDescription: prodForUpdate.productDescription,
        productPrice: prodForUpdate.productPrice,
        productBrand: prodForUpdate.productBrand,
        productCategory: prodForUpdate.productCategory,
        productDiscount: prodForUpdate.productDiscount,
      });
    }
  }, [reset, prodForUpdate]);

  const onSubmit = async (data) => {
    try {
      if (!prodForUpdate && images.length === 0) {
        return seterror("Product image Requied!");
      }

      if (prodForUpdate) {
        const response = await dispatch(
          updateProductThunk({ id: prodForUpdate._id, formValues: data })
        );
        if (!response?.payload?.success) {
          toast.error(response?.payload?.message || "Process failed!");
          window.location.reload()
          return;
        }

        toast.success("Product Updated!");

        reset();
        setImages([]);
        seterror("");
        setAddProduct(false);
      } else {
        const response = await dispatch(addProductThunk(data));
        if (!response?.payload?.success) {
          toast.error(response?.payload?.message || "Process failed!");
          return;
        }

        toast.success("Product Added!");

        reset();
        setImages([]);
        seterror("");
        setAddProduct(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const total = images.length + files.length;

    if (total > 10) {
      seterror("Maximum 10 images are allowed!");
      return;
    }

    const updatedImages = [...images, ...files];
    setImages(updatedImages);
    setValue("productImages", updatedImages);
  };

  return (
    <div className="flex w-full">
      <div className="flex">
        <SideBarComponent value={"productsManagement"} />
      </div>

      <div className="flex flex-col w-full bg-WhiteLight overflow-auto">
        <AdminNav />

        {/* Page's Main Content  */}

        {/* Add A Product  */}
        <div className="w-full p-5 b-0">
          <div
            className={`w-full h-fit bg-white border border-GrayLight rounded-lg `}
          >
            {/* text & Search */}
            <div className="flex justify-between items-center border border-transparent border-b-GrayLight py-3 px-5">
              <h2 className="p-2 font-semibold text-2xl text-black">
                Add New Product
              </h2>

              <button
                onClick={() => setAddProduct(true)}
                className="w-[50%] bigSm:w-[25%] lg:w-[15%] text-white text-sm lg:text-lg font-medium bg-Red py-3 lg:py-2 active:translate-y-1 hover:cursor-pointer hover:opacity-100 hover:shadow-md/10 rounded-md transition duration-300 ease-in-out text-center"
              >
                ADD +
              </button>
            </div>

            {/* form  */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={`${
                addProduct ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
              } overflow-hidden flex flex-col mt-5 lg:mt-8 xl:mt-10 gap-4 md:gap-3 justify-center items-center relative py-5 transition-all duration-300 ease-in-out`}
            >
              {/* image  */}
              <div className="relative w-[90%]">
                <div className="relative w-full h-34 border border-GrayLight flex gap-2 p-2 overflow-x-auto">
                  <label className="min-w-[100px] max-w-[100px] h-[100px] bg-GrayLight flex justify-center items-center text-2xl rounded-xl cursor-pointer relative active:translate-y-1 transition-all duration-300 ease-in-out hover:opacity-80">
                    +
                    <input
                      type="file"
                      onChange={handleImageChange}
                      name="productImages"
                      multiple
                      accept="image/*"
                      className="absolute w-full h-full opacity-0 cursor-pointer"
                    />
                  </label>

                  {/* {images previeqw} */}
                  {images.map((file, index) => (
                    <div
                      key={index}
                      className="min-w-[100px] max-w-[100px] h-[100px] bg-GrayLight flex justify-center items-center text-2xl rounded-xl cursor-pointer relative active:translate-y-1 transition-all duration-300 ease-in-out"
                    >
                      <img
                        key={index}
                        src={URL.createObjectURL(file)}
                        alt="product"
                        className="h-full w-full rounded-xl"
                      />
                      <IoIosClose
                        className="absolute hover:bg-GrayLight rounded-full top-1 right-1"
                        onClick={(e) => {
                          const updateImages = images.filter(
                            (_, i) => i !== index
                          );
                          setImages(updateImages);
                          setValue("productImages", updateImages);
                        }}
                      />
                    </div>
                  ))}
                </div>
                <span
                  className={`text-sm ${error ? "text-Red" : "text-Gray"} px-2`}
                >
                  {error || "Add Product Images"}
                </span>
              </div>

              {/* name  */}
              <div className="relative w-[90%]">
                <div className="w-full border border-GrayLight">
                  <input
                    type="text"
                    {...register("productName", {
                      required: "Product Name Required!",
                      minLength: {
                        value: 2,
                        message: "Product name too short!",
                      },
                    })}
                    id="productName"
                    className="peer border-0 border-GrayLight outline-0 px-5 sm:px-5 pt-3 pb-2 sm:pt-4 sm:pb-3 text-md w-full"
                    placeholder=" "
                  />
                  <label
                    htmlFor="productName"
                    className={`absolute left-0 py-2 sm:py-3 translate-y-[-35%] scale-[0.7] px-3 peer-placeholder-shown:px-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-0 text-Gray text-md sm:text-lg transition-all duration-150 peer-focus:translate-y-[-35%] peer-focus:scale-[0.7] peer-focus:px-3 hover:cursor-text select-none`}
                  >
                    Name<span className="text-Red"> *</span>
                  </label>
                </div>
                {errors?.productName?.message && (
                  <span className="text-sm text-Red px-2">
                    {errors?.productName?.message}
                  </span>
                )}
              </div>

              {/* price & disc  */}
              <div className="flex w-[90%] flex-col md:flex-row gap-4">
                <div className="w-full">
                  <div className="relative w-full border border-GrayLight">
                    <input
                      type="number"
                      {...register("productDiscount", {
                        minLength: {
                          value: 1,
                          message: "Invalid Discount!",
                        },
                      })}
                      id="productDiscount"
                      className="peer border-0 border-GrayLight outline-0 px-5 sm:px-5 pt-3 pb-2 sm:pt-4 sm:pb-3 text-md w-full"
                      placeholder=" "
                    />
                    <label
                      htmlFor="productDiscount"
                      className={`absolute left-0 py-2 sm:py-3 translate-y-[-35%] scale-[0.7] px-3 peer-placeholder-shown:px-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-0 text-Gray text-md sm:text-lg transition-all duration-150 peer-focus:translate-y-[-35%] peer-focus:scale-[0.7] peer-focus:px-3 hover:cursor-text select-none`}
                    >
                      Discount
                    </label>
                  </div>
                  {errors?.productDiscount?.message && (
                    <span className="text-sm text-Red px-2">
                      {errors?.productDiscount?.message}
                    </span>
                  )}
                </div>

                <div className="w-full">
                  <div className="relative w-full border border-GrayLight">
                    <input
                      type="number"
                      {...register("productPrice", {
                        required: "Price must be added!",
                      })}
                      id="productPrice"
                      className="peer border-0 border-GrayLight outline-0 px-5 sm:px-5 pt-3 pb-2 sm:pt-4 sm:pb-3 text-md w-full"
                      placeholder=" "
                    />
                    <label
                      htmlFor="productPrice"
                      className={`absolute left-0 py-2 sm:py-3 translate-y-[-35%] scale-[0.7] px-3 peer-placeholder-shown:px-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-0 text-Gray text-md sm:text-lg transition-all duration-150 peer-focus:translate-y-[-35%] peer-focus:scale-[0.7] peer-focus:px-3 hover:cursor-text select-none`}
                    >
                      Price<span className="text-Red"> *</span>
                    </label>
                  </div>
                  {errors?.productPrice?.message && (
                    <span className="text-sm text-Red px-2">
                      {errors?.productPrice?.message}
                    </span>
                  )}
                </div>
              </div>

              {/* brand & cat  */}
              <div className="flex w-[90%] flex-col md:flex-row gap-4">
                <div className="w-full">
                  <div className="relative w-full border border-GrayLight">
                    <input
                      type="text"
                      {...register("productBrand", {
                        required: "Brand name Required!",
                        minLength: {
                          value: 2,
                          message: "Brand name too short!",
                        },
                      })}
                      id="productBrand"
                      className="peer border-0 border-GrayLight outline-0 px-5 sm:px-5 pt-3 pb-2 sm:pt-4 sm:pb-3 text-md w-full"
                      placeholder=" "
                    />
                    <label
                      htmlFor="productBrand"
                      className={`absolute left-0 py-2 sm:py-3 translate-y-[-35%] scale-[0.7] px-3 peer-placeholder-shown:px-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-0 text-Gray text-md sm:text-lg transition-all duration-150 peer-focus:translate-y-[-35%] peer-focus:scale-[0.7] peer-focus:px-3 hover:cursor-text select-none`}
                    >
                      Brand<span className="text-Red"> *</span>
                    </label>
                  </div>
                  {errors?.productBrand?.message && (
                    <span className="text-sm text-Red px-2">
                      {errors?.productBrand?.message}
                    </span>
                  )}
                </div>

                <div className="w-full">
                  <div className="relative w-full border border-GrayLight">
                    <input
                      type="text"
                      {...register("productCategory", {
                        required: "Category Requied!",
                        minLength: {
                          value: 2,
                          message: "Category too short!",
                        },
                      })}
                      id="productCategory"
                      className="peer border-0 border-GrayLight outline-0 px-5 sm:px-5 pt-3 pb-2 sm:pt-4 sm:pb-3 text-md w-full"
                      placeholder=" "
                    />
                    <label
                      htmlFor="productCategory"
                      className={`absolute left-0 py-2 sm:py-3 translate-y-[-35%] scale-[0.7] px-2 peer-placeholder-shown:px-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-0 text-Gray text-md sm:text-lg transition-all duration-150 peer-focus:translate-y-[-35%] peer-focus:scale-[0.7] peer-focus:px-2 hover:cursor-text select-none`}
                    >
                      Category<span className="text-Red"> *</span>
                    </label>
                  </div>
                  {errors?.productCategory?.message && (
                    <span className="text-sm text-Red px-2">
                      {errors?.productCategory?.message}
                    </span>
                  )}
                </div>
              </div>

              {/* stock  */}
              <div className="relative w-[90%]">
                <div className="w-full border border-GrayLight">
                  <input
                    type="number"
                    {...register("productStock", {
                      required: "Stock Required!",
                    })}
                    id="productStock"
                    className="peer border-0 border-GrayLight outline-0 px-5 sm:px-5 pt-3 pb-2 sm:pt-4 sm:pb-3 text-md w-full"
                    placeholder=" "
                  />
                  <label
                    htmlFor="productStock"
                    className={`absolute left-0 py-2 sm:py-3 translate-y-[-35%] scale-[0.7] px-3 peer-placeholder-shown:px-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-0 text-Gray text-md sm:text-lg transition-all duration-150 peer-focus:translate-y-[-35%] peer-focus:scale-[0.7] peer-focus:px-3 hover:cursor-text select-none`}
                  >
                    Stock<span className="text-Red"> *</span>
                  </label>
                </div>
                {errors?.productStock?.message && (
                  <span className="text-sm text-Red px-2">
                    {errors?.productStock?.message}
                  </span>
                )}
              </div>

              {/* description  */}
              <div className="relative w-[90%]">
                <div className="w-full border border-GrayLight">
                  <textarea
                    {...register("productDescription", {
                      required: "Description Required!",
                      minLength: {
                        value: 10,
                        message: "Atleast 10 characters required!",
                      },
                    })}
                    id="productDescription"
                    rows={5}
                    cols={10}
                    className="peer border-0 border-GrayLight outline-0 px-5 sm:px-5 pt-3 pb-2 sm:pt-4 sm:pb-3 text-md  w-full"
                    placeholder=" "
                  />
                  <label
                    htmlFor="productDescription"
                    className={`absolute left-0 py-2 sm:py-3 translate-y-[-35%] scale-[0.7] px-2 peer-placeholder-shown:px-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-0 text-Gray text-md sm:text-lg transition-all duration-150 peer-focus:translate-y-[-35%] peer-focus:scale-[0.7] peer-focus:px-1 hover:cursor-text select-none`}
                  >
                    Description<span className="text-Red"> *</span>
                  </label>
                </div>
                {errors?.productDescription?.message && (
                  <span className="text-sm text-Red px-2">
                    {errors?.productDescription?.message}
                  </span>
                )}
              </div>

              {/* button  */}
              <div className="w-[90%] flex justify-end gap-2">
                <button
                  onClick={() => setAddProduct(false)}
                  className="text-Gray py-2 md:py-3 lg:py-2 text-sm lg:text-md  font-medium w-[30%] bigSm:w-[20%] md:w-[14%] lg:w-[10%] rounded-md border border-GrayLight hover:cursor-pointer transition duration-200 ease-in-out mt-2 lg:mt-5 active:translate-y-1"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="bg-Red text-white py-2 md:py-3 lg:py-2 text-sm lg:text-md  font-medium w-[30%] bigSm:w-[20%] md:w-[14%] lg:w-[10%] rounded-md border border-Red hover:cursor-pointer transition duration-200 ease-in-out mt-2 lg:mt-5 active:translate-y-1"
                >
                  {prodForUpdate ? "UPDATE" : "SAVE"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* All products  */}
        <div className="p-5">
          <PageChunk
            value={{
              pageName: "productsManagement",
              pageHeading: "All Products",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsManagementPage;
