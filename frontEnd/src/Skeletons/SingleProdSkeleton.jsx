const SingleProductSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row w-full gap-6 animate-pulse">
      {/* LEFT – Images */}
      <div className="md:sticky md:top-0 md:w-1/2 flex flex-col items-center mt-10 ml-5">
        {/* Main Image */}
        <div className="w-[80%] h-[10rem] md:h-[26rem] bg-gray-200 rounded-md"></div>

        {/* Thumbnails */}
        <div className="w-[90%] md:w-full mt-4 px-5 flex gap-3 justify-center">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-[3em] md:h-[6em] w-[10em] md:w-[8em] bg-gray-200 rounded-md"
            ></div>
          ))}
        </div>
      </div>

      {/* RIGHT – Text / Info */}
      <div className="md:w-1/2 mt-10 ml-5 flex flex-col gap-6 w-full">
        {/* Title & Price */}
        <div className="flex flex-col gap-4 border-b border-GrayLight pb-6">
          <div className="h-8 w-3/4 bg-gray-200 rounded"></div>

          <div className="flex gap-3 items-center">
            <div className="h-5 w-20 bg-gray-200 rounded"></div>
            <div className="h-6 w-24 bg-gray-200 rounded"></div>
            <div className="h-5 w-14 bg-gray-200 rounded"></div>
          </div>

          {/* Description */}
          <div className="hidden md:visible space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
          </div>

          {/* Rating */}
          <div className="hidden md:flex gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-6 w-6 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>

        {/* Availability & Quantity */}
        <div className="hidden md:flex flex-col gap-5">
          <div className="h-5 w-48 bg-gray-200 rounded"></div>

          <div className="flex gap-3 items-center">
            <div className="h-10 w-[8rem] bg-gray-200 rounded"></div>
            <div className="h-10 w-full bg-gray-200 rounded"></div>
          </div>

          <div className="h-10 w-[60%] bg-gray-200 rounded"></div>
        </div>

        {/* Meta Info */}
        <div className="hidden md:flex flex-col gap-2">
          <div className="h-4 w-40 bg-gray-200 rounded"></div>
          <div className="h-4 w-48 bg-gray-200 rounded"></div>
        </div>

        {/* Accordions */}
        <div className="flex flex-col gap-4 mr-5 md:mr-0">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="h-10 w-full bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleProductSkeleton;
