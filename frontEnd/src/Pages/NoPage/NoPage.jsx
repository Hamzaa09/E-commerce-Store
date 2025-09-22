import Navbar from "../Landing/Components/Navbar";
import TagLine from "../Landing/Components/TagLine";
import Footer from "../Landing/Components/Footer";
import ScrollToTopButton from "../Landing/Components/ScrollToTopButton";
import NewsLetter from "../Landing/Components/NewsLetter";
import { Link } from "react-router-dom";
import BreadCrum from "../Landing/Components/BreadCrum";

const NoPage = () => {
  return (
    <>
      <ScrollToTopButton />
      <TagLine />
      <Navbar value="" />

      <BreadCrum/>

      {/* heading  */}
      <div className="mainHeading flex flex-col justify-start items-start md:justify-center md:items-center mb-15 tracking-wide px-5 mt-5 md:px-10 lg:mt-10 2xl:w-[1500px] 2xl:mx-auto">
        <h1 className="py-3 text-center text-2xl md:text-4xl font-bold">
          404: No Page Found
        </h1>
        <span className="bg-Red w-[100px] lg:w-[10%] h-1"></span>
      </div>

      <div className="mainHeading flex justify-center items-center mb-15 tracking-wide px-5 mt-5 md:px-10 lg:mt-10 2xl:w-[1500px] 2xl:mx-auto">
        <button className="w-[80%] md:w-[50%] lg:w-[20%] py-3 md:py-4 bg-Red text-white text-lg font-[500] hover:cursor-pointer hover:underline transition-all duration-150 active:translate-y-1">
          <Link to="/shop">Back To Shopping</Link>
        </button>
      </div>

      <NewsLetter />
      <Footer />
    </>
  );
};

export default NoPage;
