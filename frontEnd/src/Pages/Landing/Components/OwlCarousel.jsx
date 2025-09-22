import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "jquery";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "owl.carousel";

const OwlCarousel = () => {
  const imagesArray = [
    "Logo-1.png",
    "Logo-2.png",
    "Logo-3.png",
    "Logo-4.png",
    "Logo-5.png",
    "Logo-6.png",
  ];

  const promoArray = [
    { src: "promo-1.png", h2: "Casual Leather Sneaker", p: "SHOP NOW" },
    { src: "promo-2.png", h2: "Blue Running Shoes", p: "SHOP NOW" },
    { src: "promo-3.png", h2: "Sprinter 2 Alt Sneakers", p: "SHOP NOW" },
  ];

  useEffect(() => {
    $(".brand-names").owlCarousel({
      loop: true,
      margin: 0,
      nav: false,
      dots: false,
      autoplay: true,
      autoplayHoverPause: true,
      autoplaySpeed: 200,
      responsive: {
        0: {
          items: 1,
        },
        400: {
          items: 2,
        },
        600: {
          items: 3,
        },
        1000: {
          items: 4,
        },
        1400: {
          items: 5,
        },
      },
    });
  }, []);
   
  return (
    <>
      {/* carousel */}
      <div className="owl-carousel brand-names owl-theme flex justify-center items-center mt-10 md:mt-15 px-5 md:px-10 xl:mt-20 xl:px-20">
        {imagesArray.map((image, index) => (
          <div key={index} className="item flex justify-center items-center">
            <img
              className="object-contain max-h-[7vh] md:max-h-[9vh] lg:max-h-[10vh]"
              src={`/logos/${image}`}
              alt=""
            />
          </div>
        ))}
      </div>

      {/* posters */}
      <div className="mx-5 mt-10 md:mt-15 md:mx-10 lg:mt-20 lg:mx-20 tracking-wide overflow-x-scroll lg:overflow-hidden">
        <div className="flex justify-between gap-3 md:gap-5 w-180 md:w-250 lg:w-full">
          {promoArray.map((promo, index) => (
            <div
              key={index}
              className="relative h-[40vh] lg:h-full w-[33%] overflow-hidden"
            >
              <img
                src={`/promotionOne/${promo.src}`}
                className="w-full h-full object-cover hover:scale-107 hover:cursor-pointer transition duration-1000 ease-in-out"
                alt=""
              />
              <div className="absolute bottom-3 lg:bottom-7 w-full text-white px-1">
                <h2 className="text-center font-bold text-lg md:text-2xl mb-1">
                  {promo.h2}
                </h2>
                <p className="font-semibold underline cursor-pointer text-center hover:no-underline ">
                  {promo.p}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OwlCarousel;
