import Navbar from "../Landing/Components/Navbar";
import TagLine from "../Landing/Components/TagLine";
import Footer from "../Landing/Components/Footer";
import ScrollToTopButton from "../Landing/Components/ScrollToTopButton";
import NewsLetter from "../Landing/Components/NewsLetter";
import BreadCrum from "../Landing/Components/BreadCrum";
import ProductsSection from "../Landing/Components/ProductsSection";
import SingleProductSkeleton from "../../Skeletons/SingleProdSkeleton";

import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaAngleLeft, FaAngleRight, FaStar } from "react-icons/fa";
import { TbFileDescription } from "react-icons/tb";
import { FiTruck } from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";
import {
  getCartProductsThunk,
  getSingleProductThunk,
  updateReviewThunk,
} from "../../../store/products/product.thunk";
import { addToCartThunk, getCartThunk } from "../../../store/users/user.thunk";
import { getPaymentThunk } from "../../../store/payment/payment.thunk";

import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

const SingleProductPage = () => {
  const { id } = useParams();
  const [value, setValue] = useState(1);
  const [f1, setF1] = useState(false);
  const [f2, setF2] = useState(false);
  const dispatch = useDispatch();
  const { singleProd } = useSelector((state) => state.productSlice);
  const [image, setImage] = useState();
  const [val, setVal] = useState();
  const [hover, setHover] = useState(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const { cart, userProfile } = useSelector((state) => state.userSlice);

  useEffect(() => {
    dispatch(getCartThunk());
  }, [dispatch]);

  useEffect(() => {
    if (cart) dispatch(getCartProductsThunk(cart));
  }, [cart, dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (id) dispatch(getSingleProductThunk({ id }));
  }, [id, dispatch]);

  useEffect(() => {
    if (val) {
      dispatch(updateReviewThunk({ value: val, id }));
      dispatch(getSingleProductThunk({ id }));
    }
  }, [val]);

  useEffect(() => {
    if (singleProd) setImage(singleProd?.productImages?.[0]);
  }, [singleProd]);

  const handleClick = async (pid) => {
    if (!userProfile) return toast.error("Login Required!");
    const response = await dispatch(addToCartThunk({ productId: pid }));
    if (response?.payload?.success) {
      dispatch(getCartThunk());
      return toast.success("Added to Cart!");
    }
    toast.error("Response Error!");
  };

  const handleBuy = async () => {
    if (!userProfile) return toast.error("Login Required!");
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
    const response = await dispatch(getPaymentThunk({ orders: [singleProd], quantity: [value] }));
    stripe.redirectToCheckout({ sessionId: response.payload.id });
  };

  return (
    <>
      <ScrollToTopButton />
      <TagLine />
      <Navbar value="" />
      {singleProd && <BreadCrum value={singleProd?.productName} />}

      {/* Main container */}
      <div className="mb-20 w-full h-full flex flex-col md:flex-row md:justify-around md:gap-4 px-5 mt-5 md:px-10 lg:mt-10 2xl:w-[1500px] 2xl:mx-auto">
        {singleProd ? (
          <>
            {/* Images & Thumbnails */}
            <div className="md:sticky md:self-start md:top-0 md:w-1/2 flex flex-col justify-center items-center">
              <div className="w-[60%] md:w-[80%] flex justify-center items-center">
                <img src={image} alt="" className="w-full h-full object-cover" />
              </div>

              <div className="w-[80%] h-fit md:w-full relative mb-3">
                {/* Swiper Thumbnails */}
                <Swiper
                  key={image} // force re-render when selection changes
                  modules={[Navigation]}
                  loop
                  speed={500}
                  slidesPerView={1}
                  spaceBetween={15}
                  breakpoints={{
                    300: { slidesPerView: 2 },
                    600: { slidesPerView: 3 },
                    1000: { slidesPerView: 4 },
                  }}
                  navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                  }}
                  onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                  }}
                  className="main-slider"
                >
                  {singleProd?.productImages?.map((img, index) => (
                    <SwiperSlide key={index}>
                      <div className="item h-fit w-fit md:w-full flex flex-col gap-1 justify-around">
                        <div
                          onClick={() => setImage(img)}
                          className={`${img === image ? "border border-Gray" : ""} cursor-pointer`}
                        >
                          <img
                            src={img}
                            alt={`thumbnail-${index}`}
                            className="w-full h-[8em] md:h-full object-cover transition-opacity duration-500 ease-in-out"
                          />
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Custom buttons */}
                <button
                  ref={prevRef}
                  className="absolute h-full top-0 left-0 z-10 text-black text-xl cursor-pointer"
                >
                  <FaAngleLeft />
                </button>
                <button
                  ref={nextRef}
                  className="absolute h-full top-0 right-0 z-10 text-black text-xl cursor-pointer"
                >
                  <FaAngleRight />
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 mt-10 flex flex-col gap-4 w-full ml-5">
              {/* Title, Price, Rating */}
              <div className="flex flex-col gap-3 border border-transparent border-b-GrayLight pb-5">
                <h1 className="text-start font-bold tracking-wide text-2xl md:text-3xl">
                  {singleProd?.productName}
                </h1>

                <div className="flex gap-3 justify-start items-center">
                  {singleProd?.productDiscount && (
                    <h6 className="text-left font-normal tracking-wide text-lg text-Gray line-through">
                      ${singleProd?.productPrice.toFixed(2)}
                    </h6>
                  )}
                  <h6 className="text-left text-Red font-bold tracking-wide text-2xl">
                    $
                    {singleProd?.productDiscount
                      ? (
                          Number(singleProd?.productPrice) -
                          (Number(singleProd?.productPrice) * singleProd?.productDiscount) / 100
                        ).toFixed(2)
                      : singleProd?.productPrice.toFixed(2)}
                  </h6>
                  {singleProd?.productDiscount && (
                    <span className="p-1 px-3 w-fit h-fit bg-[#c5172e] text-white flex justify-center items-center text-sm font-medium">
                      -{singleProd?.productDiscount}%
                    </span>
                  )}
                </div>

                <p className="text-Gray font-medium line-clamp-3">
                  {singleProd?.productDescription}
                </p>

                <div className="flex gap-2 text-2xl">
                  {[...Array(5)].map((_, i) => {
                    const starValue = i + 1;
                    return (
                      <FaStar
                        key={i}
                        onMouseEnter={() => setHover(starValue)}
                        onMouseLeave={() => null}
                        onClick={() => setVal(starValue)}
                        className={`cursor-pointer ${
                          starValue <= (hover || singleProd?.productRating)
                            ? "text-yellow-500"
                            : "text-GrayLight"
                        }`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Quantity & Buttons */}
              <div className="flex flex-col gap-3 tracking-wide">
                <div className="flex gap-2">
                  <p className="flex items-center text-lg font-semibold">Availability:</p>
                  <div className="flex items-center text-lg font-medium text-black">
                    <div
                      className={`${
                        singleProd?.productStock ? "border-green-500" : "border-red-500"
                      } p-[2px] rounded-full border-1 flex justify-center items-center mr-1`}
                    >
                      <div
                        className={`${
                          singleProd?.productStock ? "bg-green-500" : "bg-red-500"
                        } h-2 w-2 rounded-full`}
                      />
                    </div>
                    {`${singleProd?.productStock} in Stock`}
                  </div>
                </div>

                <div>
                  <p className="flex items-center text-lg tracking-wide font-semibold">
                    {`Quantity (${value} selected)`}
                  </p>

                  <div className="flex gap-2 items-center justify-around mt-3 w-fit">
                    <div className="py-2 w-[8rem] border-1 border-GrayLight hover:cursor-point flex justify-around items-center text-xl text-Gray [&>button]:hover:cursor-pointer">
                      <button onClick={() => setValue(Math.max(1, value - 1))}>-</button>
                      <p className="text-lg">{value}</p>
                      <button onClick={() => setValue(value + 1)}>+</button>
                    </div>

                    <button
                      onClick={() => handleClick({ id: singleProd?._id })}
                      className={`p-2 w-full h-full ${
                        singleProd?.productStock > 0
                          ? "bg-[#c5172e] text-white hover:cursor-pointer opacity-100"
                          : "bg-[#c5172e] text-white hover:cursor-not-allowed opacity-50"
                      } transition duration-200 ease-in-out active:translate-y-1 flex justify-around items-center text-xl font-medium`}
                      disabled={singleProd?.productStock > 0 ? false : true}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleBuy}
                  className={`p-2 w-[80%] sm:w-[60%] h-full bg-white border border-Gray text-Gray ${
                    singleProd?.productStock > 0
                      ? "hover:cursor-pointer hover:bg-black hover:border-black hover:text-white opacity-100"
                      : "hover:cursor-not-allowed opacity-50"
                  } transition duration-200 ease-in-out active:translate-y-1 flex justify-around items-center text-lg font-medium`}
                  disabled={singleProd?.productStock > 0 ? false : true}
                >
                  BUY NOW
                </button>
              </div>

              {/* Brand & Category */}
              <div className="flex flex-col gap-1 tracking-wide">
                <div className="flex gap-2">
                  <p className="flex items-center text-lg font-semibold">Brand:</p>
                  <p className="flex items-center text-lg">{singleProd?.productBrand}</p>
                </div>
                <div className="flex gap-2">
                  <p className="flex items-center text-lg font-semibold">Category:</p>
                  <p className="flex items-center text-lg">{singleProd?.productCategory}</p>
                </div>
              </div>

              {/* Details & Shipping */}
              <div className="flex flex-col gap-1 mr-5 md:mr-0">
                {/* Details */}
                <div className="flex flex-col gap-3 tracking-wide">
                  <div
                    onClick={() => setF1(!f1)}
                    className="flex justify-between items-center w-[100%] hover:cursor-pointer bg-WhiteLight p-2"
                  >
                    <h4 className="md:py-3 py-1 text-lg font-medium flex gap-2 items-center">
                      <TbFileDescription className="text-xl" />
                      Details
                    </h4>
                    {!f1 ? <IoIosArrowDown className="mt-1" /> : <IoIosArrowUp className="mt-1" />}
                  </div>
                  {f1 && <p className="text-Gray font-medium px-3">{singleProd?.productDescription}</p>}
                </div>

                {/* Shipping & Returns */}
                <div className="flex flex-col gap-3 tracking-wide">
                  <div
                    onClick={() => setF2(!f2)}
                    className="flex justify-between items-center w-[100%] hover:cursor-pointer bg-WhiteLight p-2"
                  >
                    <h4 className="md:py-3 py-1 text-lg font-medium flex gap-2 items-center">
                      <FiTruck className="text-xl" />
                      Shipping & Returns
                    </h4>
                    {!f2 ? <IoIosArrowDown className="mt-1" /> : <IoIosArrowUp className="mt-1" />}
                  </div>
                  {f2 && (
                    <p className="text-Gray font-medium px-3">
                      Free shipping and returns available on all orders! We ship
                      all US domestic orders within 5-10 business days.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <SingleProductSkeleton />
        )}
      </div>

      <ProductsSection />
      <NewsLetter />
      <Footer />
    </>
  );
};

export default SingleProductPage;
