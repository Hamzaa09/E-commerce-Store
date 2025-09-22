import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const BreadCrum = ({ value }) => {
  const { category } = useParams();
  const name = window.location.pathname.split("/")[1].toUpperCase();

  useEffect(() => {
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  return (
    <div className="relative w-full h-[15vh] sm:h-[22vh] lg:h-[25vh] 2xl:h-[25vh] flex justify-center tracking-wider overflow-x-hidden">
      <img
        src="/newsLetter/img1.jpg"
        className="absolute w-full h-full z-[-1] object-cover object-bottom opacity-85"
        alt=""
      />
      <div className="my-auto text-center">
        <h1 className="text-3xl xl:text-[5vh] w-[90vw] sm:w-full text-white font-bold">
          {value || category?.toUpperCase() || name || " "}
        </h1>
        <p className="text-sm sm:text-md lg:text-lg text-white font-semibold my-1 w-[90vw] sm:w-full">
          {value || window.location.pathname}
        </p>
      </div>
    </div>
  );
};

export default BreadCrum;
