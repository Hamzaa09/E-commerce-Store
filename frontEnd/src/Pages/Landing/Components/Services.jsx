import { CiDeliveryTruck, CiDollar, CiDiscount1 } from "react-icons/ci";
import { PiHeadsetLight } from "react-icons/pi";

const Services = () => {
  return (
    <div className="parent relative w-[900px] lg:w-full py-10 lg:px-10 md:py-15 lg:py-20 lg:border-1 border-transparent border-b-[#69696945] ">
      {/* cards  */}
      <div className="cards w-full flex gap-3 justify-between items-center">
        {/* card  */}
        <div className="card group w-[24%] h-fit flex flex-col hover:cursor-pointer">
          <div className="relative h-fit flex flex-col justify-center items-center mb-1 md:mb-2 lg:mb-4 overflow-hidden">
            <CiDeliveryTruck className="translate-y-[0%] group-hover:translate-y-[-100%] h-fit text-5xl lg:text-6xl transition-all duration-500 ease-in-out" />
            <CiDeliveryTruck className="absolute top-[100%] text-Red translate-y-[0%] group-hover:translate-y-[-100%] h-full text-5xl lg:text-6xl transition-all duration-500 ease-in-out" />
          </div>

          <h4 className="text-center text-black font-medium text-md lg:text-lg">
            World Wide Shipping
          </h4>
          <p className="text-center text-Gray text-sm lg:text-lg">
            Free Shipping To Make Your Shopping Experience Seamless
          </p>
        </div>

        <div className="card group w-[24%] h-fit  flex flex-col hover:cursor-pointer">
          <div className="relative h-fit flex flex-col justify-center items-center mb-1 md:mb-2 lg:mb-4 overflow-hidden">
            <CiDollar className="translate-y-[0%] group-hover:translate-y-[-100%] h-full text-5xl lg:text-6xl transition-all duration-500 ease-in-out" />
            <CiDollar className="absolute top-[100%] text-Red translate-y-[0%] group-hover:translate-y-[-100%] h-full text-5xl lg:text-6xl transition-all duration-500 ease-in-out" />
          </div>

          <h4 className="text-center text-black font-medium text-md lg:text-lg">
            Guaranteed Return
          </h4>
          <p className="text-center text-Gray text-sm lg:text-lg">
            Free Shipping To Make Your Shopping Experience Seamless
          </p>
        </div>

        <div className="card group w-[24%] h-fit  flex flex-col hover:cursor-pointer">
          <div className="relative h-fit flex flex-col justify-center items-center mb-1 md:mb-2 lg:mb-4 overflow-hidden">
            <CiDiscount1 className="translate-y-[0%] group-hover:translate-y-[-100%] h-full text-5xl lg:text-6xl transition-all duration-500 ease-in-out" />
            <CiDiscount1 className="absolute top-[100%] text-Red translate-y-[0%] group-hover:translate-y-[-100%] h-full text-5xl lg:text-6xl transition-all duration-500 ease-in-out" />
          </div>

          <h4 className="text-center text-black font-medium text-md lg:text-lg">
            Offers And Discounts
          </h4>
          <p className="text-center text-Gray text-sm lg:text-lg">
            Free Shipping To Make Your Shopping Experience Seamless
          </p>
        </div>

        <div className="card group w-[24%] h-fit  flex flex-col hover:cursor-pointer">
          <div className="relative h-fit flex flex-col justify-center items-center mb-1 md:mb-2 lg:mb-4 overflow-hidden">
            <PiHeadsetLight className="translate-y-[0%] group-hover:translate-y-[-100%] h-full text-5xl lg:text-6xl transition-all duration-500 ease-in-out" />
            <PiHeadsetLight className="absolute top-[100%] text-Red translate-y-[0%] group-hover:translate-y-[-100%] h-full text-5xl lg:text-6xl transition-all duration-500 ease-in-out" />
          </div>

          <h4 className="text-center text-black font-medium text-md lg:text-lg">
            24/7 Customer Support
          </h4>
          <p className="text-center text-Gray text-sm lg:text-lg">
            Free Shipping To Make Your Shopping Experience Seamless
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;
