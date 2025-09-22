import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa6";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { getPopularProductsThunk } from "../../../../store/products/product.thunk";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PopularProducts = () => {
  const dispatch = useDispatch();
  const [buttondisplay, setButtondisplay] = useState(false);
  const { popProducts, productLoading } = useSelector(
    (state) => state.productSlice
  );

  useEffect(() => {
    if (popProducts.length > 0) {
      $(".popularProducts-section").owlCarousel({
        loop: true,
        margin: 15,
        nav: false,
        dots: false,
        responsive: {
          0: {
            items: 1,
          },
          300: {
            items: 2,
          },
          600: {
            items: 3,
          },
          1000: {
            items: 4,
          },
        },
      });
    }
  }, [popProducts]);

  useEffect(() => {
    const response = dispatch(getPopularProductsThunk({ rating: true }));
  }, []);

  return (
    <div
      onMouseEnter={() => setButtondisplay(true)}
      onMouseLeave={() => setButtondisplay(false)}
      className="parent relative lg:px-20 w-full"
    >
      {/* heading  */}
      <div className="mainHeading flex flex-col justify-center items-center mb-10 tracking-wide">
        <h1 className="py-3 text-center text-2xl md:text-4xl font-bold">
          POPULAR PRODUCTS
        </h1>
        <span className="bg-Red text-center w-[140px] lg:w-[10%] h-1"></span>
      </div>
      {/* items  */}
      <div className="owl-carousel popularProducts-section owl-theme w-full flex justify-around hover:cursor-pointer">
        {popProducts.map((product, index) => (
          <Link
            to={`/singleProduct/${product._id}`}
            key={index}
            className="item h-fit w-[100%] flex flex-col gap-1 justify-around"
          >
            <div
              className={`relative group h-[40%] lg:h-[75%] mb-2 flex justify-center items-center transition-all duration-300 ease-in-out`}
            >
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
              {/* out of stock  */}
              {product.productStock == 0 ? (
                <div
                  className={`imageIcons absolute top-0 left-0 w-15 h-15 flex justify-center items-center text-[5vh] md:text-[5.5vh] mb-2 transition duration-300 ease-in-out drop-shadow-md`}
                >
                  <img src="buttons/out-of-stock.png" alt="" />
                </div>
              ) : (
                <></>
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
              {[...Array(5)].map((_, i) => {
                const starValue = i + 1;
                const id = product._id;
                return (
                  <FaStar
                    key={i}
                    className={`cursor-pointer ${
                      starValue <= product?.productRating
                        ? "text-yellow-500"
                        : "text-GrayLight"
                    }`}
                  />
                );
              })}
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
                      (Number(product.productPrice) * product.productDiscount) /
                        100
                    ).toFixed(2)
                  : product.productPrice.toFixed(2)}
              </p>
            </div>
          </Link>
        ))}
      </div>
      {/* buttons */}
      <button
        onClick={() =>
          $(".popularProducts-section").trigger("prev.owl.carousel")
        }
        className={`${
          buttondisplay ? "visible" : "hidden"
        } absolute top-[45%] left-2 md:left-5 lg:left-10 z-10 p-3 md:p-4 lg:p-5 rounded-full drop-shadow-md bg-white text-black md:text-md lg:text-lg text-sm hover:cursor-pointer transition duration-250 ease-in-out`}
      >
        <FaArrowLeft />
      </button>
      <button
        onClick={() =>
          $(".popularProducts-section").trigger("next.owl.carousel")
        }
        className={`${
          buttondisplay ? "visible" : "hidden"
        } absolute top-[45%] right-2 md:right-5 lg:right-10 z-10 p-3 md:p-4 lg:p-5 rounded-full drop-shadow-md bg-white text-black md:text-md lg:text-lg text-sm hover:cursor-pointer transition duration-250 ease-in-out`}
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default PopularProducts;
