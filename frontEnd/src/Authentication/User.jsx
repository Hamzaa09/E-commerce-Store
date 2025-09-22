import Navbar from "../Pages/Landing/Components/Navbar";
import TagLine from "../Pages/Landing/Components/TagLine";
import Footer from "../Pages/Landing/Components/Footer";
import ScrollToTopButton from "../Pages/Landing/Components/ScrollToTopButton";
import NewsLetter from "../Pages/Landing/Components/NewsLetter";
import { useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserThunk, updateUserThunk } from "../../store/users/user.thunk";
import toast from "react-hot-toast";
import BreadCrum from "../Pages/Landing/Components/BreadCrum";
import { getAllOrdersThunk } from "../../store/orders/order.thunk";

const User = () => {
  const { userProfile, screenLoading } = useSelector(
    (state) => state.userSlice
  );
  const { allOrdersData, allOrders } = useSelector((state) => state.orderSlice);
  const [updateForm, setUpdateForm] = useState(true);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm();

  useEffect(() => {
    dispatch(getAllOrdersThunk());
  }, []);

  useEffect(() => {
  }, [allOrders]);

  useEffect(() => {
    if (userProfile) {
      reset({
        userName: userProfile?.userName || "N/A",
        country: userProfile?.country || "N/A",
        email: userProfile?.email || "N/A",
        number: userProfile?.number || "N/A",
        address: userProfile?.address || "N/A",
      });
    }
  }, [userProfile, reset]);

  const onSubmit = async (data) => {
    const response = await dispatch(updateUserThunk(data));

    if (!response?.payload?.success) {
      toast.error(response?.payload?.message || "Process failed!");
      return;
    }

    setUpdateForm(() => setUpdateForm(true));
    toast.success("User Updated!");
  };

  const handleLogout = async () => {
    const response = await dispatch(logoutUserThunk());
    if (!response?.payload?.success) {
      return toast.error(response?.payload?.message || "Something went wrong");
    }

    toast.success("Logout Successfull!");
  };

  return (
    <>
      <ScrollToTopButton />
      <TagLine />
      <Navbar value="user" />

      <BreadCrum />

      {/* User  */}
      {/* heading  */}
      <div className="mainHeading flex justify-around items-center mb-10 tracking-wide px-5 mt-5 md:px-10 lg:mt-10 2xl:w-[1500px] 2xl:mx-auto">
        <div className="w-[80%] flex flex-col justify-start items-start">
          <h1 className="py-3 text-center text-2xl md:text-4xl font-bold">
            Account Details:
          </h1>
          <span className="bg-Red text-center w-[70px] bigSm:w-[150px] lg:w-[7%] h-[3px] sm:h-1"></span>
        </div>
        <div className="w-[20%] flex sm:justify-end justify-center text-4xl transition-all duration-300 ease-in-out hover:cursor-pointer">
          <div className="tooltip" data-tip="Edit Profile">
            <MdEdit
              onClick={() => setUpdateForm(!updateForm)}
              className="hover:bg-WhiteLight p-2 rounded-full"
              aria-label="edit"
            />
          </div>
        </div>
      </div>

      {/* details  */}
      <form
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-start items-start mb-10 tracking-wide px-5 mt-5 md:px-10 lg:mt-10 2xl:w-[1500px] 2xl:mx-auto "
      >
        <div
          className="w-full bg-WhiteLight px-3 md:px-5 py-3 [&>div]:justify-between [&>div]:items-start [&>div]:text-lg [&>div]:lg:text-xl [&>div>h2]:font-semibold [&>div>h2]:max-w-[50%] [&>div>p]:max-w-[50%] [&>div>p]:text-right flex flex-col gap-2 lg:gap-4"
          onClick={() => setUpdateForm(() => setUpdateForm(false))}
        >
          {/* name */}
          <div className="flex">
            <h2>Name:</h2>
            <div className="flex flex-col">
              <input
                type="text"
                {...register("userName", {
                  validate: (value) =>
                    value === "" ||
                    value.length >= 2 ||
                    "Name must be at least 2 characters",
                })}
                className="outline-0 text-right hover:cursor-text"
                id="name"
                disabled={updateForm}
              />
              <span className="text-sm md:text-base text-Red text-right">
                {errors?.userName?.message}
              </span>
            </div>
          </div>
          {/* email  */}
          <div className={`${!updateForm ? "hidden" : "flex"}`}>
            <h2>Email:</h2>
            <div className="text-end">{userProfile?.email}</div>
          </div>
          {/* country name */}
          <div className="flex">
            <h2>Country:</h2>
            <div className="flex flex-col">
              <input
                type="text"
                {...register("country", {
                  validate: (value) =>
                    value === "" ||
                    value.length >= 2 ||
                    "Invalid Country Name!",
                })}
                className="outline-0 text-right hover:cursor-text"
                id="country"
                disabled={updateForm}
              />
              <span className="text-sm md:text-base text-Red text-right">
                {errors?.country?.message}
              </span>
            </div>
          </div>
          {/* number */}
          <div className="flex">
            <h2>Contact Number:</h2>
            <div className="flex flex-col">
              <input
                type="text"
                {...register("number", {
                  validate: (value) => {
                    value === "" ||
                      /^[0-9]{11}$/.test(value) ||
                      "Number must be exactly 11 digits!";
                  },
                })}
                className="outline-0 text-right hover:cursor-text"
                disabled={updateForm}
              />
              <span className="text-sm md:text-base text-Red text-right">
                {errors?.number?.message}
              </span>
            </div>
          </div>
          {/* address  */}
          <div className="flex">
            <h2>Address:</h2>
            <div className="flex flex-col">
              <input
                type="text"
                {...register("address", {
                  validate: (value) =>
                    value === "" || value.length >= 2 || "Invalid Address!",
                })}
                className="outline-0 text-right hover:cursor-text"
                disabled={updateForm}
              />
              <span className="text-sm md:text-base text-Red text-right">
                {errors?.address?.message}
              </span>
            </div>
          </div>
        </div>

        {/* buttons  */}

        {/* cancel & save  */}
        <div
          className={`${
            updateForm ? "h-0 opacity-0" : "h-fit opacity-100"
          } w-full flex gap-2 py-2 justify-center items-center px-2 md:justify-end md:items-end`}
        >
          <button className="text-Gray py-2 lg:py-2 text-sm lg:text-md  font-medium w-[30%] bigSm:w-[20%] md:w-[14%] lg:w-[10%] rounded-md border border-GrayLight hover:cursor-pointer transition duration-200 ease-in-out mt-2 lg:mt-5 active:translate-y-1">
            CANCEL
          </button>
          <button
            onClick={() => setUpdateForm(true)}
            disabled={!isDirty}
            type="submit"
            className="bg-Red text-white py-2 lg:py-2 text-sm lg:text-md  font-medium w-[30%] bigSm:w-[20%] md:w-[14%] lg:w-[10%] rounded-md border border-Red hover:cursor-pointer transition duration-200 ease-in-out mt-2 lg:mt-5 active:translate-y-1"
          >
            {screenLoading ? (
              <div className="loading loading-spinner loading-md"></div>
            ) : (
              <span>SAVE</span>
            )}
          </button>
        </div>

        {/* Logout  */}
        <div
          className={`${
            !updateForm
              ? "h-0 opacity-0 pointer-events-none"
              : "h-fit opacity-100 pointer-events-auto"
          } w-full flex gap-2 py-2 justify-end items-center px-2 md:justify-end md:items-end`}
        >
          <button
            type="button"
            onClick={handleLogout}
            className="bg-Red text-white py-2 lg:py-2 text-sm lg:text-md  font-medium w-[30%] bigSm:w-[20%] md:w-[14%] lg:w-[10%] rounded-md border border-Red hover:cursor-pointer transition duration-200 ease-in-out mt-2 lg:mt-5 active:translate-y-1"
          >
            {screenLoading ? (
              <div className="loading loading-spinner loading-md"></div>
            ) : (
              <span className="md:text-base">Logout</span>
            )}
          </button>
        </div>
      </form>

      {/* Orders  */}
      {/* heading  */}
      <div className="mainHeading flex flex-col justify-start items-start mb-10 tracking-wide px-5 mt-5 md:px-10 lg:mt-10 2xl:w-[1500px] 2xl:mx-auto">
        <h1 className="py-3 text-center text-2xl md:text-4xl font-bold">
          Orders Placed:
        </h1>
        <span className="bg-Red text-center w-[100px] bigSm:w-[150px] lg:w-[7%] h-[3px] sm:h-1"></span>
      </div>

      {/* heading 2 */}
      <div className="mainHeading px-5 md:px-10 2xl:w-[1500px] 2xl:mx-auto flex justify-between items-start tracking-wide sm:text-lg">
        <p>PRODUCT</p>
        <p>AMOUNT</p>
      </div>

      {/* products div  */}
      <div className="px-5 mt-5 md:px-10 2xl:w-[1500px] 2xl:mx-auto w-full flex gap-x-3 flex-col">
        {allOrders?.map((product, index) => (
          <div
            key={index}
            className={`item flex w-full items-stretch h-fit flex-row gap-1 justify-between md:border-1 border-transparent border-t-GrayLight py-3 lg:py-4`}
          >
            {/* images  */}
            <div
              className={`relative group flex justify-center items-center h-full lg:h-40 transition-all duration-300 ease-in-out w-[30%] md:w-[20%] lg:w-[15%]`}
            >
              {/* Normal Image */}
              <img
                src={product.productImages[1]}
                className="w-full h-full object-cover transition-opacity duration-500 ease-in-out"
                alt="product"
              />
            </div>

            {/* content  */}
            <div
              className={`flex flex-col gap-3 md:flex-row justify-between items-start md:items-center w-[50%] flex-1 mx-3`}
            >
              {/* text  */}
              <div className="flex flex-col justify-start items-start w-full md:w-[60%] lg:justify-between">
                <p className="text-center font-medium text-Gray text-sm sm:text-base mt-1 ">
                  {product.productName}
                </p>
                <h4
                  className={`text-start font-medium tracking-wide text-md sm:text-lg w-full`}
                >
                  {product.productName}
                </h4>

                <div className="flex justify-center items-center gap-2 text-sm sm:text-base mt-1">
                  <p className="text-center text-Gray font-bold tracking-wide">
                    $
                    {product.productDiscount
                      ? (
                          Number(product.productPrice) -
                          (Number(product.productPrice) *
                            product.productDiscount) /
                            100
                        ).toFixed(2)
                      : product.productPrice.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* status */}
              <div className="flex flex-col bigSm:flex-row w-full md:flex-col gap-2 items-start md:items-start lg:justify-start mt-3 md:w-[40%] text-lg justify-between md:justify-center">
                <div className="flex gap-2">
                  <h2 className="underline">Status:</h2>
                  <strong>{allOrdersData[index].status || "Nill"}</strong>
                </div>

                <div className="flex gap-2">
                  <h2 className="underline">Quan:</h2>
                  <strong>{allOrdersData[index].quantity || "Nill"}</strong>
                </div>
              </div>
            </div>

            {/* TOTAL */}
            <div className="w-[20%] md:w-[10%] flex justify-end items-start">
              <p className="text-center text-Red font-bold tracking-wide text-lg">
                $
                {product.productDiscount
                  ? (
                      (Number(product.productPrice) -
                        (Number(product.productPrice) *
                          product.productDiscount) /
                          100) *
                      allOrdersData[index].quantity
                    ).toFixed(2)
                  : product.productPrice.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <NewsLetter />
      <Footer />
    </>
  );
};

export default User;
