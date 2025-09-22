import React, { useState } from "react";
import Navbar from "../Landing/Components/Navbar";
import TagLine from "../Landing/Components/TagLine";
import Footer from "../Landing/Components/Footer";
import ScrollToTopButton from "../Landing/Components/ScrollToTopButton";
import NewsLetter from "../Landing/Components/NewsLetter";
import { MdHome, MdInfo, MdMail, MdPhone } from "react-icons/md";
import BreadCrum from "../Landing/Components/BreadCrum";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { sendInquiryThunk } from "../../../store/inquiry/inquiry.thunk";
import toast from "react-hot-toast";

const ContactPage = () => {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async ({ inqEmail, inqNumber, inqText }) => {
    const response = await dispatch(
      sendInquiryThunk({ inqEmail, inqNumber, inqText })
    );

    if (!response?.payload?.success) {
      toast.error("Error while Submitting!");
    }
    toast.success("Sent Successfully!");

    reset();
  };

  return (
    <>
      <ScrollToTopButton />
      <TagLine />
      <Navbar value="contact" />

      <BreadCrum />

      {/* blocks  */}
      <div className="px-5 mt-5 md:mt-10 md:px-10 lg:mt-15 2xl:w-[1500px] 2xl:mx-auto w-full flex flex-col gap-2 lg:gap-4 md:flex-row">
        {/* form  */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="md:w-[60%] flex flex-col border border-GrayLight mt-5 lg:mt-8 xl:mt-10 gap-4 md:gap-3 justify-center items-center relative py-5"
        >
          <div className="w-[90%] border border-white ">
            <h1 className="py-3 text-left text-3xl md:text-4xl font-bold">
              Do You Have Any Question?
            </h1>
          </div>

          <div className="flex flex-col w-[90%] md:flex-row lg:flex-col gap-4">
            {/* name  */}
            <div className="relative w-full">
              <div className="border border-GrayLight">
                <input
                  type="text"
                  {...register("userName", {
                    minLength: {
                      value: 2,
                      message: "Invalid Name!",
                    },
                  })}
                  id="name"
                  className="peer border-0 border-GrayLight outline-0 px-5 sm:px-5 pt-3 pb-2 sm:pt-4 sm:pb-3 text-md w-full"
                  placeholder=" "
                />
                <label
                  htmlFor="name"
                  className={`absolute left-0 py-2 sm:py-3 translate-y-[-35%] scale-[0.7] px-3 peer-placeholder-shown:px-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-0 text-Gray text-md sm:text-lg transition-all duration-150 peer-focus:translate-y-[-35%] peer-focus:scale-[0.7] peer-focus:px-3 hover:cursor-text select-none`}
                >
                  Name
                </label>
              </div>
              <span className="text-Red px-1 text-sm">
                {errors.userName?.message}
              </span>
            </div>

            {/* email  */}
            <div className="relative w-full">
              <div className="border border-GrayLight">
                <input
                  type="inqEmail"
                  {...register("inqEmail", {
                    required: "Email is required!",
                    pattern: {
                      value: /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,}$/,
                      message: "Invalid Email",
                    },
                  })}
                  id="inqEmail"
                  className="peer border-0 border-GrayLight outline-0 px-5 sm:px-5 pt-3 pb-2 sm:pt-4 sm:pb-3 text-md w-full"
                  placeholder=" "
                />
                <label
                  htmlFor="inqEmail"
                  className={`absolute left-0 py-2 sm:py-3 translate-y-[-35%] scale-[0.7] px-3 peer-placeholder-shown:px-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-0 text-Gray text-md sm:text-lg transition-all duration-150 peer-focus:translate-y-[-35%] peer-focus:scale-[0.7] peer-focus:px-3 hover:cursor-text select-none`}
                >
                  E-mail <span className="text-Red"> *</span>
                </label>
              </div>
              <span className="text-Red text-sm p-1">
                {errors.inqEmail?.message}
              </span>
            </div>
          </div>

          {/* number  */}
          <div className="relative w-[90%]">
            <div className="border border-GrayLight">
              <input
                type="inqNumber"
                {...register("inqNumber", {
                  required: "Number is required!",
                  pattern: {
                    value: /^[0-9]{2,}$/,
                    message: "Invalid Number",
                  },
                })}
                id="inqNumber"
                className="peer border-0 border-GrayLight outline-0 px-5 sm:px-5 pt-3 pb-2 sm:pt-4 sm:pb-3 text-md w-full"
                placeholder=" "
              />
              <label
                htmlFor="inqNumber"
                className={`absolute left-0 py-2 sm:py-3 translate-y-[-35%] scale-[0.7] px-3 peer-placeholder-shown:px-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-0 text-Gray text-md sm:text-lg transition-all duration-150 peer-focus:translate-y-[-35%] peer-focus:scale-[0.7] peer-focus:px-3 hover:cursor-text select-none`}
              >
                Number <span className="text-Red"> *</span>
              </label>
            </div>
            <span className="text-Red text-sm p-1">
              {errors.inqNumber?.message}
            </span>
          </div>

          {/* description  */}
          <div className="relative w-[90%]">
            <div className="w-full border border-GrayLight">
              <textarea
                {...register("inqText", {
                  required: "Required!",
                  minLength: {
                    value: 10,
                    message: "Atleast 10 characters required!",
                  },
                })}
                id="inqText"
                rows={5}
                cols={10}
                className="peer border-0 border-GrayLight outline-0 px-5 sm:px-5 pt-3 pb-2 sm:pt-4 sm:pb-3 text-md  w-full"
                placeholder=" "
              />
              <label
                htmlFor="inqText"
                className={`absolute left-0 py-2 sm:py-3 translate-y-[-35%] scale-[0.7] px-2 peer-placeholder-shown:px-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-0 text-Gray text-md sm:text-lg transition-all duration-150 peer-focus:translate-y-[-35%] peer-focus:scale-[0.7] peer-focus:px-1 hover:cursor-text select-none`}
              >
                Description<span className="text-Red"> *</span>
              </label>
            </div>
            {errors?.inqText?.message && (
              <span className="text-sm text-Red px-2">
                {errors?.inqText?.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="bg-Red text-white py-3 text-sm lg:text-lg font-medium w-[50%] border hover:bg-white hover:text-black hover:border-GrayLight  hover:cursor-pointer transition duration-200 ease-in-out mt-2 lg:mt-5"
          >
            SEND
          </button>
        </form>

        {/* Get in touch  */}
        <div className="md:w-[40%] flex flex-col border border-GrayLight mt-5 lg:mt-8 xl:mt-10 gap-4 md:gap-3 justify-start items-center relative py-5">
          <div className="w-[90%] border border-white ">
            <h1 className="py-3 text-left text-3xl md:text-4xl font-bold">
              Get In Touch With Us!
            </h1>
          </div>

          <div className=" w-[90%] flex flex-col justify-center h-full">
            <div className="lg:w-[60%] border border-white flex gap-3">
              <div className="text-3xl pt-2 ">
                <MdHome />
              </div>
              <div className="">
                <p className="text-lg font-semibold">Address:</p>
                <p className="py-2 text-lg text-Gray font-medium">
                  33 New Montgomery St. Ste 750 San Francisco, CA, USA 94105
                </p>
              </div>
            </div>

            <div className="lg:w-[60%] border border-white flex gap-3">
              <div className="text-3xl pt-2">
                <MdPhone />
              </div>
              <div>
                <p className="text-lg font-semibold">Contact No.:</p>
                <p className="py-2 text-lg text-Gray font-medium">
                  03485379552
                </p>
              </div>
            </div>

            <div className="lg:w-[60%] border border-white flex gap-3">
              <div className="text-3xl pt-2">
                <MdMail />
              </div>
              <div>
                <p className="text-lg font-semibold">Email:</p>
                <p className="py-2 text-lg text-Gray font-medium">
                  hamza-dev@gmail.com
                </p>
              </div>
            </div>

            <div className="lg:w-[60%] border border-white flex gap-3">
              <div className="text-3xl pt-2">
                <MdInfo />
              </div>
              <div>
                <p className="text-lg font-semibold">Store Info:</p>
                <p className="py-2 text-lg text-Gray font-medium">
                  Monday - Friday, 9AM to 5PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map  */}
      <div className="px-5 mt-5 md:mt-10 md:px-10 lg:mt-15 2xl:w-[1500px] 2xl:mx-auto w-full flex flex-col gap-2 lg:gap-4 md:flex-row">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3043.1359536599457!2d67.16593745511078!3d24.900746861708267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb339c72ec76665%3A0xec5d1d821453c988!2sJinnah%20International%20Airport!5e0!3m2!1sen!2s!4v1734760777911!5m2!1sen!2s"
          className="w-full"
          height={450}
        ></iframe>
      </div>

      <NewsLetter />
      <Footer />
    </>
  );
};

export default ContactPage;
