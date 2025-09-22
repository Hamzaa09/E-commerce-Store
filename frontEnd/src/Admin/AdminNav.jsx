import { HiBars3 } from "react-icons/hi2";
import { PiCommandLight } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AdminNavContext } from "./AdminNavContext";

const AdminNav = () => {
  const { nav, setNav } = useContext(AdminNavContext);
  const [navShad, setNavShad] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavShad(window.scrollY > 1);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      removeEventListener("scroll", handleScroll);
    };
  }, []);

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
    <>
      {/* closer */}
      <div
        className={`${
          navShad ? "shadow-sm" : "shadow-none"
        } bg-white z-10 w-full h-20 text-2xl px-5 py-2 border border-GrayLight border-l-transparent border-t-transparent flex justify-between items-center md:sticky md:top-0`}
      >
        {/* close button  */}
        <div className="flex gap-2 items-center">
          <div className="border border-GrayLight rounded-sm p-2 hover:cursor-pointer hover:bg-WhiteLight">
            <HiBars3 onClick={() => setNav(!nav)} />
          </div>
          <div className="border border-GrayLight rounded-sm hover:cursor-pointer hover:bg-WhiteLight hidden md:flex items-center px-2">
            <CiSearch className="text-2xl" />
            <input
              type="text"
              className="outline-none p-2 text-base w-[20vw]"
              placeholder="Search"
            />
            <div className="flex justify-center items-center text-Gray bg-WhiteLight border border-GrayLight px-2 rounded-md text-base">
              <PiCommandLight />K
            </div>
          </div>
        </div>

        {/* logo  */}
        <div className="flex md:hidden justify-between px-5 py-3 transition-all duration-100 ease-in-out">
          <div className="flex justify-center items-center gap-5 transition-all duration-100 ease-in-out w-fit">
            <div className="logo flex justify-center items-center md:h-[5vh] md:w-[140px] lg:w-[130px] h-fit w-[25vw] sm:w-[22vw]">
              <Link to="/">
                <img src="/Logo.jpg" alt="logo" />
              </Link>
            </div>
          </div>
        </div>

        {/* user profile  */}
        <div className="relative flex gap-2 max-w-50 md:max-w-[15%] truncate justify-center items-center text-lg w-fit hover:cursor-pointer hover:bg-WhiteLight p-1 rounded-md px-2">
          <img
            className="w-10 h-10 rounded-full"
            src="/ProfilePhoto.jpeg"
            alt="Rounded avatar"
          />
          <p className="truncate w-0 md:w-fit">Muhammad Hamza</p>
        </div>
      </div>
    </>
  );
};

export default AdminNav;
