import React, { useEffect, useState } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import ScrollToTopButton from "../src/Pages/Landing/Components/ScrollToTopButton";
import TagLine from "../src/Pages/Landing/Components/TagLine";
import Navbar from "../src/Pages/Landing/Components/Navbar";
import BreadCrum from "../src/Pages/Landing/Components/BreadCrum";
import NewsLetter from "../src/Pages/Landing/Components/NewsLetter";
import Footer from "../src/Pages/Landing/Components/Footer";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

const ProtectedRoute = ({ role }) => {
  const { screenLoading } = useSelector((state) => state.userSlice);
  const [Admin, setAdmin] = useState(false);

  useEffect(() => {
    if (role === "admin") setAdmin(true);
  }, [role]);

  if (!Admin) {
    return (
      <>
        <ScrollToTopButton />
        <TagLine />
        <Navbar value="" />

        <BreadCrum />

        {/* heading  */}
        <div className="mainHeading flex flex-col justify-start items-start md:justify-center md:items-center mb-15 tracking-wide px-5 mt-5 md:px-10 lg:mt-10 2xl:w-[1500px] 2xl:mx-auto">
          <h1 className="py-3 text-center text-2xl md:text-4xl font-bold">
            403: Not An Admin!
          </h1>
          <span className="bg-Red w-[100px] lg:w-[10%] h-1"></span>
        </div>

        <div className="mainHeading flex justify-center items-center mb-15 tracking-wide px-5 mt-5 md:px-10 lg:mt-10 2xl:w-[1500px] 2xl:mx-auto">
          <button className="w-[80%] md:w-[50%] lg:w-[20%] py-3 md:py-4 bg-Red text-white text-lg font-[500] hover:cursor-pointer hover:underline transition-all duration-150 active:translate-y-1">
            <Link to="/user">Login As Admin</Link>
          </button>
        </div>

        <NewsLetter />
        <Footer />
      </>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
