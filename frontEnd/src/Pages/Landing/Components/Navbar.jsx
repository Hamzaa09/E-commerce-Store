import React, { useEffect, useState } from "react";
import { CiShoppingCart, CiUser, CiHeart } from "react-icons/ci";
import {
  RiArrowDropDownLine,
  RiArrowDropRightLine,
  RiArrowDropUpLine,
} from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import { VscClose } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getCartProductsThunk,
  getNavThunk,
} from "../../../../store/products/product.thunk";
import { getCartThunk } from "../../../../store/users/user.thunk";

const Navbar = (props) => {
  const [navShad, setNavShad] = useState(false);
  const [nav, setNav] = useState(false);
  const [shop, setShop] = useState(false);
  const [s1, setS1] = useState(false);
  const [s2, setS2] = useState(false);
  const [sneakers, setSneakers] = useState(false);
  const { cart, userProfile } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const { prodBrands, prodCategories, totalCartProducts } = useSelector(
    (state) => state.productSlice
  );

  useEffect(() => {
    dispatch(getCartThunk());
  }, [dispatch]);

  useEffect(() => {
    if (cart) {
      dispatch(getCartProductsThunk(cart));
    }
  }, [cart, dispatch]);

  useEffect(() => {
    dispatch(getNavThunk());
  }, [totalCartProducts]);

  useEffect(() => {
    const handleScroll = () => {
      setNavShad(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (nav) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [nav]);

  return (
    <>
      {/* black body  */}
      {nav && (
        <div
          onClick={() => setNav(false)}
          className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.3)] bg-opacity-30 z-508"
        />
      )}

      {/* small  */}
      <nav
        className={`lg:hidden lg:pointer-events-none ${
          !nav ? "sticky" : ""
        } top-0 left-0 z-509 flex justify-between items-center h-fit px-5 md:px-10 py-2 md:py-4 bg-white ${
          navShad ? "shadow-md" : "shadow-none"
        }`}
      >
        <div className="flex justify-center items-center gap-5 transition-all duration-100 ease-in-out md:h-5 h-10">
          <RxHamburgerMenu
            onClick={() => setNav(true)}
            className="text-2xl cursor-pointer hover:text-Red"
          />
          <div className="logo flex justify-center items-center h-[90%] md:w-[17vw] w-[25vw] sm:w-[22vw]">
            <Link to="/">
              <img src="/Logo.jpg" alt="logo" className="h-full" />
            </Link>
          </div>
        </div>

        {/* nav drawer */}
        <ul
          className={`fixed w-[70%] sm:w-[40vw] top-0 transition-all duration-300 ease-in-out ${
            nav ? "left-0" : "left-[-500px]"
          } bg-white h-screen z-610`}
        >
          <div className="flex justify-between py-3 transition-all duration-100 ease-in-out border-1 border-transparent border-b-GrayLight">
            <h3 className="tracking-wide font-semibold py-1 px-4 text-xl">
              Menu
            </h3>
            <VscClose
              onClick={() => setNav(false)}
              className="text-3xl cursor-pointer hover:text-Red my-1 mx-3"
            />
          </div>

          <div className="flex flex-col items-start gap-4 text-lg tracking-wide font-medium px-5 py-5 [&>*]:hover:cursor-pointer [&>*]:hover:text-[#c5172e] [&>*]:transition-all [&>*]:duration-100 [&>*]:ease-in-out border-1 border-transparent border-b-GrayLight">
            <Link
              className={`${props.value === "home" ? "text-Red" : ""}`}
              to="/"
            >
              Home
            </Link>
            <div className="flex flex-col justify-between w-full">
              <div
                onClick={() => setShop(!shop)}
                className="flex justify-between w-full h-fit"
              >
                <Link to="/shop">Shop</Link>
                {shop ? (
                  <RiArrowDropUpLine className="mt-1 text-2xl" />
                ) : (
                  <RiArrowDropDownLine className="mt-1 text-2xl" />
                )}
              </div>

              <div
                className={`${
                  shop
                    ? "opacity-100 h-fit pointer-events-auto"
                    : "opacity-0 h-0 pointer-events-none"
                } flex relative w-full flex-col`}
              >
                <div className="flex flex-col justify-between px-2 w-full">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setS1(!s1);
                    }}
                    className="flex justify-between w-full hover:text-Red text-black"
                  >
                    <h4 className="py-2 font-medium">Brands</h4>
                    {s1 ? (
                      <RiArrowDropUpLine className="mt-2 text-2xl" />
                    ) : (
                      <RiArrowDropRightLine className="mt-2 text-2xl" />
                    )}
                  </div>

                  <ul
                    className={`${
                      s1
                        ? "opacity-100 h-fit pointer-events-auto"
                        : "opacity-0 h-0 pointer-events-none"
                    } flex flex-col gap-3 text-lg z-100 pl-3 [&>*]:font-normal [&>*]:hover:cursor-pointer [&>*]:hover:text-[#c5172e] [&>*]:transition-all [&>*]:duration-100 [&>*]:ease-in-out mr-5`}
                  >
                    {prodBrands &&
                      prodBrands.map((prod, i) => (
                        <Link key={i} to={`/shop/${prod}`}>
                          {prod}
                        </Link>
                      ))}
                  </ul>
                </div>

                <div className="flex flex-col justify-between px-2 w-full">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setS2(!s2);
                    }}
                    className="flex justify-between w-full hover:text-Red text-black"
                  >
                    <h4 className="py-2 font-medium">Categories</h4>
                    {s2 ? (
                      <RiArrowDropUpLine className="mt-2 text-2xl" />
                    ) : (
                      <RiArrowDropRightLine className="mt-2 text-2xl" />
                    )}
                  </div>

                  <ul
                    className={`${
                      s2
                        ? "opacity-100 h-fit pointer-events-auto"
                        : "opacity-0 h-0 pointer-events-none"
                    } flex flex-col gap-3 text-lg z-100 pl-3 [&>*]:font-normal [&>*]:hover:cursor-pointer [&>*]:hover:text-[#c5172e] [&>*]:transition-all [&>*]:duration-100 [&>*]:ease-in-out mr-5`}
                  >
                    {prodCategories &&
                      prodCategories.map((prod, i) => (
                        <Link key={i} to={`/shop/${prod}`}>
                          {prod}
                        </Link>
                      ))}
                  </ul>
                </div>
              </div>
            </div>

            <Link
              className={`${props.value === "collections" ? "text-Red" : ""}`}
              to="/collections"
            >
              Collections
            </Link>

            <div className="flex flex-col justify-between w-full">
              <div
                onClick={() => setSneakers(!sneakers)}
                className="flex justify-between w-full h-fit"
              >
                <Link to="/sneakers">Sneakers</Link>
                {sneakers ? (
                  <RiArrowDropUpLine className="mt-1 text-2xl" />
                ) : (
                  <RiArrowDropDownLine className="mt-1 text-2xl" />
                )}
              </div>

              <ul
                className={`${
                  sneakers
                    ? "opacity-100 h-fit pointer-events-auto mt-3"
                    : "opacity-0 h-0 pointer-events-none"
                } flex flex-col gap-3 text-lg z-100 pl-3 [&>*]:font-normal [&>*]:hover:cursor-pointer [&>*]:hover:text-[#c5172e] [&>*]:transition-all [&>*]:duration-100 [&>*]:ease-in-out mr-5`}
              >
                {prodBrands &&
                  prodBrands.map((prod, i) => (
                    <Link
                      key={i}
                      className="text-Gray"
                      to={`/sneakers/${prod}`}
                    >
                      {prod}
                    </Link>
                  ))}
              </ul>
            </div>

            <Link
              className={`${props.value === "blogs" ? "text-Red" : ""}`}
              to="/blogs"
            >
              Blogs
            </Link>
            <Link
              className={`${props.value === "contact" ? "text-Red" : ""}`}
              to="/contact"
            >
              Contact
            </Link>
          </div>
        </ul>

        <div className="cartPanel flex gap-1 md:gap-2 text-3xl [&>*]:hover:cursor-pointer [&>*]:hover:text-[#c5172e] [&>*]:transition-all [&>*]:duration-100 [&>*]:ease-in-out">
          <Link to="/user">
            <CiUser className={`${props.value === "user" ? "text-Red" : ""}`} />
          </Link>
          <div className="relative">
            <Link to="/cart">
              <CiShoppingCart
                className={`${props.value === "cart" ? "text-Red" : ""}`}
              />
            </Link>
            {totalCartProducts ? (
              <span className="bg-[#c5172e] text-white absolute top-[-4px] right-[-6px] rounded-[100%] h-4 w-4 flex justify-center items-center md:h-5 md:w-5 text-sm">
                {totalCartProducts}
              </span>
            ) : (
              <></>
            )}
          </div>
        </div>
      </nav>

      {/* larger */}
      <nav
        className={`hidden sticky top-0 left-0 z-509 lg:flex justify-between h-fit items-center px-10 xl:px-15 bg-white ${
          navShad ? "shadow-md" : "shadow-none"
        }`}
      >
        <div className="logo flex justify-center items-center w-[13vw] 2xl:w-[150px] py-6">
          <Link to="/">
            <img src="/Logo.jpg" alt="logo" />
          </Link>
        </div>

        <ul className="flex gap-7 text-xl font-semibold [&>*]:hover:cursor-pointer [&>*]:hover:text-[#c5172e] [&>*]:transition-all [&>*]:duration-100 [&>*]:ease-in-out">
          <Link
            className={`${props.value === "home" ? "text-Red" : ""}`}
            to="/"
          >
            Home
          </Link>
          <div className="flex justify-center items-center relative group">
            <Link to="/shop">Shop</Link>
            <RiArrowDropDownLine className="mt-1 text-xl" />

            {/* Dropdown */}
            <div className="absolute top-full left-0 lg:w-[35vw] xl:w-[25vw] opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 ease-in-out z-[1000] flex items-end">
              <div className="h-[90%] w-full bg-white shadow-sm rounded-sm flex mt-8 py-5 px-5">
                {/* First Column */}
                <ul className="flex flex-col gap-3 text-lg pl-3 mr-5">
                  <div className="flex flex-col w-full mb-2">
                    <h4 className="py-3 text-xl font-medium text-black hover:text-black">
                      Brands
                    </h4>
                    <span className="bg-[#c5172e] w-[35%] h-0.5"></span>
                  </div>

                  {prodBrands &&
                    prodBrands.map((prod, i) => (
                      <Link
                        key={i}
                        className="text-Gray font-normal"
                        to={`/shop/${prod}`}
                      >
                        {prod}
                      </Link>
                    ))}
                </ul>

                {/* Second Column */}
                <ul className="flex flex-col gap-3 text-lg pl-3 mr-5">
                  <div className="flex flex-col w-full mb-2">
                    <h4 className="py-3 text-xl font-medium text-black hover:text-black">
                      Categories
                    </h4>
                    <span className="bg-[#c5172e] w-[35%] h-0.5"></span>
                  </div>

                  {prodCategories &&
                    prodCategories.map((prod, i) => (
                      <Link
                        key={i}
                        className="text-Gray font-normal"
                        to={`/shop/${prod}`}
                      >
                        {prod}
                      </Link>
                    ))}
                </ul>
              </div>
            </div>
          </div>

          <Link
            className={`${props.value === "collections" ? "text-Red" : ""}`}
            to="/collections"
          >
            Collections
          </Link>
          <div className="flex justify-center items-center relative group">
            <Link to="/sneakers">Sneakers</Link>
            <RiArrowDropDownLine className="mt-1 text-xl" />
            <div className="opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto absolute top-full left-0 lg:w-[20vw] xl:w-[16vw] transition-all duration-200 ease-in-out z-[1000]">
              <ul className="flex flex-col gap-3 text-lg bg-white z-100 w-full px-5 py-5 [&>*]:hover:cursor-pointer [&>*]:transition-all [&>*]:duration-100 [&>*]:ease-in-out [&>*]:font-normal shadow-sm rounded-sm mt-8">
                {prodBrands &&
                  prodBrands.map((prod, i) => (
                    <Link
                      key={i}
                      className="text-Gray"
                      to={`/sneakers/${prod}`}
                    >
                      {prod}
                    </Link>
                  ))}
              </ul>
            </div>
          </div>

          <Link
            className={`${props.value === "blogs" ? "text-Red" : ""}`}
            to="/blogs"
          >
            Blogs
          </Link>
          <Link
            className={`${props.value === "contact" ? "text-Red" : ""}`}
            to="/contact"
          >
            Contact
          </Link>
        </ul>

        <div className="cartPanel flex gap-3 text-4xl [&>*]:hover:cursor-pointer [&>*]:hover:text-[#c5172e] [&>*]:transition-all [&>*]:duration-100 [&>*]:ease-in-out">
          <Link to="/user">
            <CiUser className={`${props.value === "user" ? "text-Red" : ""}`} />
          </Link>

          <div className="relative">
            <Link to="/cart">
              <CiShoppingCart
                className={`${props.value === "cart" ? "text-Red" : ""}`}
              />
            </Link>

            {totalCartProducts ? (
              <span className="bg-[#c5172e] text-white text-center absolute top-[-4px] right-[-6px] rounded-[100%] h-5 w-5 text-sm">
                {totalCartProducts}
              </span>
            ) : (
              <></>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
