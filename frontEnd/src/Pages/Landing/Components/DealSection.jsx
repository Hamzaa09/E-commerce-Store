import React, { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getDealsProductsThunk } from "../../../../store/products/product.thunk";
import { Link } from "react-router-dom";
import DealsSkeleton from "../../../Skeletons/DealsSkeleton";
import CarousalSkeleton from "../../../Skeletons/CarousalSkeleton";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

const DealSection = () => {
  const dispatch = useDispatch();
  const [buttonDisplay, setButtonDisplay] = useState(false);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const { dealsProducts, dealsProductsLoading } = useSelector(
    (state) => state.productSlice
  );

  useEffect(() => {
    dispatch(getDealsProductsThunk({ deals: true }));
  }, [dispatch]);

  return (
    <div
      onMouseEnter={() => setButtonDisplay(true)}
      onMouseLeave={() => setButtonDisplay(false)}
      className="parent relative lg:px-20 w-full"
    >
      {/* Heading */}
      <div className="mainHeading flex flex-col justify-center items-center mb-10 tracking-wide">
        <h1 className="py-3 text-center text-2xl md:text-4xl font-bold">
          DEALS OF THE WEEK
        </h1>
        <span className="bg-Red text-center w-[140px] lg:w-[10%] h-1"></span>
      </div>

      {/* Carousel */}
      {dealsProductsLoading ? (
        <div className="flex gap-4">
          <CarousalSkeleton />
        </div>
      ) : (
        <div className="relative">
          {dealsProducts?.length > 0 && (
            <>
              <Swiper
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
              >
                {dealsProducts.map((product) => (
                  <SwiperSlide key={product._id}>
                    <Link
                      to={`/singleProduct/${product._id}`}
                      className="item h-fit w-[100%] flex flex-col gap-1 justify-around"
                    >
                      <div className="relative group h-[40%] lg:h-[75%] mb-2 flex justify-center items-center transition-all duration-300 ease-in-out">
                        <img
                          src={product.productImages?.[0]}
                          className="w-full h-full object-cover transition-opacity duration-500 ease-in-out"
                          alt="product"
                        />
                        <img
                          src={product.productImages?.[1]}
                          className="w-full h-full object-cover absolute top-0 left-0 opacity-0 group-hover:lg:opacity-100 transition-opacity duration-500 ease-in-out"
                          alt="product-hover"
                        />
                        {product.productStock === 0 && (
                          <div className="imageIcons absolute top-0 left-0 w-15 h-15 flex justify-center items-center text-[5vh] md:text-[5.5vh] mb-2 transition duration-300 ease-in-out drop-shadow-md">
                            <img
                              src="buttons/out-of-stock.png"
                              alt="out-of-stock"
                            />
                          </div>
                        )}
                        {product.productDiscount && (
                          <span className="bg-[#c5172e] text-white absolute top-0 right-5 rounded-[100%] h-9 w-9 md:h-11 md:w-11 flex justify-center items-center text-sm">
                            -{product.productDiscount}%
                          </span>
                        )}
                      </div>

                      <p className="text-center font-medium text-Gray text-md lg:text-lg">
                        {product.productBrand}
                      </p>
                      <h4 className="text-center font-medium tracking-wide text-md lg:text-xl">
                        {product.productName}
                      </h4>

                      <div className="icons flex justify-center my-3 text-Gray gap-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`cursor-pointer ${
                              i + 1 <= product?.productRating
                                ? "text-yellow-500"
                                : "text-GrayLight"
                            }`}
                          />
                        ))}
                      </div>

                      <div className="flex justify-center items-center gap-2">
                        {product.productDiscount && (
                          <p className="text-center text-Gray line-through font-normal tracking-wide text-md md:text-lg">
                            ${product.productPrice.toFixed(2)}
                          </p>
                        )}
                        <p className="text-center text-Red font-bold tracking-wide text-md lg:text-lg">
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
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          )}
        </div>
      )}

      {/* Buttons */}
      <button
        ref={prevRef}
        className={`${
          buttonDisplay ? "visible" : "hidden"
        } absolute top-[45%] left-2 md:left-5 lg:left-10 z-10 p-3 md:p-4 lg:p-5 rounded-full drop-shadow-md bg-white text-black md:text-md lg:text-lg text-sm hover:cursor-pointer transition duration-250 ease-in-out`}
      >
        <FaArrowLeft />
      </button>
      <button
        ref={nextRef}
        className={`${
          buttonDisplay ? "visible" : "hidden"
        } absolute top-[45%] right-2 md:right-5 lg:right-10 z-10 p-3 md:p-4 lg:p-5 rounded-full drop-shadow-md bg-white text-black md:text-md lg:text-lg text-sm hover:cursor-pointer transition duration-250 ease-in-out`}
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default DealSection;
