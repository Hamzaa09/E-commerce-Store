import React, { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getBlogThunk } from "../../../../store/blogs/blog.thunk";
import { Link } from "react-router-dom";
import BlogSkeleton from "../../../Skeletons/BlogSkeleton";
import ReactOwlCarousel from "react-owl-carousel";
("react-owl-carousel");
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const LatestBlogs = () => {
  const [buttonDisplay, setButtonDisplay] = useState(false);
  const dispatch = useDispatch();
  const { allblogs, blogLoading } = useSelector((state) => state.blogSlice);
  const carouselRef = useRef(null);

  useEffect(() => {
    dispatch(getBlogThunk());
  }, [dispatch]);

  const handlePrev = () => {
    carouselRef.current?.prev();
  };

  const handleNext = () => {
    carouselRef.current?.next();
  };

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

          <div className="hidden bigSm:w-1/2 lg:w-1/3  bigSm:block pl-4 lg:px-4">
            <BlogSkeleton />
          </div>

          <div className="hidden bigSm:w-1/2 lg:w-1/3  lg:block">
            <BlogSkeleton />
          </div>
        </div>
      ) : (
        <div className="relative">
          {allblogs?.length > 0 && (
            <ReactOwlCarousel
              ref={carouselRef}
              className="owl-theme"
              loop
              margin={10}
              nav={false}
              dots={false}
              responsive={{
                0: { items: 1 },
                600: { items: 2 },
                1024: { items: 3 },
              }}
            >
              {allblogs?.map((blog, index) => (
                <Link
                  key={index}
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
              ))}
            </ReactOwlCarousel>
          )}
        </div>
      )}

      {/* Custom Buttons */}
      <button
        onClick={handlePrev}
        className={`${
          buttonDisplay ? "visible" : "hidden"
        } absolute top-[45%] left-2 md:left-5 lg:left-10 z-10 p-3 md:p-4 lg:p-5 rounded-full drop-shadow-md bg-white text-black md:text-md lg:text-lg text-sm hover:cursor-pointer transition duration-250 ease-in-out`}
      >
        <FaArrowLeft />
      </button>

      <button
        onClick={handleNext}
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
