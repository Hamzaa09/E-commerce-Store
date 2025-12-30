import DealsSkeleton from "./DealsSkeleton";

const ShopPageSkeleton = ({ list = false, items = 8 }) => {
  return (
    <>
      {[...Array(items)].map((_, index) => (
        <div
          key={index}
          className={`item flex animate-pulse w-[calc(50%-0.375rem)] sm:w-[calc(33%-0.375rem)] md:w-[calc(24%-0.375rem)] h-60 flex-col gap-2`}
        >
          <DealsSkeleton />
        </div>
      ))}
    </>
  );
};

export default ShopPageSkeleton;
