import React from "react";

const Filters = () => {
  return (
    <>
      {/* Filters  */}
      <div className="flex flex-col items-start gap-4 text-lg tracking-wide font-medium px-5 py-5">
        <div className="flex flex-col justify-between w-full border-1 border-transparent border-b-GrayLight py-2">
          <div
            onClick={() => setAvailability(!Availability)}
            className="flex justify-between w-full h-fit hover:cursor-pointer hover:text-[#c5172e] transition-all duration-100 ease-in-out"
          >
            Availability
            {Availability ? (
              <RiArrowDropUpLine className="mt-1 text-2xl" />
            ) : (
              <RiArrowDropDownLine className="mt-1 text-2xl" />
            )}
          </div>

          <div
            className={`${
              Availability
                ? "opacity-100 h-fit pointer-events-auto mt-3"
                : "opacity-0 h-0 pointer-events-none"
            } flex flex-col gap-3 text-lg z-100 pl-3 [&>*]:font-normal [&>*]:hover:cursor-pointer [&>*]:hover:text-[#c5172e] [&>*]:transition-all [&>*]:duration-100 [&>*]:ease-in-out mr-5`}
          >
            {/* boxes  */}
            <div className="hover:cursor-pointer">
              <input
                type="checkbox"
                id="stock"
                className="hover:cursor-pointer"
              />
              <label
                htmlFor="stock"
                className="px-2 text-md hover:cursor-pointer"
              >
                In Stock
              </label>
            </div>

            <div className="hover:cursor-pointer">
              <input
                type="checkbox"
                id="outstock"
                className="hover:cursor-pointer"
              />
              <label
                htmlFor="outstock"
                className="px-2 text-md hover:cursor-pointer"
              >
                Out of Stock
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between w-full border-1 border-transparent border-b-GrayLight py-2">
          <div
            onClick={() => setBrand(!brand)}
            className="flex justify-between w-full h-fit hover:cursor-pointer hover:text-[#c5172e] transition-all duration-100 ease-in-out"
          >
            Brand
            {brand ? (
              <RiArrowDropUpLine className="mt-1 text-2xl" />
            ) : (
              <RiArrowDropDownLine className="mt-1 text-2xl" />
            )}
          </div>

          {/* boxes */}
          <div
            className={`${
              brand
                ? "opacity-100 h-fit pointer-events-auto mt-3"
                : "opacity-0 h-0 pointer-events-none"
            } flex flex-col gap-3 text-lg z-100 pl-3 [&>*]:font-normal [&>*]:hover:cursor-pointer [&>*]:hover:text-[#c5172e] [&>*]:transition-all [&>*]:duration-100 [&>*]:ease-in-out mr-5`}
          >
            <div className="hover:cursor-pointer">
              <input
                type="checkbox"
                id="stock"
                className="hover:cursor-pointer"
              />
              <label
                htmlFor="stock"
                className="px-2 text-md hover:cursor-pointer"
              >
                In Stock
              </label>
            </div>

            <div className="hover:cursor-pointer">
              <input
                type="checkbox"
                id="stock"
                className="hover:cursor-pointer"
              />
              <label
                htmlFor="stock"
                className="px-2 text-md hover:cursor-pointer"
              >
                In Stock
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between w-full border-1 border-transparent border-b-GrayLight py-2">
          <div
            onClick={() => setType(!type)}
            className="flex justify-between w-full h-fit hover:cursor-pointer hover:text-[#c5172e] transition-all duration-100 ease-in-out"
          >
            Type
            {type ? (
              <RiArrowDropUpLine className="mt-1 text-2xl" />
            ) : (
              <RiArrowDropDownLine className="mt-1 text-2xl" />
            )}
          </div>

          {/* boxes  */}
          <div
            className={`${
              type
                ? "opacity-100 h-fit pointer-events-auto mt-3"
                : "opacity-0 h-0 pointer-events-none"
            } flex flex-col gap-3 text-lg z-100 pl-3 [&>*]:font-normal [&>*]:hover:cursor-pointer [&>*]:hover:text-[#c5172e] [&>*]:transition-all [&>*]:duration-100 [&>*]:ease-in-out mr-5`}
          >
            <div className="hover:cursor-pointer">
              <input
                type="checkbox"
                id="stock"
                className="hover:cursor-pointer"
              />
              <label
                htmlFor="stock"
                className="px-2 text-md hover:cursor-pointer"
              >
                In Stock
              </label>
            </div>

            <div className="hover:cursor-pointer">
              <input
                type="checkbox"
                id="stock"
                className="hover:cursor-pointer"
              />
              <label
                htmlFor="stock"
                className="px-2 text-md hover:cursor-pointer"
              >
                In Stock
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between w-full mt-4">
          <div className="flex justify-between w-full h-fit hover:cursor-pointer hover:text-[#c5172e] transition-all duration-100 ease-in-out">
            Price
          </div>

          <div
            className={`opacity-100 h-fit mt-3 flex flex-col gap-3 text-lg z-100 pl-3 mr-5`}
          >
            <div className="flex gap-2 justify-between">
              <span className="w-[50%] flex items-center">
                $
                <input
                  type="number"
                  className="w-full outline outline-GrayLight mx-2 p-2 font-normal"
                  placeholder="From"
                />
              </span>

              <span className="w-[50%] flex items-center">
                $
                <input
                  type="number"
                  className="w-full outline outline-GrayLight mx-2 p-2 font-normal"
                  placeholder="To"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters;
