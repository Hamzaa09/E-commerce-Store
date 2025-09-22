import SideBarComponent from "./SideBarComponent";
import AdminNav from "./AdminNav";
import PageChunk from "./Divs/PageChunk";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { createBlogThunk, updateBlogThunk } from "../../store/blogs/blog.thunk";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

const BlogsManagement = () => {
  const [addProduct, setAddProduct] = useState(false);
  const [images, setImages] = useState([]);
  const [error, seterror] = useState("");
  const dispatch = useDispatch();
  const { singleBlog } = useSelector((state) => state.blogSlice);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    blogTitle: "",
    blogContent: "",
  });

  useEffect(() => {
    if (singleBlog) {
      setAddProduct(true);
      reset({
        blogImg: singleBlog.blogImage,
        blogTitle: singleBlog.blogTitle,
        blogContent: singleBlog.blogContent,
      });
    }
  }, [singleBlog, reset]);

  const onSubmit = async (data) => {
    try {
      if (images.length === 0) {
        return seterror("Product image Requied!");
      }
      if (!singleBlog) {
        const response = await dispatch(createBlogThunk(data));
        if (!response?.payload?.success) {
          toast.error(response?.payload?.message || "Process failed!");
          return;
        }

        toast.success("Blog Created!");

        reset();
        setImages([]);
        seterror("");
        setAddProduct(false);
      } else {
        const response = await dispatch(
          updateBlogThunk({ _id: singleBlog._id, form: data })
        );
        if (!response?.payload?.success) {
          toast.error(response?.payload?.message || "Process failed!");
          return;
        }

        toast.success("Blog Updated!");

        reset();
        setImages([]);
        seterror("");
        setAddProduct(false);
      }
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const total = images.length + files.length;

    if (total > 1) {
      seterror("Only one image is allowed!");
      return;
    }

    const updatedImages = [...images, ...files];
    setImages(updatedImages);
    setValue("blogImg", updatedImages);
  };

  return (
    <div className="flex w-full">
      <div className="flex">
        <SideBarComponent value={"blogsManagement"} />
      </div>

      <div className="flex flex-col w-full bg-WhiteLight overflow-auto">
        <AdminNav />

        {/* Page's Main Content  */}

        {/* Add A Product  */}
        <div className="w-full p-5 b-0">
          <div
            className={`w-full h-fit bg-white border border-GrayLight rounded-lg `}
          >
            {/* text & Search */}
            <div className="flex justify-between items-center border border-transparent border-b-GrayLight py-3 px-5">
              <h2 className="p-2 font-semibold text-2xl text-black">
                Create A Blog
              </h2>

              <button
                onClick={() => setAddProduct(true)}
                className="w-[50%] bigSm:w-[25%] lg:w-[15%] text-white text-sm lg:text-lg font-medium bg-Red py-3 lg:py-2 active:translate-y-1 hover:cursor-pointer hover:opacity-100 hover:shadow-md/10 rounded-md transition duration-300 ease-in-out text-center"
              >
                Create +
              </button>
            </div>

            {/* form  */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={`${
                addProduct ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
              } overflow-hidden flex flex-col mt-5 lg:mt-8 xl:mt-10 gap-4 md:gap-3 justify-center items-center relative py-5 transition-all duration-300 ease-in-out`}
            >
              {/* image  */}
              <div className="relative w-[90%]">
                <div className="relative w-full h-34 border border-GrayLight flex gap-2 p-2 overflow-x-auto">
                  <label className="min-w-[100px] max-w-[100px] h-[100px] bg-GrayLight flex justify-center items-center text-2xl rounded-xl cursor-pointer relative active:translate-y-1 transition-all duration-300 ease-in-out hover:opacity-80">
                    +
                    <input
                      type="file"
                      onChange={handleImageChange}
                      name="blogImg"
                      multiple
                      accept="image/*"
                      className="absolute w-full h-full opacity-0 cursor-pointer"
                    />
                  </label>

                  {/* {images previeqw} */}
                  {images.map((file, index) => (
                    <div
                      key={index}
                      className="min-w-[100px] max-w-[100px] h-[100px] bg-GrayLight flex justify-center items-center text-2xl rounded-xl cursor-pointer relative active:translate-y-1 transition-all duration-300 ease-in-out"
                    >
                      <img
                        key={index}
                        src={URL.createObjectURL(file)}
                        alt="product"
                        className="h-full w-full rounded-xl"
                      />
                      <IoIosClose
                        className="absolute hover:bg-GrayLight rounded-full top-1 right-1"
                        onClick={(e) => {
                          const updateImages = images.filter(
                            (_, i) => i !== index
                          );
                          setImages(updateImages);
                          setValue("blogImg", updateImages);
                        }}
                      />
                    </div>
                  ))}
                </div>
                <span
                  className={`text-sm ${error ? "text-Red" : "text-Gray"} px-2`}
                >
                  {error || "Add Product Images"}
                </span>
              </div>

              {/* name  */}
              <div className="relative w-[90%]">
                <div className="w-full border border-GrayLight">
                  <input
                    type="text"
                    {...register("blogTitle", {
                      required: "Title Required!",
                      minLength: {
                        value: 2,
                        message: "Title too short!",
                      },
                    })}
                    id="blogTitle"
                    className="peer border-0 border-GrayLight outline-0 px-5 sm:px-5 pt-3 pb-2 sm:pt-4 sm:pb-3 text-md w-full"
                    placeholder=" "
                  />
                  <label
                    htmlFor="blogTitle"
                    className={`absolute left-0 py-2 sm:py-3 translate-y-[-35%] scale-[0.7] px-3 peer-placeholder-shown:px-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-0 text-Gray text-md sm:text-lg transition-all duration-150 peer-focus:translate-y-[-35%] peer-focus:scale-[0.7] peer-focus:px-3 hover:cursor-text select-none`}
                  >
                    Name<span className="text-Red"> *</span>
                  </label>
                </div>
                {errors?.blogTitle?.message && (
                  <span className="text-sm text-Red px-2">
                    {errors?.blogTitle?.message}
                  </span>
                )}
              </div>

              {/* description  */}
              <div className="relative w-[90%]">
                <div className="w-full border border-GrayLight">
                  <textarea
                    {...register("blogContent", {
                      required: "Blog Description Required!",
                      minLength: {
                        value: 10,
                        message: "Atleast 10 characters required!",
                      },
                    })}
                    id="blogContent"
                    rows={5}
                    cols={10}
                    className="peer border-0 border-GrayLight outline-0 px-5 sm:px-5 pt-3 pb-2 sm:pt-4 sm:pb-3 text-md  w-full"
                    placeholder=" "
                  />
                  <label
                    htmlFor="blogContent"
                    className={`absolute left-0 py-2 sm:py-3 translate-y-[-35%] scale-[0.7] px-2 peer-placeholder-shown:px-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-0 text-Gray text-md sm:text-lg transition-all duration-150 peer-focus:translate-y-[-35%] peer-focus:scale-[0.7] peer-focus:px-1 hover:cursor-text select-none`}
                  >
                    Description<span className="text-Red"> *</span>
                  </label>
                </div>
                {errors?.blogContent?.message && (
                  <span className="text-sm text-Red px-2">
                    {errors?.blogContent?.message}
                  </span>
                )}
              </div>

              {/* button  */}
              <div className="w-[90%] flex justify-end gap-2">
                <button
                  onClick={() => setAddProduct(false)}
                  className="text-Gray py-2 md:py-3 lg:py-2 text-sm lg:text-md  font-medium w-[30%] bigSm:w-[20%] md:w-[14%] lg:w-[10%] rounded-md border border-GrayLight hover:cursor-pointer transition duration-200 ease-in-out mt-2 lg:mt-5 active:translate-y-1"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="bg-Red text-white py-2 md:py-3 lg:py-2 text-sm lg:text-md  font-medium w-[30%] bigSm:w-[20%] md:w-[14%] lg:w-[10%] rounded-md border border-Red hover:cursor-pointer transition duration-200 ease-in-out mt-2 lg:mt-5 active:translate-y-1"
                >
                  {!singleBlog ? "SAVE" : "UPDATE"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* All products  */}
        <div className="p-5">
          <PageChunk
            value={{
              pageName: "blogsManagement",
              pageHeading: "All Blogs",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogsManagement;
