import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const MainSlider = () => {
  const imgArr = [
    {
      src: "/mainSlider/imageOne.png",
      h1: "Vans Comfortable Joggers",
      p: "2025 Limited Edition",
      text_color: "white",
    },
    {
      src: "/mainSlider/imageTwo.png",
      h1: "Gucci Premium Sneakers For Men",
      p: "2025 Limited Edition",
      text_color: "black",
    },
  ];
  const [counter, setCounter] = useState(0);
  const [transition, setTransition] = useState(false);
  const [buttondisplay, setButtondisplay] = useState(false);
  const imgRef = useRef([]);
  const autoplayRef = useRef();

  useEffect(() => {
    imgRef.current.forEach((img, index) => {
      img.style.left = `${index * 100}%`;
    });

    setTimeout(() => {
      setTransition(true);
    }, 50);
  }, []);

  useEffect(() => {
    imgRef.current.forEach((img) => {
      img.style.transform = `translateX(-${counter * 100}%)`;
    });
  }, [counter]);

  const slideRight = () => {
    counter === 0
      ? setCounter(imgRef.current.length - 1)
      : setCounter(() => counter - 1);
  };

  const slideLeft = () => {
    counter === imgRef.current.length - 1
      ? setCounter(0)
      : setCounter(() => counter + 1);
  };

  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      setCounter((prev) => (prev === imgArr.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(autoplayRef.current);
  }, [imgArr.length]);

  const pauseAutoplay = () => clearInterval(autoplayRef.current);
  const resumeAutoplay = () => {
    autoplayRef.current = setInterval(() => {
      setCounter((prev) => (prev === imgArr.length - 1 ? 0 : prev + 1));
    }, 5000);
  };

  return (
    <div
      onMouseEnter={() => {
        setButtondisplay(true);
        pauseAutoplay();
      }}
      onMouseLeave={() => {
        setButtondisplay(false);
        resumeAutoplay();
      }}
      className="main-slider relative flex justify-center items-center h-[70vh]"
    >
      {/* images  */}
      {imgArr.map((obj, index) => (
        <div
          key={index}
          ref={(el) => (imgRef.current[index] = el)}
          className={`absolute top-0 left-0 w-full h-full tracking-wide flex justify-center items-center ${
            transition ? "transition-all duration-700 ease-in-out" : ""
          }`}
        >
          <img src={obj.src} alt="" className="w-full h-full object-cover object-left" />

          {/* content  */}
          <div
            className={`content text-${obj.text_color} absolute w-[35%] h-fit right-[7%] z-20 flex flex-col justify-between`}
          >
            <p className="text-2xl mb-7 font-semibold tracking-widest">
              {obj.p}
            </p>
            <h1 className="text-7xl font-bold">{obj.h1}</h1>

            <button className="text-sm mt-12 text-black bg-white py-3 font-medium w-[30%] hover:bg-[#c5172e] hover:text-white hover:cursor-pointer transition duration-200 ease-in-out">
              SHOP NOW
            </button>
          </div>
        </div>
      ))}

      {/* slider Buttons  */}
      <button
        onClick={slideLeft}
        className={`${
          buttondisplay ? "visible" : "hidden"
        } absolute top-[46%] left-10 z-10 p-5 rounded-full bg-white text-black hover:cursor-pointer hover:bg-[#c5172e] hover:text-white text-lg transition duration-250 ease-in-out`}
      >
        <FaArrowLeft />
      </button>
      <button
        onClick={slideRight}
        className={`${
          buttondisplay ? "visible" : "hidden"
        } absolute top-[46%] right-10 z-10 p-5 rounded-full bg-white text-black hover:cursor-pointer hover:bg-[#c5172e] hover:text-white text-lg  transition duration-250 ease-in-out`}
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default MainSlider;
