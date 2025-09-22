import React from "react";
import Navbar from "../Landing/Components/Navbar";
import TagLine from "../Landing/Components/TagLine";
import Footer from "../Landing/Components/Footer";
import ScrollToTopButton from "../Landing/Components/ScrollToTopButton";
import NewsLetter from "../Landing/Components/NewsLetter";
import { FaStar } from "react-icons/fa6";
import { VscClose } from "react-icons/vsc";
import BreadCrum from "../Landing/Components/BreadCrum";

const FavoritePage = () => {
  const productsArr = [
    {
      src_1: "p1.jpg",
      src_2: "p2.jpg",
      brand: "Vans",
      content: "Hiking Treacking Montain Climbing Shoes, Gym Shoes",
      price: 29,
      discount: 20,
      rating: 4,
    },
    {
      src_1: "p1.jpg",
      src_2: "p2.jpg",
      brand: "Bata",
      content: "Hiking Treacking Montain Climbing Shoes, Gym Shoes",
      price: 70,
      discount: 20,
    },
    {
      src_1: "p1.jpg",
      src_2: "p2.jpg",
      brand: "Lacoste",
      content: "Hiking Treacking Montain Climbing Shoes, Gym Shoes",
      price: 70,
    },
    {
      src_1: "p1.jpg",
      src_2: "p2.jpg",
      brand: "UnderArmour",
      content: "Hiking Treacking Montain Climbing Shoes, Gym Shoes",
      price: 70,
    },
  ];

  return (
    <>
      <ScrollToTopButton />
      <TagLine />
      <Navbar value="favorite" />

      <BreadCrum />

      {/* heading  */}
      <div className="mainHeading flex flex-col justify-start items-start mb-10 tracking-wide px-5 mt-5 md:px-10 lg:mt-10 2xl:w-[1500px] 2xl:mx-auto">
        <h1 className="py-3 text-start text-3xl md:text-4xl font-bold">
          Favorites:
        </h1>
        <span className="bg-Red text-center w-[50px] lg:w-[5%] h-1"></span>
      </div>

      {/* products div  */}
      <div className="px-5 mt-10 md:mt-15 md:px-10 lg:mt-20 2xl:w-[1500px] 2xl:mx-auto w-full flex gap-x-3 gap-y-15 flex-wrap">
        {productsArr.map((product, index) => (
          <div
            key={index}
            className={`item flex w-[calc(50%-0.375rem)] sm:w-[calc(33%-0.375rem)] md:w-[calc(24%-0.375rem)] lg:w-[calc(19%-0.375rem)] xl:w-[calc(15.8%-0.375rem)] h-fit flex-col gap-1 justify-around hover:cursor-pointer`}
          >
            {/* images  */}
            <div
              className={`relative group h-[40%] lg:h-[75%] flex justify-center items-center transition-all duration-300 ease-in-out `}
            >
              {/* Normal Image */}
              <img
                src={`/products/${product.src_2}`}
                className="w-full h-full object-cover transition-opacity duration-500 ease-in-out"
                alt="product"
              />

              {product.discount && (
                <span
                  className={`bg-[#c5172e] text-white absolute top-0 left-5 rounded-[100%] h-9 w-9 md:h-11 md:w-11 flex justify-center items-center text-sm`}
                >
                  -{product.discount}%
                </span>
              )}

              <div
                className={`imageIcons absolute top-0 right-0 bg-white w-fit h-fit flex text-[5vh] md:text-[5.5vh] mb-2 opacity-100 transition-all duration-300 ease-in-out`}
              >
                <VscClose className="px-2 hover:cursor-pointer hover:bg-[#c5172e] hover:text-white" />
              </div>
            </div>

            {/* content  */}
            <div className={`flex flex-col justify-start items-center w-full`}>
              <p className="text-center font-medium text-Gray text-md lg:text-lg ">
                {product.brand}
              </p>
              <h4
                className={`text-center truncate font-medium tracking-wide text-lg lg:text-xl w-full`}
              >
                {product.content}
              </h4>

              <div className="icons flex justify-center my-3 text-Gray gap-1">
                {product.rating
                  ? [...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`${
                          i <= product.rating - 1
                            ? "text-yellow-500"
                            : "text-GrayLight"
                        }`}
                      />
                    ))
                  : [...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-GrayLight" />
                    ))}
              </div>

              <div className="flex justify-center items-center gap-2">
                {product.discount && (
                  <p className="text-center text-Gray line-through font-normal tracking-wide text-md md:text-lg">
                    ${product.price.toFixed(2)}
                  </p>
                )}
                <p className="text-center text-Red font-bold tracking-wide text-md lg:text-lg">
                  $
                  {product.discount
                    ? (
                        Number(product.price) -
                        (Number(product.price) * product.discount) / 100
                      ).toFixed(2)
                    : product.price.toFixed(2)}
                </p>
              </div>

              <button className="py-2 text-md xl:text-md font-medium w-[10rem] bg-[#c5172e] text-white hover:cursor-pointer transition duration-200 ease-in-out mt-2 lg:mt-5 active:translate-y-1">
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <NewsLetter />
      <Footer />
    </>
  );
};

export default FavoritePage;
