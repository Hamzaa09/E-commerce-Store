import React from "react";

const PromoBanner = () => {
  const promo_2 = [
    {
      src: "promo-1.jpg",
      p: "SPECIAL EDITION",
      h1: "Big Fox Men Light Sneaker",
    },
    {
      src: "promo-2.jpg",
      p: "BEST QUALITY",
      h1: "Red Tape Athleisure Shoes",
    },
  ];

  return (
    <div className="p-5 md:p-10 lg:px-20 w-full tracking-wider h-[60vh] md:h-[45vh] lg:h-[45vh] xl:h-[60vh] flex flex-col md:flex-row justify-around items-center gap-3 md:gap-[1%]">
      {promo_2.map((promo, index) => (
        <div key={index} className={`relative w-full md:w-[49.5%] h-[50%] md:h-[80%] flex justify-between pl-[46%] sm:pl-[45%] md:pl-[25%] lg:pl-[25%]`}>

          <img src={`/promotionTwo/${promo.src}`} alt="Promotions" className="absolute h-full w-full left-0 object-cover"/>

          {/* content  */}
          <div className="content my-auto w-[70vw] md:w-[50vw] z-20 flex gap-1 lg:gap-3 flex-col justify-between md:px-2">
            <p className="text-sm lg:text-md tracking-widest font-semibold">{promo.p}</p>
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold">{promo.h1}</h1>

            <button className="bg-[#c5172e] text-white py-2 md:py-3 md:px-6 mt-2 xl:mt-4 text-sm lg:text-md font-medium w-[60%] md:w-[90%] lg:w-[70%] hover:bg-white hover:text-black hover:cursor-pointer transition duration-200 ease-in-out">
              SHOP NOW
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PromoBanner;
