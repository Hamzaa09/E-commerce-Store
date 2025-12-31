import React, { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getBlogThunk } from "../../../../store/blogs/blog.thunk";
import { Link } from "react-router-dom";
import BlogSkeleton from "../../../Skeletons/BlogSkeleton";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const LatestBlogs = () => {
  const [buttonDisplay, setButtonDisplay] = useState(false);
  const dispatch = useDispatch();
  const { allblogs, blogLoading } = useSelector((state) => state.blogSlice);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    dispatch(getBlogThunk());
  }, [dispatch]);

  return (
    <div
      onMouseEnter={() => setButtonDisplay(true)}
      onMouseLeave={() => setButtonDisplay(false)}
      className="parent relative lg:px-20 w-full"
    >
      {/* Heading */}
      <div className="mainHeading flex flex-col justify-center items-center mb-10 tracking-wide">
        <h1 className="py-3 text-center text-2xl md:text-4xl font-bold">
          LATEST BLOGS
        </h1>
        <span className="text-center bg-Red w-[140px] lg:w-[10%] h-1"></span>
      </div>

      {/* Carousel */}
      {blogLoading ? (
        <div className="flex w-full justify-start gap-2 overflow-x-hidden">
          <div className="bigSm:w-1/2 lg:w-1/3 w-full block">
            <BlogSkeleton />
          </div>
          <div className="hidden bigSm:w-1/2 lg:w-1/3 bigSm:block pl-4 lg:px-4">
            <BlogSkeleton />
          </div>
          <div className="hidden bigSm:w-1/2 lg:w-1/3 lg:block">
            <BlogSkeleton />
          </div>
        </div>
      ) : (
        <div className="relative">
          {allblogs?.length > 0 && (
            <>
              {/* Swiper Carousel */}
              <Swiper
                modules={[Navigation]}
                loop
                speed={700}
                slidesPerView={1}
                spaceBetween={10}
                breakpoints={{
                  600: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                navigation={{
                  prevEl: prevRef?.current,
                  nextEl: nextRef?.current,
                }}
                onBeforeInit={(swiper) => {
                  swiper.params.navigation.prevEl = prevRef?.current;
                  swiper.params.navigation.nextEl = nextRef?.current;
                }}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                className="main-slider"
              >
                {allblogs.map((blog, index) => (
                  <SwiperSlide key={index}>
                    <Link
                      to="/blogs"
                      className="item group h-[45vh] md:h-[55vh] w-full flex flex-col gap-2 justify-around"
                    >
                      <div className="relative group h-[60%] mb-2 flex justify-center items-center overflow-hidden">
                        <img
                          src={blog.blogImage}
                          className="h-full w-full group-hover:scale-105 transition-all duration-1000 ease-in-out object-cover"
                          alt="blog-img"
                        />
                      </div>

                      <div className="h-[40%]">
                        <p className="text-Red font-bold text-md">
                          {blog.blogDate.split("T", 1)[0]}
                        </p>
                        <h3 className="text-md md:text-xl md:py-1 font-medium group-hover:text-Red truncate">
                          {blog.blogTitle}
                        </h3>
                        <h4 className="text-md md:text-xl text-Gray line-clamp-2">
                          {blog.blogContent}
                        </h4>
                        <p className="text-Red font-bold text-md underline hover:no-underline mt-1">
                          READ MORE
                        </p>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          )}
        </div>
      )}
      {/* Custom Buttons */}
      <button
        ref={prevRef}
        className={`${
          buttonDisplay ? "visible" : "hidden"
        } absolute top-[45%] left-2 md:left-5 lg:left-10 z-10 p-3 md:p-4 lg:p-5 rounded-full drop-shadow-md bg-white text-black md:text-md lg:text-lg text-sm hover:cursor-pointer transition duration-250 ease-in-out`}
      >
        <FaArrowLeft />
      </button>

      <button
        ref={nextRef}
        className={`${
          buttonDisplay ? "visible" : "hidden"
        } absolute top-[45%] right-2 md:right-5 lg:right-10 z-10 p-3 md:p-4 lg:p-5 rounded-full drop-shadow-md bg-white text-black md:text-md lg:text-lg text-sm hover:cursor-pointer transition duration-250 ease-in-out`}
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default LatestBlogs;
