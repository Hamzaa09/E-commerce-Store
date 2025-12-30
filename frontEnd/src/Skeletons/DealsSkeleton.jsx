const DealsSkeleton = () => {
  return (
    <div className="item h-80 w-full flex justify-around gap-4">
      <div className="item w-full h-full flex flex-col gap-2 animate-pulse">
        {/* Image Skeleton */}
        <div className="relative w-full h-[40%] lg:h-[75%] mb-2 bg-gray-200 rounded-md"></div>

        {/* Brand */}
        <div className="mx-auto h-4 w-24 bg-gray-200 rounded"></div>

        {/* Product Name */}
        <div className="mx-auto h-5 w-40 bg-gray-200 rounded"></div>

        {/* Rating */}
        <div className="flex justify-center gap-1 my-3">
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
        </div>

        {/* Price */}
        <div className="flex justify-center gap-2">
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default DealsSkeleton;
