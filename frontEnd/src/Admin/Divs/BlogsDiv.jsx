import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import {
  deleteBlogThunk,
  getBlogThunk,
  singleBlogThunk,
} from "../../../store/blogs/blog.thunk";
import toast from "react-hot-toast";

const BlogsDiv = ({ value }) => {
  const dispatch = useDispatch();
  const { allblogs } = useSelector((state) => state.blogSlice);
  const [AllBlogs, setAllBlogs] = useState();

  useEffect(() => {
    dispatch(getBlogThunk());
  }, [dispatch]);

  const handleUpdate = async (_id) => {
    dispatch(singleBlogThunk(_id));
  };

  const handleDelete = async (_id) => {
    const response = await dispatch(deleteBlogThunk(_id));
    if (!response?.payload?.success) {
      toast.error(response?.payload?.message || "Process failed!");
      return;
    }

    toast.success("Blog Deleted!");
    window.location.reload();
  };

  useEffect(() => {
    if (value) {
      setAllBlogs(
        AllBlogs?.filter(
          (blog) =>
            blog.blogTitle?.toLowerCase().includes(value.toLowerCase()) ||
            blog.blogContent?.toLowerCase().includes(value.toLowerCase()) ||
            String(blog.blogDate)?.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setAllBlogs(allblogs);
    }
  }, [value, allblogs]);

  return (
    <>
      {/* table */}
      <div className="w-full overflow-auto">
        <div
          className={`bg-white min-w-[800px] h-[81vh] md:w-full border border-GrayLight rounded-lg  overflow-y-scroll transition-all duration-1000 ease-in-out`}
        >
          <table className="h-fit w-full group">
            <thead>
              <tr
                className={`w-full sticky top-0 z-10 bg-white group-hover:shadow-sm [&>th]:text-start [&>th]:pl-5 [&>th]:py-4 [&>th]:text-xl [&>th]:font-semibold mb-5`}
              >
                <th className="w-[10%] sm:w-fit">S no.</th>
                <th>Title</th>
                <th>Content</th>
                <th className="w-30">Date</th>
                <th>Options</th>
              </tr>
            </thead>

            <tbody>
              {AllBlogs?.length ? (
                AllBlogs?.map((blog, index) => (
                  <tr
                    key={index}
                    className="[&>td]:text-start [&>td]:text-base [&>td]:px-4 [&>td]:py-2 border border-transparent border-b-GrayLight border-t-GrayLight last:border-b-transparent hover:bg-WhiteLight hover:cursor-pointer"
                  >
                    <td>{index + 1}</td>
                    <td className="flex justify-start h-full items-center gap-3">
                      {" "}
                      <img
                        className="w-12 h-12"
                        src={blog.blogImage}
                        alt="Rounded avatar"
                      />
                      <p>{blog.blogTitle}</p>
                    </td>
                    <td>{blog.blogContent}</td>
                    <td>{blog.blogDate.split("T")[0]}</td>
                    <td>
                      <div className="flex w-full">
                        <button
                          onClick={() => handleUpdate({ _id: blog._id })}
                          className="text-white bg-blue-500 px-2 py-1 font-medium active:translate-y-1 hover:cursor-pointer opacity-90 hover:opacity-100 hover:shadow-md/10 rounded-2xl transition duration-300 ease-in-out"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete({ _id: blog._id })}
                          className="text-white bg-Red px-2 py-1 font-medium active:translate-y-1 hover:cursor-pointer opacity-90 hover:opacity-100 hover:shadow-md/10 rounded-2xl transition duration-300 ease-in-out ml-2"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="mainHeading flex flex-col justify-start items-start md:justify-center md:items-center mb-15 tracking-wide px-5 mt-5 md:px-10 lg:mt-10 2xl:w-[1500px] 2xl:mx-auto"
                  >
                    <h1 className="py-3 text-center text-2xl md:text-3xl font-bold">
                      No Blogs
                    </h1>
                    <span className="bg-Red w-[100px] lg:w-[10%] h-1"></span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default BlogsDiv;
