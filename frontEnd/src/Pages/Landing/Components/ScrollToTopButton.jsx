import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

const ScrollToTopButton = () => {
  const [buttonAnim, setButtonAnim] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setButtonAnim(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      removeEventListener("scroll", handleScroll);
    };
  }, []);

  const onScrollTop = () => {
    window.scrollTo({top: 0, behavior: "smooth"})
  }

  return (
    <div 
    onClick={onScrollTop}
    className={`fixed bottom-5 right-3 sm:bottom-8 sm:right-8 lg:bottom-20 lg:right-14 z-100 p-4 border-2 border-white rounded-full bg-[#c5172e] text-white hover:cursor-pointer text-lg ${buttonAnim ? "opacity-100" : "opacity-0 pointer-events-none"} transition-all duration-300 ease-in-out`}>
      <FaArrowUp />
    </div>
  );
};

export default ScrollToTopButton;
