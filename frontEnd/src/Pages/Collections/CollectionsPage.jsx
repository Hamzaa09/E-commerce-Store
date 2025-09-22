import React, { useEffect } from "react";
import Navbar from "../Landing/Components/Navbar";
import TagLine from "../Landing/Components/TagLine";
import Footer from "../Landing/Components/Footer";
import ScrollToTopButton from "../Landing/Components/ScrollToTopButton";
import NewsLetter from "../Landing/Components/NewsLetter";
import BreadCrum from "../Landing/Components/BreadCrum";
import { useDispatch, useSelector } from "react-redux";
import { getCollectionDataThunk, getIndependentRoutesThunk } from "../../../store/products/product.thunk";
import { Link } from "react-router-dom";

const CollectionsPage = () => {
  const dispatch = useDispatch();
  const { totalProducts, prodCategories, collectionItems, collectionProducts } =
    useSelector((state) => state.productSlice);

  useEffect(() => {
    // console.log(prodCategories)
    const response = dispatch(getCollectionDataThunk({prodCategories}));
  }, [prodCategories]);

  return (
    <>
      <ScrollToTopButton />
      <TagLine />
      <Navbar value="collections" />

      <BreadCrum />

      <div className="px-5 mt-10 md:mt-15 md:px-10 lg:mt-20 2xl:w-[1500px] 2xl:mx-auto w-full flex gap-x-3 gap-y-15 flex-wrap">
        {prodCategories.map((item, index) => (
          <Link to={`/shop/${item}`}
            key={index}
            className="w-[calc(50%-0.375rem)] sm:w-[calc(33%-0.375rem)] md:w-[calc(24%-0.375rem)] lg:w-[calc(19%-0.375rem)] xl:w-[calc(15.8%-0.375rem)] h-fit hover:cursor-pointer group"
          >
            <div className="border-1 border-GrayLight overflow-hidden">
              <img
                src={`${collectionProducts?.[index]?.productImages?.[0]}`}
                className="group-hover:scale-110 transition duration-1000 ease-in-out"
                alt="items"
              />
            </div>

            <div className="content pt-2">
              <h4 className="text-center text-black font-semibold text-lg lg:text-lg tracking-wider">
                {item}
              </h4>
              <div className="flex justify-center">
                <p className="absolute opacity-100 group-hover:opacity-0 text-center text-Gray text-md lg:text-lg tracking-wider font-medium transition duration-100 ease-in-out">
                  {collectionItems[index]} Items
                </p>
                <p className="absolute opacity-0 group-hover:opacity-100 text-center text-Red underline hover:no-underline text-sm lg:text-lg font-medium transition duration-100 ease-in-out">
                  SHOP NOW
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <NewsLetter />
      <Footer />
    </>
  );
};

export default CollectionsPage;
