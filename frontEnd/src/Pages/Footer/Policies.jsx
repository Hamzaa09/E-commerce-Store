import React, { useEffect } from "react";
import Navbar from "../Landing/Components/Navbar";
import TagLine from "../Landing/Components/TagLine";
import Footer from "../Landing/Components/Footer";
import ScrollToTopButton from "../Landing/Components/ScrollToTopButton";
import NewsLetter from "../Landing/Components/NewsLetter";
import BreadCrum from "../Landing/Components/BreadCrum";
import { useParams } from "react-router-dom";

const Policies = () => {
  const { policies } = useParams();

  useEffect(() => {
    window.scrollTo({ top, behavior: "smooth" });
  }, [policies]);
  return (
    <>
      <ScrollToTopButton />
      <TagLine />
      <Navbar value="favorite" />

      <BreadCrum />

      <div className="mainHeading flex flex-col justify-start items-start md:justify-center md:items-center mb-15 tracking-wide px-5 mt-5 md:px-10 lg:mt-10 2xl:w-[1500px] 2xl:mx-auto">
        <h1 className="py-3 text-center text-2xl md:text-4xl font-bold">
          {policies.replaceAll("-", " ").toUpperCase()}
        </h1>
        <span className="bg-Red w-[100px] lg:w-[10%] h-1"></span>
      </div>
      <div className="flex flex-col gap-10 mx-5 mt-5 md:mt-15">
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-4xl">
            The standard Lorem Ipsum passage
          </h3>

          <p className="text-Gray text-lg font-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            accumsan turpis posuere cursus ultricies. Ut nunc justo, faucibus
            eget elit quis, vehicula rhoncus nulla. Phasellus convallis sem nec
            facilisis commodo. Fusce ut molestie turpis. Suspendisse aliquet sed
            massa in vulputate. Quisque gravida suscipit tincidunt.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-4xl">
            The standard Lorem Ipsum passage
          </h3>

          <p className="text-Gray text-lg font-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            accumsan turpis posuere cursus ultricies. Ut nunc justo, faucibus
            eget elit quis, vehicula rhoncus nulla. Phasellus convallis sem nec
            facilisis commodo. Fusce ut molestie turpis. Suspendisse aliquet sed
            massa in vulputate. Quisque gravida suscipit tincidunt.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-4xl">
            The standard Lorem Ipsum passage
          </h3>

          <p className="text-Gray text-lg font-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            accumsan turpis posuere cursus ultricies. Ut nunc justo, faucibus
            eget elit quis, vehicula rhoncus nulla. Phasellus convallis sem nec
            facilisis commodo. Fusce ut molestie turpis. Suspendisse aliquet sed
            massa in vulputate. Quisque gravida suscipit tincidunt.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-4xl">
            The standard Lorem Ipsum passage
          </h3>

          <p className="text-Gray text-lg font-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            accumsan turpis posuere cursus ultricies. Ut nunc justo, faucibus
            eget elit quis, vehicula rhoncus nulla. Phasellus convallis sem nec
            facilisis commodo. Fusce ut molestie turpis. Suspendisse aliquet sed
            massa in vulputate. Quisque gravida suscipit tincidunt.
          </p>
        </div>
      </div>

      <NewsLetter />
      <Footer />
    </>
  );
};

export default Policies;
