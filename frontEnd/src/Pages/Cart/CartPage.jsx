import Navbar from "../Landing/Components/Navbar";
import TagLine from "../Landing/Components/TagLine";
import Footer from "../Landing/Components/Footer";
import ScrollToTopButton from "../Landing/Components/ScrollToTopButton";
import NewsLetter from "../Landing/Components/NewsLetter";
import { useState } from "react";
import { FaRegTrashAlt, FaStar } from "react-icons/fa";
import BreadCrum from "../Landing/Components/BreadCrum";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteCartThunk, getCartThunk } from "../../../store/users/user.thunk";
import { getCartProductsThunk } from "../../../store/products/product.thunk";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { getPaymentThunk } from "../../../store/payment/payment.thunk";
import { loadStripe } from "@stripe/stripe-js";

const CartPage = () => {
  const prodAdd = useRef();
  const [value, setValue] = useState({});
  const dispatch = useDispatch();
  const { cart, userProfile } = useSelector((state) => state.userSlice);
  const { cartProducts, productLoading } = useSelector(
    (state) => state.productSlice
  );
  const subTotal = 0;
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  useEffect(() => {
    dispatch(getCartThunk());
  }, [dispatch]);

  useEffect(() => {
    if (cartProducts) {
      const initialQuans = {};
      cartProducts.forEach((p) => {
        initialQuans[p._id] = 1;
      });
      setValue(initialQuans);
    }
  }, [cartProducts]);

  const handleAdd = (id) => {
    setValue((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };

  const handleSub = (id) => {
    setValue((prev) => ({
      ...prev,
      [id]: Math.max(1, prev[id] - 1),
    }));
  };

  useEffect(() => {
    if (cart) {
      dispatch(getCartProductsThunk(cart));
    }
  }, [cart, dispatch]);

  const onSubmit = async (data) => {
    const stripe = await loadStripe(
      import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
    );

    const response = await dispatch(getPaymentThunk({ orders: cartProducts, quantity: value }));

    const result = stripe.redirectToCheckout({
      sessionId: response.payload.id,
    });
  };

  return (
    <>
      <ScrollToTopButton />
      <TagLine />
      <Navbar value="cart" />

      <BreadCrum />

      {/* heading  */}
      <div className="mainHeading flex flex-col justify-start items-start mb-10 tracking-wide px-5 mt-5 md:px-10 lg:mt-10 2xl:w-[1500px] 2xl:mx-auto">
        <h1 className="py-3 text-start text-3xl md:text-4xl font-bold">
          Cart:
        </h1>
        <span className="bg-Red text-center w-[50px] lg:w-[3%] h-1"></span>
      </div>

      {/* heading 2 */}
      <div className="mainHeading px-5 md:px-10 2xl:w-[1500px] 2xl:mx-auto flex justify-between items-start tracking-wide sm:text-lg">
        <p>PRODUCT</p>
        <p>TOTAL</p>
      </div>

      {/* products div  */}
      <div className="px-5 mt-5 md:px-10 2xl:w-[1500px] 2xl:mx-auto w-full flex gap-x-3 flex-col">
        {!cartProducts.length && !productLoading ? (
          <div className="mainHeading flex flex-col justify-start items-start md:justify-center md:items-center mb-15 tracking-wide px-5 mt-5 md:px-10 lg:mt-10 2xl:w-[1500px] 2xl:mx-auto">
            <h1 className="py-3 text-center text-2xl md:text-4xl font-bold">
              No Product in Cart!
            </h1>
            <span className="bg-Red w-[100px] lg:w-[10%] h-1"></span>
          </div>
        ) : (
          <></>
        )}
        {cartProducts && !productLoading ? (
          cartProducts.map((product, index) => (
            <div
              key={index}
              className={`item flex w-full items-start h-fit flex-row gap-1 justify-between md:border-1 border-transparent border-t-GrayLight pt-6`}
            >
              {/* images  */}
              <div
                className={`relative group flex justify-center items-center h-full lg:h-40 transition-all duration-300 ease-in-out w-[30%] md:w-[20%]`}
              >
                {/* Normal Image */}
                <img
                  src={product.productImages?.[1]}
                  className="w-full h-full object-cover transition-opacity duration-500 ease-in-out"
                  alt="product"
                />
              </div>

              {/* content  */}
              <div
                className={`flex flex-col gap-3 md:flex-row justify-between items-start md:items-center w-[50%] flex-1 mx-3`}
              >
                {/* text  */}
                <div className="flex flex-col justify-start items-start w-full lg:w-[60%] lg:justify-between">
                  <p className="text-center font-medium text-Gray text-sm sm:text-base mt-1 ">
                    {product.productName}
                  </p>
                  <h4
                    className={`text-start font-medium tracking-wide text-md sm:text-lg w-full`}
                  >
                    {product.productDescription}
                  </h4>

                  <div className="flex justify-end w-full items-center gap-2 text-sm sm:text-base mt-1">
                    <p className="text-center text-Gray mr-5 font-bold tracking-wide">
                      $
                      {product.productDiscount
                        ? (
                            Number(product.productPrice) -
                            (Number(product.productPrice) *
                              product.productDiscount) /
                              100
                          ).toFixed(2)
                        : product.productPrice.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* delete */}
                <div className="flex gap-2 items-center justify-around mt-3 w-fit lg:w-[40%] lg:justify-center ">
                  <div className="sm:py-1 w-[8rem] border-1 border-GrayLight hover:cursor-point flex justify-around items-center text-xl text-Gray [&>button]:hover:cursor-pointer">
                    <button onClick={() => handleSub(product._id)}>-</button>
                    <p className="text-lg">{value[product._id]}</p>
                    <button onClick={() => handleAdd(product._id)}>+</button>
                  </div>

                  <button
                    onClick={async () => {
                      const response = await dispatch(
                        deleteCartThunk({
                          userId: userProfile._id,
                          productId: product._id,
                        })
                      );
                      if (response?.payload?.success) {
                        toast.success("Removed from cart!");
                        dispatch(getCartThunk());
                        return;
                      }
                      toast.error("Error Occured!");
                    }}
                    className="p-1 sm:p-2 w-fit h-full bg-[#c5172e] text-white hover:cursor-pointer transition duration-200 ease-in-out active:translate-y-1 flex justify-around items-center text-xl"
                  >
                    <FaRegTrashAlt />
                  </button>
                </div>
              </div>

              {/* TOTAL */}
              <div className="w-[20%] md:w-[10%] flex justify-end items-start">
                <p className="text-center text-Red font-bold tracking-wide text-lg">
                  $
                  {product.productDiscount
                    ? (
                        (Number(product.productPrice) -
                          (Number(product.productPrice) *
                            product.productDiscount) /
                            100) *
                        value[product._id]
                      ).toFixed(2)
                    : (product.productPrice * value[product._id]).toFixed(2)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className={`item flex w-full items-start justify-between pt-6`}>
            <ClipLoader />
          </div>
        )}
      </div>

      {/* subtotal */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex justify-center md:justify-end items-center px-5 mt-15  md:px-10 2xl:w-[1500px] 2xl:mx-auto"
      >
        <div className="w-full md:w-[60%] lg:w-[35%] flex flex-col justify-center md:justify-end items-center">
          <h1
            className={`text-center md:text-end font-semibold tracking-wide text-xl w-full`}
          >
            Subtotal $
            {cartProducts.reduce((sum, product) => {
              let price = product.productDiscount
                ? (Number(product.productPrice) -
                    (Number(product.productPrice) * product.productDiscount) /
                      100) *
                  value[product._id]
                : product.productPrice * value[product._id];

              return (sum += price);
            }, 0)}
          </h1>

          <div className="w-full text-center group hover:cursor-pointer text-Gray text-sm sm:text-base mt-1 flex justify-center md:justify-end items-center gap-2">
            <label>
              <input
                {...register("terms", {
                  required: "You must accept our terms & conditions.",
                })}
                type="checkbox"
                className="hover:cursor-pointer px-2"
              />{" "}
              Agreed with our
              <span className="group-hover:underline"> terms & conditions</span>
            </label>
          </div>
          <span className="text-Red text-sm p-3 text-end w-full">
            {errors.terms?.message}
          </span>
          <div className="w-full flex justify-center md:justify-end">
            <button
              type="submit"
              className="bg-Red text-white w-[70%] py-3 px-5 font-[500] transition-all duration-150 ease-in-out active:translate-y-1 mt-5 hover:cursor-pointer"
            >
              CHECK OUT
            </button>
          </div>
        </div>
      </form>

      <NewsLetter />
      <Footer />
    </>
  );
};

export default CartPage;
