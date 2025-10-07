import React from "react";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="relative w-full h-[35vh] sm:h-[40vh] md:h-[50vh] lg:h-[70vh] mt-10 md:mt-15 px-5 md:px-10 xl:mt-20 lg:px-20 bg-[url(/banner/b1.jpg)] bg-right opacity-[85%] bg-cover flex flex-col text-white tracking-wide">
      {/* content  */}
      <div className="content w-[75%] sm:w-[55%] md:w-[65%] lg:w-[45%] my-auto h-fit z-20 flex flex-col gap-2 sm:gap-3 md:gap-5 lg:gap-7 justify-between">
        <p className="text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl font-semibold tracking-wider xl:text-widest">
          SUGGESTED FOR YOU
        </p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold">
          CAMPUS NORTH RUNNING SHOES FOR MEN
        </h1>

        <button
          onClick={() => navigate("/shop")}
          className="bg-white text-black py-2 lg:py-4 text-sm xl:text-md font-medium w-[50%] hover:bg-[#c5172e] hover:text-white hover:cursor-pointer transition duration-200 ease-in-out mt-2 lg:mt-5"
        >
          SHOP NOW
        </button>
      </div>
    </div>
  );
};

export default Banner;
