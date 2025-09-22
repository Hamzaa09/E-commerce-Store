import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { HiOutlineUsers } from "react-icons/hi2";
import { VscFeedback } from "react-icons/vsc";
import { PiShoppingCart } from "react-icons/pi";
import { GoPackage } from "react-icons/go";
import { LuLayoutTemplate } from "react-icons/lu";
import { useContext } from "react";
import { AdminNavContext } from "./AdminNavContext";
import { TbLogs } from "react-icons/tb";

const SideBarComponent = (props) => {
  const { nav, setNav } = useContext(AdminNavContext);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setNav(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (nav && window.innerWidth <= 767) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [nav]);

  return (
    <div className="flex w-fit transition-all duration-300 ease-in-out h-fit md:sticky md:top-0">
      {/* nav drawer */}
      <ul
        className={`absolute z-1001 top-20 md:relative md:top-0 bg-white ${
          nav ? "w-[60vw] sm:w-[40vw] md:w-[23vw] lg:w-[20vw]" : "w-0"
        } h-screen transition-all duration-300 ease-in-out overflow-hidden shadow-lg border border-transparent border-r-GrayLight`}
      >
        {/* logo  */}
        <div className="hidden md:flex justify-between px-5 py-3 transition-all duration-100 ease-in-out">
          <div className="flex justify-center items-center gap-5 transition-all duration-100 ease-in-out w-fit">
            <div className="logo flex justify-center items-center md:h-[5vh] md:w-[140px] lg:w-[130px] h-fit w-[25vw] sm:w-[22vw]">
              <Link to="/">
                <img src="/Logo.jpg" alt="logo" />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-1 text-lg lg:text-xl tracking-wide font-medium pl-2 py-5 [&>*]:p-2 [&>*]:rounded-bl-2xl [&>*]:rounded-tl-2xl [&>*]:w-full [&>*]:hover:bg-WhiteLight [&>*]:active:translate-y-1 [&>*]:transition-all [&>*]:duration-100 [&>*]:ease-in-out">
          <Link
            className={`flex gap-2 items-center
              ${
                props.value === "dashboard"
                  ? "bg-WhiteLight shadow-sm/10 text-"
                  : ""
              }`}
            to="/admin/dashboard"
          >
            <GoHome
              className={`${props.value === "dashboard" ? "text-Red" : ""}`}
            />
            Dash Board
          </Link>
          <Link
            className={`flex gap-2 items-center ${
              props.value === "productsManagement"
                ? "bg-WhiteLight shadow-sm/10"
                : ""
            }`}
            to="/admin/productsManagement"
          >
            <GoPackage
              className={`${
                props.value === "productsManagement" ? "text-Red" : ""
              }`}
            />
            Products
          </Link>
          <Link
            className={`flex gap-2 items-center ${
              props.value === "usersManagement"
                ? "bg-WhiteLight shadow-sm/10"
                : ""
            }`}
            to="/admin/usersManagement"
          >
            <HiOutlineUsers
              className={`${
                props.value === "usersManagement" ? "text-Red" : ""
              }`}
            />
            Users
          </Link>
          <Link
            className={`flex gap-2 items-center ${
              props.value === "ordersManagement"
                ? "bg-WhiteLight shadow-sm/10"
                : ""
            }`}
            to="/admin/ordersManagement"
          >
            <PiShoppingCart
              className={`${
                props.value === "ordersManagement" ? "text-Red" : ""
              }`}
            />
            Orders
          </Link>
          <Link
            className={`flex gap-2 items-center ${
              props.value === "blogsManagement" ? "bg-WhiteLight shadow-sm/10" : ""
            }`}
            to="/admin/blogsManagement"
          >
            <TbLogs
              className={`${
                props.value === "blogsManagement" ? "text-Red" : ""
              }`}
            />
            Blogs
          </Link>
          <Link
            className={`flex gap-2 items-center ${
              props.value === "inquiriesManagement"
                ? "bg-WhiteLight shadow-sm/10"
                : ""
            }`}
            to="/admin/inquiriesManagement"
          >
            <VscFeedback
              className={`${
                props.value === "inquiriesManagement" ? "text-Red" : ""
              }`}
            />
            Inquiries
          </Link>
        </div>
      </ul>
    </div>
  );
};

export default SideBarComponent;
