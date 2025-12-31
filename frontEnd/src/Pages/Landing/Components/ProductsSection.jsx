import React, { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsThunk } from "../../../../store/products/product.thunk";
import { Link } from "react-router-dom";
import DealsSkeleton from "../../../Skeletons/DealsSkeleton";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import CarousalSkeleton from "../../../Skeletons/CarousalSkeleton";

const ProductsSection = () => {
  const dispatch = useDispatch();
  const [buttonDisplay, setButtonDisplay] = useState(false);
  const { halfAllProducts, productLoading } = useSelector(
    (state) => state.productSlice
  );
  const carouselRef = useRef(null);

  useEffect(() => {
    dispatch(getAllProductsThunk({ prods: true }));
  }, [dispatch]);

  // const handlePrev = () => {
  //   carouselRef.current?.prev();
  // };

  // const handleNext = () => {
  //   carouselRef.current?.next();
  // };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      onMouseEnter={() => setButtonDisplay(true)}
      onMouseLeave={() => setButtonDisplay(false)}
      className="parent relative lg:px-20 w-full"
    >
      {/* Heading */}
      <div className="mainHeading flex flex-col justify-center items-center mb-10 tracking-wide">
        <h1 className="py-3 text-center text-2xl md:text-4xl font-bold">
          LATEST PRODUCTS
        </h1>
        <span className="bg-Red text-center w-[140px] lg:w-[10%] h-1"></span>
      </div>

      {/* Carousel */}
      {productLoading ? (
        <div className="flex gap-4">
          <CarousalSkeleton />
        </div>
      ) : (
        <div className="relative">
          {console.log(halfAllProducts)}
          {halfAllProducts?.length > 0 && (
            <OwlCarousel
              key={halfAllProducts.length}
              ref={carouselRef}
              className="owl-theme"
              loop
              margin={15}
              nav={false}
              dots={false}
              responsive={{
                0: { items: 1 },
                300: { items: 2 },
                600: { items: 3 },
                1000: { items: 4 },
              }}
            >
              {halfAllProducts?.map((product) => (
                <Link
                  onClick={handleClick}
                  to={`/singleProduct/${product._id}`}
                  key={product._id}
                  className="item h-fit w-[100%] flex flex-col gap-1 justify-around"
                >
                  <div className="relative group h-[40%] lg:h-[75%] mb-2 flex justify-center items-center transition-all duration-300 ease-in-out overflow-visible">
                    {/* Normal Image */}
                    <img
                      src={product.productImages?.[0]}
                      className="w-full h-full object-cover transition-opacity duration-500 ease-in-out"
                      alt="product"
                    />
                    {/* Hover Image */}
                    <img
                      src={product.productImages?.[1]}
                      className="w-full h-full object-cover absolute top-0 left-0 opacity-0 group-hover:lg:opacity-100 transition-opacity duration-500 ease-in-out"
                      alt="product-hover"
                    />
                    {/* Out of Stock */}
                    {product.productStock === 0 && (
                      <div className="imageIcons absolute top-0 left-0 w-15 h-15 flex justify-center items-center text-[5vh] md:text-[5.5vh] mb-2 transition duration-300 ease-in-out drop-shadow-md">
                        <img
                          src="/buttons/out-of-stock.png"
                          alt="out-of-stock"
                        />
                      </div>
                    )}
                    {/* Discount */}
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
              ))}
            </OwlCarousel>
          )}
        </div>
      )}

      {/* Buttons */}
      {/* <button
        onClick={handlePrev}
        className={`${
          buttonDisplay ? "visible" : "hidden"
        } absolute top-[45%] left-2 md:left-5 lg:left-10 z-10 p-3 md:p-4 lg:p-5 rounded-full drop-shadow-md bg-white text-black md:text-md lg:text-lg text-sm hover:cursor-pointer transition duration-250 ease-in-out`}
      >
        <FaArrowLeft />
      </button>

      <button
        onClick={handleNext}
        className={`${
          buttonDisplay ? "visible" : "hidden"
        } absolute top-[45%] right-2 md:right-5 lg:right-10 z-10 p-3 md:p-4 lg:p-5 rounded-full drop-shadow-md bg-white text-black md:text-md lg:text-lg text-sm hover:cursor-pointer transition duration-250 ease-in-out`}
      >
        <FaArrowRight />
      </button> */}
    </div>
  );
};

export default ProductsSection;
