import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { subscribeNewsletter } from "../../../../store/newsletter/newsletter.thunk";

const NewsLetter = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      reset();
      const response = await dispatch(
        subscribeNewsletter(data.newsletterEmail)
      ).unwrap();
      toast.success(response?.message || "Subscribed successfully!");
    } catch (err) {
      reset();
      toast.error(err || "Something went wrong");
    }
  };
  return (
    <div className="relative w-full h-[35vh] sm:h-[22vh] lg:h-[25vh] 2xl:h-[40vh] mt-20 px-20 flex justify-center tracking-wider">
      <img
        src="/newsLetter/img1.jpg"
        className="absolute w-full h-full z-[-1] object-cover object-bottom opacity-85"
        alt=""
      />

      <div className="my-auto text-center">
        <h1 className="text-3xl xl:text-[5vh] w-[90vw] sm:w-full text-white font-bold">
          JOIN OUR NEWSLETTER
        </h1>
        <p className="text-sm sm:text-md lg:text-lg text-white font-[400] my-1 w-[90vw] sm:w-full">
          Subscribe to our latest newsletter to get news about special
          discounts.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex mt-5 lg:mt-8 xl:mt-10 gap-1 md:gap-3 justify-between relative"
        >
          {/* Input */}
          <input
            type="email"
            id="newsletterEmail"
            placeholder=" "
            className="peer outline-0 bg-white px-5 sm:px-5 pt-3 pb-2 sm:pt-4 sm:pb-3 text-md w-[73%] sm:w-[70%]"
            {...register("newsletterEmail", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
          />

          {/* Floating label */}
          <label
            htmlFor="newsletterEmail"
            className={`absolute py-2 sm:py-3 ${
              errors.newsletterEmail ? "text-red-500" : "text-Gray"
            } text-base md:text-lg transition-all duration-150 peer-placeholder-shown:px-5 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:translate-y-[-35%] peer-focus:scale-[0.7] peer-focus:px-3 hover:cursor-text select-none`}
          >
            Email
          </label>

          {/* Button */}
          <button
            type="submit"
            className="bg-Red text-white text-sm md:text-base w-[30%] sm:w-[25%] font-[500] hover:cursor-pointer hover:bg-transparent border-transparent border-2 hover:border-white hover:underline transition-all duration-150 active:translate-y-1 lg:active:translate-y-0"
          >
            SUBSCRIBE
          </button>

          {/* Messages */}
          {errors.newsletterEmail && (
            <p className="absolute -bottom-6 left-0 text-sm text-red-600">
              {errors.newsletterEmail.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default NewsLetter;
