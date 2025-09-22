import React, { useEffect } from "react";
import Navbar from "../Landing/Components/Navbar";
import TagLine from "../Landing/Components/TagLine";
import Footer from "../Landing/Components/Footer";
import ScrollToTopButton from "../Landing/Components/ScrollToTopButton";
import NewsLetter from "../Landing/Components/NewsLetter";
import BreadCrum from "../Landing/Components/BreadCrum";
import { useDispatch, useSelector } from "react-redux";
import { getBlogThunk } from "../../../store/blogs/blog.thunk";
import { ClipLoader } from "react-spinners";

const BlogsPage = () => {
  const dispatch = useDispatch();
  const { allblogs, blogLoading } = useSelector((state) => state.blogSlice);

  useEffect(() => {
    dispatch(getBlogThunk());
  }, [dispatch]);

  return (
    <>
      <ScrollToTopButton />
      <TagLine />
      <Navbar value="blogs" />

      <BreadCrum />

      <div className="px-5 mt-10 md:mt-15 md:px-10 lg:mt-20 2xl:w-[1500px] 2xl:mx-auto w-full flex gap-3 gap-y-15 flex-wrap">
        {allblogs ? (
          allblogs.map((blog, index) => (
            <div
              key={index}
              className="md:w-[calc(50%-0.375rem)] xl:w-[calc(33%-0.375rem)] group h-[55vh] w-full flex flex-col gap-2 justify-around"
            >
              <div className="relative group h-[75%] mb-2 flex justify-center items-center overflow-hidden">
                <img
                  src={blog.blogImage}
                  className="h-full w-full transition-all duration-1000 ease-in-out object-cover"
                  alt="product-img"
                />
              </div>

              <p className="text-Red font-bold text-md">{blog.blogDate.split("T",1)[0]}</p>
              <h3 className="text-md md:text-xl md:py-1 font-medium">
                {blog.blogTitle}
              </h3>
              <h4 className="text-md md:text-xl text-Gray">
                {blog.blogContent}
              </h4>
            </div>
          ))
        ) : (
          <div className="w-full flex justify-center items-start">
            <ClipLoader />
          </div>
        )}
      </div>

      <NewsLetter />
      <Footer />
    </>
  );
};

export default BlogsPage;
