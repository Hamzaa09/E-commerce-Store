const BlogSkeleton = () => {
  return (
    <div className="deal-section h-85 w-full flex justify-around gap-4">
      <div className="item w-full h-full flex flex-col gap-2 animate-pulse">
        {/* Image Skeleton */}
        <div className="relative w-full h-[40%] lg:h-[75%] mb-2 bg-gray-200 rounded-md"></div>

        {/* Product Name */}
        <div className="h-6 w-80 bg-gray-200 rounded"></div>

        {/* Rating */}
        <div className="flex flex-col justify-start gap-2 my-3">
          <div className="h-5 w-70 bg-gray-200 rounded"></div>
        </div>

        {/* Brand */}
        <div className="h-6 w-24 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default BlogSkeleton;
