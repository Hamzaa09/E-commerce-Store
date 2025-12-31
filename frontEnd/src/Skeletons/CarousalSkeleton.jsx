import DealsSkeleton from "./DealsSkeleton";

const CarousalSkeleton = () => {
  return (
    <div className="parent relative w-full flex gap-5">
      <div className="bigSm:w-1/2 lg:w-1/3 w-full block">
        <DealsSkeleton />
      </div>

      <div className="bigSm:w-1/2 lg:w-1/3 block">
        <DealsSkeleton />
      </div>

      <div className="hidden bigSm:w-1/2 lg:w-1/3 md:block">
        <DealsSkeleton />
      </div>

      <div className="hidden bigSm:w-1/2 lg:w-1/3 lg:block">
        <DealsSkeleton />
      </div>
    </div>
  );
};

export default CarousalSkeleton;
