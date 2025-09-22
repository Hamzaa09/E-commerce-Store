import React, { useEffect } from "react";
import MainSlider from "./Components/MainSlider";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import OwlCarousel from "./Components/OwlCarousel";
import ProductsSection from "./Components/ProductsSection";
import Banner from "./Components/Banner";
import Services from "./Components/Services";
import PromoBanner from "./Components/PromoBanner";
import LatestBlogs from "./Components/LatestBlogs";
import NewsLetter from "./Components/NewsLetter";
import ScrollToTopButton from "./Components/ScrollToTopButton";
import PopularProducts from "./Components/PopularProduts";
import DealSection from "./Components/DealSection";
import TagLine from "./Components/TagLine";
import { useDispatch } from "react-redux";
import { getPopularProductsThunk } from "../../../store/products/product.thunk";

const Home = () => {
 
  return (
    <div className="relative">
      <ScrollToTopButton />

      {/* HEADER  */}
      <TagLine />
      <Navbar value="home" />

      {/* MAIN BODY  */}
      <main className="overflow-x-clip">
        <section>
          <MainSlider />
        </section>

        <section className="2xl:w-[1500px] mx-auto">
          <OwlCarousel />
        </section>

        <section className="mx-5 mt-10 md:mt-15 md:mx-10 lg:mt-20 lg:mx-0 2xl:w-[1500px] 2xl:mx-auto">
          <ProductsSection />
        </section>

        <section className="mx-5 mt-10 md:mt-15 md:mx-10 lg:mt-20 lg:mx-0 2xl:w-[1500px] 2xl:mx-auto">
          <PopularProducts />
        </section>

        <section>
          <Banner />
        </section>

        <section className="overflow-x-scroll lg:overflow-hidden 2xl:w-[1500px] mx-5 md:mx-10 2xl:mx-auto 2xl:px-10">
          <Services />
        </section>

        <section className="mx-5 mt-10 md:mt-15 md:mx-10 lg:mt-20 lg:mx-0 2xl:w-[1500px] 2xl:mx-auto">
          <DealSection />
        </section>

        <section className="2xl:w-[1500px] mx-auto">
          <PromoBanner />
        </section>

        <section className="mx-5  md:mx-10  lg:mx-0 2xl:w-[1500px] 2xl:mx-auto">
          <LatestBlogs />
        </section>

        <section>
          <NewsLetter />
        </section>
      </main>

      {/* FOOTER  */}
      <footer className="2xl:w-[1500px] mx-auto">
        <Footer className="flex flex-col gap-4" />
      </footer>
    </div>
  );
};

export default Home;
