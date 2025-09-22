import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getBlogThunk } from "../../../../store/blogs/blog.thunk";
import { Link } from "react-router-dom";

const LatestBlogs = () => {
  const [buttondisplay, setButtondisplay] = useState(false);
  const dispatch = useDispatch();
  const { allblogs, blogLoading } = useSelector((state) => state.blogSlice);

  useEffect(() => {
    dispatch(getBlogThunk());
  }, [dispatch]);

  useEffect(() => {
    if (allblogs)
      $(".blogs-section").owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        dots: false,
        responsive: {
          0: {
            items: 1,
          },
          768: {
            items: 2,
          },
          1000: {
            items: 3,
          },
        },
      });
  }, [allblogs]);

  return (
    <div
      onMouseEnter={() => setButtondisplay(true)}
      onMouseLeave={() => setButtondisplay(false)}
      className="parent relative lg:px-20 w-full"
    >
      {/* heading  */}
      <div className="mainHeading flex flex-col justify-center items-center mb-10 tracking-wide">
        <h1 className="py-3 text-center text-2xl md:text-4xl font-bold">
          LATEST BLOGS
        </h1>
        <span className="text-center bg-Red w-[140px] lg:w-[10%] h-1"></span>
      </div>

      {/* items  */}
      <div className="owl-carousel blogs-section owl-theme w-full flex justify-around hover:cursor-pointer">
        {allblogs?.map((blog, index) => (
          <Link
            to={"/blogs"}
            key={index}
            className="item group h-[55vh] w-full flex flex-col gap-2 justify-around"
          >
            <div className="relative group h-[75%] mb-2 flex justify-center items-center overflow-hidden">
              <img
                src={`${blog.blogImage}`}
                className="h-full w-full group-hover:scale-105 transition-all duration-1000 ease-in-out object-cover"
                alt="product-img"
              />
            </div>

            <p className="text-Red font-bold text-md">
              {blog.blogDate.split("T", 1)[0]}
            </p>
            <h3 className="text-md md:text-xl md:py-1 font-medium group-hover:text-Red">
              {blog.blogTitle}
            </h3>
            <h4 className="text-md md:text-xl text-Gray">{blog.blogContent}</h4>
            <p
              to={"/blogs"}
              className="text-Red font-bold text-md underline hover:no-underline"
            >
              READ MORE
            </p>
          </Link>
        ))}
      </div>

      {/* buttons */}
      <button
        onClick={() => $(".blogs-section").trigger("prev.owl.carousel")}
        className={`${
          buttondisplay ? "visible" : "hidden"
        } absolute top-[46%] left-10 z-10 p-5 rounded-full drop-shadow-md bg-white text-black text-lg hover:cursor-pointer transition duration-250 ease-in-out`}
      >
        <FaArrowLeft />
      </button>
      <button
        onClick={() => $(".blogs-section").trigger("next.owl.carousel")}
        className={`${
          buttondisplay ? "visible" : "hidden"
        } absolute top-[46%] right-10 z-10 p-5 rounded-full drop-shadow-md bg-white text-black text-lg hover:cursor-pointer transition duration-250 ease-in-out`}
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default LatestBlogs;
