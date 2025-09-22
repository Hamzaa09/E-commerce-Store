import Navbar from "../Landing/Components/Navbar";
import TagLine from "../Landing/Components/TagLine";
import Footer from "../Landing/Components/Footer";
import ScrollToTopButton from "../Landing/Components/ScrollToTopButton";
import NewsLetter from "../Landing/Components/NewsLetter";
import { CiGrid41, CiBoxList, CiFilter, CiHeart } from "react-icons/ci";
import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa6";
import { CiShoppingCart } from "react-icons/ci";
import { VscClose } from "react-icons/vsc";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import Pagination from "@mui/material/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  getIndependentRoutesThunk,
  getProductsThunk,
  updateReviewThunk,
} from "../../../store/products/product.thunk";
import { ClipLoader } from "react-spinners";
import { Link, useParams } from "react-router-dom";
import BreadCrum from "../Landing/Components/BreadCrum";

const ShopChilds = () => {
  const { category } = useParams();
  const [filters, setFilters] = useState({
    Availability: [],
    Brand: [],
    Type: [],
    priceFrom: "",
    priceTo: "",
    Sort: "A-Z",
  });
  const [list, setlist] = useState(false);
  const [filter, setFilter] = useState(false);
  const [Availability, setAvailability] = useState(true);
  const [type, setType] = useState(true);
  const [brand, setBrand] = useState(true);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const {
    allProducts,
    totalPages,
    productLoading,
    prodBrands,
    prodCategories,
    whichfilter,
  } = useSelector((state) => state.productSlice);

  useEffect(() => {
    const response = dispatch(
      getIndependentRoutesThunk({ category, filters, page })
    );
  }, [page, filters, category]);

  useEffect(() => {
    if (filter) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [filter]);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleInputChange = (e, type, value) => {
    let check = e.target.checked;
    setFilters((prev) => {
      let update = check
        ? [...prev[type], value]
        : prev[type].filter((val) => val !== value);

      return { ...prev, [type]: update };
    });
  };

  return (
    <>
      <div className="relative w-full">
        <ScrollToTopButton />
        <TagLine />
        <Navbar />

        <div
          className={`relative w-full ${!filter ? "overflow-x-hidden" : ""}`}
        >
          <BreadCrum />

          <div className="px-5 mt-10 md:mt-15 md:px-10 lg:mt-20 2xl:w-[1500px] 2xl:mx-auto w-full lg:flex gap-5">
            {/* filters & list Div  */}
            <div className="lg:hidden w-full flex justify-between items-center text-2xl select-none">
              <button
                onClick={() => setFilter(!filter)}
                className="flex gap-2 justify-center items-center bg-WhiteLight py-1 px-2 active:translate-y-1 transition-all duration-150 ease-in-out hover:cursor-pointer"
              >
                <CiFilter />
                <span className="text-[1rem] md:text-lg">Filter And Sort</span>
              </button>

              {filter && (
                <div
                  onClick={() => setFilter(false)}
                  className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.3)] bg-opacity-30 z-[2000]"
                />
              )}

              {/* filter mobile */}
              <div
                className={`fixed z-2001 w-[80%] sm:w-[50vw] top-0 transition-all duration-300 ease-in-out ${
                  filter ? "right-0" : "right-[-500px]"
                } flex bg-white h-screen flex-col justify-start overflow-auto`}
              >
                {/* heading  */}
                <div className="flex justify-between py-3 transition-all duration-100 ease-in-out border-1 border-transparent border-b-GrayLight">
                  <h3 className="tracking-wide font-semibold py-1 px-4 text-xl">
                    Filter And Sort
                  </h3>
                  <VscClose
                    onClick={() => setFilter(false)}
                    className="text-3xl cursor-pointer hover:text-Red my-1 mx-3"
                  />
                </div>

                {/* Filters  */}
                <div className="flex flex-col items-start gap-4 text-lg tracking-wide font-medium px-5 py-5 h-screen overflow-y-auto">
                  {/* availibility */}
                  <div className="flex flex-col justify-between w-full">
                    <div
                      onClick={() => setAvailability(!Availability)}
                      className="flex justify-between w-full h-fit hover:cursor-pointer hover:text-[#c5172e] transition-all duration-100 ease-in-out"
                    >
                      Availability
                      {Availability ? (
                        <RiArrowDropUpLine className="mt-1 text-2xl" />
                      ) : (
                        <RiArrowDropDownLine className="mt-1 text-2xl" />
                      )}
                    </div>

                    <div
                      className={`${
                        Availability
                          ? "opacity-100 h-fit pointer-events-auto mt-3"
                          : "opacity-0 h-0 pointer-events-none"
                      } flex flex-col gap-3 text-lg z-100 pl-3 [&>*]:font-normal [&>*]:hover:cursor-pointer [&>*]:hover:text-[#c5172e] [&>*]:transition-all [&>*]:duration-100 [&>*]:ease-in-out mr-5`}
                    >
                      {/* boxes  */}
                      <div className="hover:cursor-pointer">
                        <label className="flex gap-2 px-2 text-md hover:cursor-pointer">
                          <input
                            onChange={(e) =>
                              handleInputChange(e, "Availability", "inStock")
                            }
                            type="checkbox"
                            className="hover:cursor-pointer"
                          />
                          In Stock
                        </label>
                      </div>

                      <div className="hover:cursor-pointer">
                        <label className="flex gap-2 px-2 text-md hover:cursor-pointer">
                          <input
                            onChange={(e) =>
                              handleInputChange(e, "Availability", "outStock")
                            }
                            type="checkbox"
                            className="hover:cursor-pointer"
                          />
                          Out of Stock
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* brand  */}
                  {whichfilter === 2 ? (
                    <div className="flex flex-col justify-between w-full">
                      <div
                        onClick={() => setBrand(!brand)}
                        className="flex justify-between w-full h-fit hover:cursor-pointer hover:text-[#c5172e] transition-all duration-100 ease-in-out"
                      >
                        Brands
                        {brand ? (
                          <RiArrowDropUpLine className="mt-1 text-2xl" />
                        ) : (
                          <RiArrowDropDownLine className="mt-1 text-2xl" />
                        )}
                      </div>

                      {/* boxes */}
                      <div
                        className={`${
                          brand
                            ? "opacity-100 h-fit pointer-events-auto mt-3"
                            : "opacity-0 h-0 pointer-events-none"
                        } flex flex-col gap-3 text-lg z-100 pl-3 [&>*]:font-normal [&>*]:hover:cursor-pointer [&>*]:hover:text-[#c5172e] [&>*]:transition-all [&>*]:duration-100 [&>*]:ease-in-out mr-5`}
                      >
                        {prodBrands &&
                          prodBrands.map((brand, index) => (
                            <div key={index} className="hover:cursor-pointer">
                              <label className="flex justify-start gap-2 w-full px-2 text-md hover:cursor-pointer">
                                <input
                                  onChange={(e) =>
                                    handleInputChange(e, "Brand", brand)
                                  }
                                  type="checkbox"
                                  className="hover:cursor-pointer"
                                />
                                {brand}
                              </label>
                            </div>
                          ))}
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                  {/* type */}
                  {whichfilter === 1 ? (
                    <div className="flex flex-col justify-between w-full">
                      <div
                        onClick={() => setType(!type)}
                        className="flex justify-between w-full h-fit hover:cursor-pointer hover:text-[#c5172e] transition-all duration-100 ease-in-out"
                      >
                        Types
                        {type ? (
                          <RiArrowDropUpLine className="mt-1 text-2xl" />
                        ) : (
                          <RiArrowDropDownLine className="mt-1 text-2xl" />
                        )}
                      </div>

                      {/* boxes */}
                      <div
                        className={`${
                          type
                            ? "opacity-100 h-fit pointer-events-auto mt-3"
                            : "opacity-0 h-0 pointer-events-none"
                        } flex flex-col gap-3 text-lg z-100 pl-3 [&>*]:font-normal [&>*]:hover:cursor-pointer [&>*]:hover:text-[#c5172e] [&>*]:transition-all [&>*]:duration-100 [&>*]:ease-in-out mr-5`}
                      >
                        {prodCategories &&
                          prodCategories.map((category, index) => (
                            <div key={index} className="hover:cursor-pointer">
                              <label className="flex justify-start gap-2 w-full px-2 text-md hover:cursor-pointer">
                                <input
                                  onChange={(e) =>
                                    handleInputChange(e, "Type", category)
                                  }
                                  type="checkbox"
                                  className="hover:cursor-pointer"
                                />
                                {category}
                              </label>
                            </div>
                          ))}
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                  {/* price  */}
                  <div className="flex flex-col justify-between w-full mt-4 border border-transparent border-t-GrayLight py-2">
                    <div className="flex justify-between w-full h-fit hover:cursor-pointer hover:text-[#c5172e] transition-all duration-100 ease-in-out">
                      Price
                    </div>

                    <div
                      className={`opacity-100 h-fit mt-3 flex flex-col gap-3 text-lg z-100 pl-3 mr-5`}
                    >
                      <div className="flex gap-2 justify-between">
                        <span className="w-[50%] flex items-center">
                          $
                          <input
                            onChange={(e) => {
                              setFilters((prev) => ({
                                ...prev,
                                priceFrom: e.target.value,
                              }));
                            }}
                            value={filters.priceFrom}
                            type="number"
                            className="w-full outline outline-GrayLight mx-2 p-2 font-normal"
                            placeholder="From"
                          />
                        </span>

                        <span className="w-[50%] flex items-center">
                          $
                          <input
                            onChange={(e) => {
                              setFilters((prev) => ({
                                ...prev,
                                priceTo: e.target.value,
                              }));
                            }}
                            value={filters.priceTo}
                            type="number"
                            className="w-full outline outline-GrayLight mx-2 p-2 font-normal"
                            placeholder="To"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* sorting  */}
                  <div className="flex flex-col md:flex-row justify-between w-full mt-4 border border-transparent border-t-GrayLight py-2">
                    <div>Sort By: </div>

                    <select
                      onChange={(e) => {
                        const value = e.target.value;
                        setFilters((prev) => ({ ...prev, Sort: value }));
                      }}
                      name="sort"
                      id="sort"
                      className="text-Gray font-normal px-2 outline-0 hover:cursor-pointer"
                    >
                      <option value="A-Z">Alphabetically: A-Z</option>
                      <option value="Z-A">Alphabetically: Z-A</option>
                      <option value="H-L">Price: High-Low</option>
                      <option value="L-H">Price: Low-High</option>
                      <option value="Discount">Discount</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* list buttons  */}
              <div className="flex gap-2 items-center justify-center">
                <CiGrid41
                  onClick={() => setlist(false)}
                  className={`${
                    !list ? "text-Red" : "text-black"
                  } hover:cursor-pointer`}
                />
                <CiBoxList
                  onClick={() => setlist(true)}
                  className={`${
                    list ? "text-Red" : "text-black"
                  } hover:cursor-pointer`}
                />
              </div>
            </div>

            {/* lg left filters  */}
            <div className="hidden lg:flex w-1/4 mr-5 border-1 border-transparent border-r-GrayLight h-fit">
              {/* filter  */}
              <div
                className={`transition-all duration-300 ease-in-out ${
                  filter ? "right-0" : "right-[-500px]"
                } bg-white h-screen`}
              >
                {/* heading  */}
                <div className="flex justify-between py-3 mx-4 transition-all duration-100 ease-in-out border-1 border-transparent border-b-GrayLight">
                  <h3 className="tracking-wide font-semibold py-1 px-4 text-xl">
                    Filters:
                  </h3>
                </div>

                {/* Filters  */}
                <div className="flex flex-col items-start gap-4 text-lg tracking-wide font-medium px-5 py-5">
                  {/* Availibility  */}
                  <div className="flex flex-col justify-between w-full border-1 border-transparent border-b-GrayLight py-2">
                    <div
                      onClick={() => setAvailability(!Availability)}
                      className="flex justify-between w-full h-fit hover:cursor-pointer hover:text-[#c5172e] transition-all duration-100 ease-in-out"
                    >
                      Availability
                      {Availability ? (
                        <RiArrowDropUpLine className="mt-1 text-2xl" />
                      ) : (
                        <RiArrowDropDownLine className="mt-1 text-2xl" />
                      )}
                    </div>

                    <div
                      className={`${
                        Availability
                          ? "opacity-100 h-fit pointer-events-auto mt-3"
                          : "opacity-0 h-0 pointer-events-none"
                      } flex flex-col gap-3 text-lg z-100 pl-3 [&>*]:font-normal [&>*]:hover:cursor-pointer [&>*]:hover:text-[#c5172e] [&>*]:transition-all [&>*]:duration-100 [&>*]:ease-in-out mr-5`}
                    >
                      {/* boxes  */}
                      <div className="hover:cursor-pointer">
                        <label className="flex gap-2 px-2 text-md hover:cursor-pointer">
                          <input
                            onChange={(e) =>
                              handleInputChange(e, "Availability", "inStock")
                            }
                            type="checkbox"
                            className="hover:cursor-pointer"
                          />
                          In Stock
                        </label>
                      </div>

                      <div className="hover:cursor-pointer">
                        <label className="flex gap-2 px-2 text-md hover:cursor-pointer">
                          <input
                            onChange={(e) =>
                              handleInputChange(e, "Availability", "outStock")
                            }
                            type="checkbox"
                            className="hover:cursor-pointer"
                          />
                          Out of Stock
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* brand  */}
                  {whichfilter === 2 ? (
                    <div className="flex flex-col justify-between w-full border-1 border-transparent border-b-GrayLight py-2">
                      <div
                        onClick={() => setBrand(!brand)}
                        className="flex justify-between w-full h-fit hover:cursor-pointer hover:text-[#c5172e] transition-all duration-100 ease-in-out"
                      >
                        Brands
                        {brand ? (
                          <RiArrowDropUpLine className="mt-1 text-2xl" />
                        ) : (
                          <RiArrowDropDownLine className="mt-1 text-2xl" />
                        )}
                      </div>

                      {/* boxes */}
                      <div
                        className={`${
                          brand
                            ? "opacity-100 h-fit pointer-events-auto mt-3"
                            : "opacity-0 h-0 pointer-events-none"
                        } flex flex-col gap-3 text-lg z-100 pl-3 [&>*]:font-normal [&>*]:hover:cursor-pointer [&>*]:hover:text-[#c5172e] [&>*]:transition-all [&>*]:duration-100 [&>*]:ease-in-out mr-5`}
                      >
                        {prodBrands &&
                          prodBrands.map((brand, index) => (
                            <div key={index} className="hover:cursor-pointer">
                              <label className="flex justify-start gap-2 w-full px-2 text-md hover:cursor-pointer">
                                <input
                                  onChange={(e) =>
                                    handleInputChange(e, "Brand", brand)
                                  }
                                  type="checkbox"
                                  className="hover:cursor-pointer"
                                />
                                {brand}
                              </label>
                            </div>
                          ))}
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                  {/* type  */}
                  {whichfilter === 1 ? (
                    <div className="flex flex-col justify-between w-full border-1 border-transparent border-b-GrayLight py-2">
                      <div
                        onClick={() => setType(!type)}
                        className="flex justify-between w-full h-fit hover:cursor-pointer hover:text-[#c5172e] transition-all duration-100 ease-in-out"
                      >
                        Types
                        {type ? (
                          <RiArrowDropUpLine className="mt-1 text-2xl" />
                        ) : (
                          <RiArrowDropDownLine className="mt-1 text-2xl" />
                        )}
                      </div>

                      {/* boxes */}
                      <div
                        className={`${
                          type
                            ? "opacity-100 h-fit pointer-events-auto mt-3"
                            : "opacity-0 h-0 pointer-events-none"
                        } flex flex-col gap-3 text-lg z-100 pl-3 [&>*]:font-normal [&>*]:hover:cursor-pointer [&>*]:hover:text-[#c5172e] [&>*]:transition-all [&>*]:duration-100 [&>*]:ease-in-out mr-5`}
                      >
                        {prodCategories &&
                          prodCategories.map((category, index) => (
                            <div key={index} className="hover:cursor-pointer">
                              <label className="flex justify-start gap-2 w-full px-2 text-md hover:cursor-pointer">
                                <input
                                  onChange={(e) =>
                                    handleInputChange(e, "Type", category)
                                  }
                                  type="checkbox"
                                  className="hover:cursor-pointer"
                                />
                                {category}
                              </label>
                            </div>
                          ))}
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                  {/* Price  */}
                  <div className="flex flex-col justify-between w-full mt-4">
                    <div className="flex justify-between w-full h-fit hover:cursor-pointer hover:text-[#c5172e] transition-all duration-100 ease-in-out">
                      Price
                    </div>

                    <div
                      className={`opacity-100 h-fit mt-3 flex flex-col gap-3 text-lg z-100 pl-3 mr-5`}
                    >
                      <div className="flex gap-2 justify-between">
                        <span className="w-[50%] flex items-center">
                          $
                          <input
                            onChange={(e) => {
                              setFilters((prev) => ({
                                ...prev,
                                priceFrom: e.target.value,
                              }));
                            }}
                            value={filters.priceFrom}
                            type="number"
                            className="w-full outline outline-GrayLight mx-2 p-2 font-normal"
                            placeholder="From"
                          />
                        </span>

                        <span className="w-[50%] flex items-center">
                          $
                          <input
                            onChange={(e) => {
                              setFilters((prev) => ({
                                ...prev,
                                priceTo: e.target.value,
                              }));
                            }}
                            value={filters.priceTo}
                            type="number"
                            className="w-full outline outline-GrayLight mx-2 p-2 font-normal"
                            placeholder="To"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* products div  */}
            <div className={`flex flex-col lg:w-3/4 `}>
              {/* lg filters  */}
              <div className="hidden lg:flex w-full justify-end items-center select-none gap-6 mb-5">
                <div className="flex justify-between items-center w-fit py-2 text-lg gap-4">
                  <div className="font-semibold">Sort By: </div>

                  <select
                    onChange={(e) => {
                      const value = e.target.value;
                      setFilters((prev) => ({ ...prev, Sort: value }));
                    }}
                    name="sort"
                    id="sort"
                    className="text-Gray font-normal px-2 outline-0 hover:cursor-pointer bg-WhiteLight mx-2 py-1"
                  >
                    <option value="A-Z">Alphabetically: A-Z</option>
                    <option value="Z-A">Alphabetically: Z-A</option>
                    <option value="H-L">Price: High-Low</option>
                    <option value="L-H">Price: Low-High</option>
                    <option value="Discount">Discount</option>
                  </select>
                </div>

                <div className="flex gap-2 items-center justify-center text-[1.5rem]">
                  <CiGrid41
                    onClick={() => setlist(false)}
                    className={`${
                      !list ? "text-Red" : "text-black"
                    } hover:cursor-pointer`}
                  />
                  <CiBoxList
                    onClick={() => setlist(true)}
                    className={`${
                      list ? "text-Red" : "text-black"
                    } hover:cursor-pointer`}
                  />
                </div>
              </div>

              <div
                className={`w-full h-full flex items-start ${
                  productLoading ? "justify-center" : ""
                } ${
                  list ? "flex-col" : "flex-row"
                } flex-wrap gap-x-3 gap-y-10 lg:gap-y-5 mt-10 md:mt-15 lg:mt-0`}
              >
                {!allProducts.length && !productLoading ? (
                  <div className="mainHeading flex flex-col justify-start items-start md:justify-center md:items-center mb-15 tracking-wide px-5 mt-5 md:px-10 lg:mt-10 2xl:w-[1500px] 2xl:mx-auto">
                    <h1 className="py-3 text-center text-2xl md:text-4xl font-bold">
                      No Product Found
                    </h1>
                    <span className="bg-Red w-[100px] lg:w-[10%] h-1"></span>
                  </div>
                ) : (
                  <></>
                )}
                {allProducts && !productLoading ? (
                  allProducts.map((product, index) => (
                    <Link
                      to={`/singleProduct/${product._id}`}
                      key={index}
                      className={`item flex ${
                        list
                          ? "w-full  bigSm:flex-row items-center bigSm:items-start"
                          : "w-[calc(50%-0.375rem)] sm:w-[calc(33%-0.375rem)] md:w-[calc(24%-0.375rem)]"
                      } h-fit flex-col gap-1 justify-around`}
                    >
                      
                      {/* images  */}
                      <div
                        className={`relative group h-[40%] lg:h-[75%] flex justify-center items-center transition-all duration-300 ease-in-out ${
                          list ? "w-[50%]" : ""
                        }`}
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
                          alt=""
                        />

                        {product.productDiscount && (
                          <span
                            className={`bg-[#c5172e] text-white absolute top-0 ${
                              list ? "left-5" : "right-5"
                            } rounded-[100%] h-9 w-9 md:h-11 md:w-11 flex justify-center items-center text-sm`}
                          >
                            -{product.productDiscount}%
                          </span>
                        )}
                        {/* out of stock  */}
                        {product.productStock == 0 ? (
                          <div
                            className={`imageIcons absolute top-0 left-0 w-15 h-15 flex justify-center items-center text-[5vh] md:text-[5.5vh] mb-2 transition duration-300 ease-in-out drop-shadow-md`}
                          >
                            <img src="/buttons/out-of-stock.png" alt="" />
                          </div>
                        ) : (
                          <></>
                        )}
                        
                      </div>

                      {/* content  */}
                      <div
                        className={`flex flex-col justify-start ${
                          list
                            ? "items-center bigSm:items-start"
                            : "items-center"
                        } w-full`}
                      >
                        <p className="text-center font-medium text-Gray text-md lg:text-lg ">
                          {product.productBrand}
                        </p>
                        <h4
                          className={`${
                            list
                              ? "text-center bigSm:text-start"
                              : "text-center truncate"
                          } font-medium tracking-wide text-lg lg:text-xl w-full`}
                        >
                          {product.productName}
                        </h4>

                        <div className="icons flex justify-center my-3 text-Gray gap-1 hover:cursor-pointer">
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
                              ${Number(product.productPrice).toFixed(2)}
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
                              : Number(product.productPrice).toFixed(2)}
                          </p>
                        </div>

                        {list && (
                          <button className="py-2 text-md xl:text-md font-medium w-[10rem] bg-[#c5172e] text-white hover:cursor-pointer transition duration-200 ease-in-out mt-2 lg:mt-5 active:translate-y-1">
                            Add To Cart
                          </button>
                        )}
                      </div>
                    </Link>
                  ))
                ) : (
                  <ClipLoader />
                )}
              </div>
            </div>
          </div>

          {/* pagination */}
          <div className="w-full px-4 my-10 flex justify-center items-center">
            <Pagination
              onClick={handleClick}
              count={totalPages}
              variant="outlined"
              shape="rounded"
              onChange={(e, value) => {
                setPage(value);
              }}
              page={page}
            />
          </div>

          <NewsLetter />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default ShopChilds;
