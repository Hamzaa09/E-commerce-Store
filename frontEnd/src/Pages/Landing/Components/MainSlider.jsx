import React, { useState, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";

const MainSlider = () => {
  const navigate = useNavigate();
  const [buttonDisplay, setButtonDisplay] = useState(false);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const imgArr = [
    {
      src: "/mainSlider/imageOne1.jpg",
      h1: "VANS SPORTS RUNNING SHOES FOR MEN",
      p: "2025 LIMITED EDITION",
      text_color: "text-black",
    },
    {
      src: "/mainSlider/imageTwo2.jpg",
      h1: "GUCCI SPORTS RUNNING SHOES FOR MEN",
      p: "2025 LIMITED EDITION",
      text_color: "text-white",
    },
  ];

  return (
    <div
      onMouseEnter={() => setButtonDisplay(true)}
      onMouseLeave={() => setButtonDisplay(false)}
      className="parent group relative w-full h-fit"
    >
      <Swiper
        modules={[Navigation, Autoplay]}
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        slidesPerView={1}
      >
        {imgArr.map((obj, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[35vh] sm:h-[40vh] md:h-[50vh] lg:h-[70vh] bg-right opacity-[85%] bg-cover flex flex-col text-white tracking-wide">
              <img
                src={obj.src}
                className="absolute h-full w-full object-cover object-[40%]"
                alt="Slider Image"
                loading="lazy"
                decoding="async"
              />
              <div
                className={`content ${obj.text_color} w-fit my-auto sm:mr-5 h-fit z-20 flex flex-col gap-2 sm:gap-3 md:gap-5 lg:gap-7 justify-between ml-[40%] sm:ml-[50%] md:ml-[50%] xl:ml-[55%]`}
              >
                <p className="text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl font-semibold tracking-wider xl:text-widest">
                  {obj.p}
                </p>
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold">
                  {obj.h1}
                </h1>
                <button
                  onClick={() => navigate("/shop")}
                  className="bg-white text-black py-2 lg:py-4 text-sm xl:text-md font-medium w-[50%] hover:bg-[#c5172e] hover:text-white hover:cursor-pointer transition duration-200 ease-in-out mt-2 lg:mt-5"
                >
                  SHOP NOW
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Buttons */}
      <button
        ref={prevRef}
        className={`${
          buttonDisplay ? "visible" : "hidden"
        } opacity-0 group-hover:lg:opacity-100 absolute top-[40%] left-5 z-10 p-5 rounded-full bg-white text-black text-lg hover:bg-Red hover:text-white transition duration-250 ease-in-out`}
      >
        <FaArrowLeft />
      </button>
      <button
        ref={nextRef}
        className={`${
          buttonDisplay ? "visible" : "hidden"
        } opacity-0 group-hover:lg:opacity-100 absolute top-[40%] right-5 z-10 p-5 rounded-full bg-white text-black text-lg hover:bg-Red hover:text-white transition duration-250 ease-in-out`}
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default MainSlider;
