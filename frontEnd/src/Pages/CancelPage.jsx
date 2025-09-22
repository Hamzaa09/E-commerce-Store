import React from "react";
import { Link } from "react-router-dom";

const CancelPage = () => {
  return (
    <div class="bg-gray-100 h-screen">
      <div class="bg-white p-6  md:mx-auto">
        <svg viewBox="0 0 24 24" class="text-red-600 w-16 h-16 mx-auto my-6">
          <path
            fill="currentColor"
            d="M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0zm5.3 15.3a1 1 0 0 1-1.4 1.4L12 13.4l-3.9 3.9a1 1 0 0 1-1.4-1.4L10.6 12 6.7 8.1a1 1 0 0 1 1.4-1.4L12 10.6l3.9-3.9a1 1 0 0 1 1.4 1.4L13.4 12z"
          ></path>
        </svg>

        <div class="text-center">
          <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Payment Error!
          </h3>
          <p>Something went wrong!</p>
          <div class="py-10 text-center">
            <Link
              to={"/"}
              class="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
            >
              GO BACK
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelPage;
