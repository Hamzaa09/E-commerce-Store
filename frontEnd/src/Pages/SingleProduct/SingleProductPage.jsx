import Navbar from "../Landing/Components/Navbar";
import TagLine from "../Landing/Components/TagLine";
import Footer from "../Landing/Components/Footer";
import ScrollToTopButton from "../Landing/Components/ScrollToTopButton";
import NewsLetter from "../Landing/Components/NewsLetter";
import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaAngleLeft, FaAngleRight, FaStar } from "react-icons/fa";
import BreadCrum from "../Landing/Components/BreadCrum";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartProductsThunk,
  getSingleProductThunk,
  updateReviewThunk,
} from "../../../store/products/product.thunk";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { TbFileDescription } from "react-icons/tb";
import { FiTruck } from "react-icons/fi";
import { addToCartThunk, getCartThunk } from "../../../store/users/user.thunk";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { getPaymentThunk } from "../../../store/payment/payment.thunk";
import ProductsSection from "../Landing/Components/ProductsSection";

const SingleProductPage = () => {
  const { id } = useParams();
  const [value, setValue] = useState(1);
  const [f1, setF1] = useState(false);
  const [f2, setF2] = useState(false);
  const dispatch = useDispatch();
  const { singleProd } = useSelector((state) => state.productSlice);
  const [image, setImage] = useState();
  const [val, setVal] = useState();
  const [hover, setHover] = useState(null);
  const { cart, userProfile } = useSelector((state) => state.userSlice);

  useEffect(() => {
    dispatch(getCartThunk());
  }, [dispatch]);

  useEffect(() => {
    if (cart) {
      dispatch(getCartProductsThunk(cart));
    }
  }, [cart, dispatch]);

  useEffect(() => {
    window.scrollTo({ top: true, behavior: "smooth" });
    if (id) dispatch(getSingleProductThunk({ id }));
  }, [id, dispatch]);

  useEffect(() => {
    if (val) {
      dispatch(updateReviewThunk({ value: val, id }));
      dispatch(getSingleProductThunk({ id }));
    }
  }, [val]);

  useEffect(() => {
    if (singleProd) {
      setImage(singleProd?.productImages?.[0]);
      $(".singleProduct-section").owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        dots: false,
        responsive: {
          0: {
            items: 1,
          },
          300: {
            items: 2,
          },
          600: {
            items: 3,
          },
          1000: {
            items: 4,
          },
        },
      });
    }
  }, [singleProd]);

  const handleClick = async (pid) => {
    if (!userProfile) return toast.error("Login Required!");

    const response = await dispatch(addToCartThunk({ productId: pid }));

    if (response?.payload?.success) {
      dispatch(getCartThunk());
      return toast.success("Added to Cart!");
    }

    toast.error("Reponse Error!");
  };

  const handleBuy = async () => {
    if (!userProfile) return toast.error("Login Required!");
    const stripe = await loadStripe(
      import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
    );
    const response = await dispatch(
      getPaymentThunk({ orders: [singleProd], quantity: [value] })
    );

    const result = stripe.redirectToCheckout({
      sessionId: response.payload.id,
    });
  };
  return (
    <>
      <ScrollToTopButton />
      <TagLine />
      <Navbar value="" />

      {singleProd && <BreadCrum value={singleProd?.productName} />}

      {/* main div  */}
      <div className="mb-20 w-full h-full flex flex-col md:flex-row md:justify-around lg:gap-4 px-5 mt-5 md:px-10 lg:mt-10 2xl:w-[1500px] 2xl:mx-auto">
        {singleProd ? (
          <>
            {/* images  */}
            <div className="md:sticky md:self-start md:top-0 md:w-1/2 flex flex-col justify-center items-center">
              <div className="w-[60%] md:w-full">
                <img
                  src={image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-[80%] h-fit md:w-full relative mb-3">
                <div className="owl-carousel singleProduct-section owl-theme flex justify-around hover:cursor-pointer px-5 relative">
                  {singleProd?.productImages?.map((img, index) => (
                    <div
                      key={index}
                      className="item h-fit w-fit md:w-full flex flex-col gap-1 justify-around"
                    >
                      <div
                        onClick={(e) => {
                          setImage(img);
                        }}
                        className={`${
                          img === image ? "border border-Gray" : ""
                        }`}
                      >
                        {/* Normal Image */}
                        <img
                          src={img}
                          className="w-full h-[8em] md:h-full object-cover transition-opacity duration-500 ease-in-out"
                          alt="product"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                {/* buttons */}
                <button
                  onClick={() =>
                    $(".singleProduct-section").trigger("prev.owl.carousel")
                  }
                  className={`absolute h-full top-0 left-0 z-10 text-black text-xl cursor-pointer`}
                >
                  <FaAngleLeft />
                </button>

                <button
                  onClick={() =>
                    $(".singleProduct-section").trigger("next.owl.carousel")
                  }
                  className={`absolute h-full top-0 right-0 z-10 text-black text-xl hover:cursor-pointer`}
                >
                  <FaAngleRight />
                </button>
              </div>
            </div>

            {/* text  */}
            <div className="md:w-1/2 mt-10 flex flex-col gap-4 w-full ml-5">
              {/* div 1 */}
              <div className="flex flex-col gap-3 border border-transparent border-b-GrayLight pb-5">
                <h1 className="text-start font-bold tracking-wide text-2xl md:text-3xl">
                  {singleProd?.productName}
                </h1>

                <div className="flex gap-3 justify-start items-center">
                  {singleProd?.productDiscount && (
                    <h6 className="text-left font-normal tracking-wide text-lg text-Gray line-through ">
                      ${singleProd?.productPrice.toFixed(2)}
                    </h6>
                  )}
                  <h6 className="text-left text-Red font-bold tracking-wide text-2xl">
                    $
                    {singleProd?.productDiscount
                      ? (
                          Number(singleProd?.productPrice) -
                          (Number(singleProd?.productPrice) *
                            singleProd?.productDiscount) /
                            100
                        ).toFixed(2)
                      : singleProd?.productPrice.toFixed(2)}
                  </h6>

                  {singleProd?.productDiscount && (
                    <span className="p-1 px-3 w-fit h-fit bg-[#c5172e] text-white flex justify-center items-center text-sm font-medium">
                      -{singleProd?.productDiscount}%
                    </span>
                  )}
                </div>

                <p className="text-Gray font-medium line-clamp-3">
                  {singleProd?.productDescription}
                </p>

                <div className="flex gap-2 text-2xl">
                  {[...Array(5)].map((_, i) => {
                    const starValue = i + 1;
                    const id = singleProd?._id;
                    return (
                      <FaStar
                        key={i}
                        onMouseEnter={() => setHover(starValue)}
                        onMouseLeave={() => null}
                        onClick={() => {
                          setVal(starValue);
                        }}
                        className={`cursor-pointer ${
                          starValue <= (hover || singleProd?.productRating)
                            ? "text-yellow-500"
                            : "text-GrayLight"
                        }`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* div 2 */}
              <div className="flex flex-col gap-3 tracking-wide">
                <div className="flex gap-2">
                  <p className="flex items-center text-lg font-semibold">
                    Availability:
                  </p>
                  <div className="flex items-center text-lg font-medium text-black">
                    <div
                      className={`${
                        singleProd.productStock
                          ? "border-green-500"
                          : "border-red-500"
                      } p-[2px] rounded-full border-1  flex justify-center items-center mr-1`}
                    >
                      <div
                        className={` ${
                          singleProd?.productStock
                            ? "bg-green-500"
                            : "bg-red-500"
                        } h-2 w-2 rounded-full`}
                      />
                    </div>
                    {`${singleProd?.productStock} in Stock`}
                  </div>
                </div>

                <div>
                  <p className="flex items-center text-lg tracking-wide font-semibold">
                    {`Quantity (${value} selected)`}
                  </p>

                  <div className="flex gap-2 items-center justify-around mt-3 w-fit">
                    <div className="py-2 w-[8rem] border-1 border-GrayLight hover:cursor-point flex justify-around items-center text-xl text-Gray [&>button]:hover:cursor-pointer">
                      <button onClick={() => setValue(Math.max(1, value - 1))}>
                        -
                      </button>
                      <p className="text-lg">{value}</p>
                      <button onClick={() => setValue(value + 1)}>+</button>
                    </div>

                    <button
                      onClick={() => handleClick({ id: singleProd._id })}
                      className={`p-2 w-full h-full ${
                        singleProd.productStock > 0
                          ? "bg-[#c5172e] text-white hover:cursor-pointer opacity-100"
                          : "bg-[#c5172e] text-white hover:cursor-not-allowed opacity-50"
                      } transition duration-200 ease-in-out active:translate-y-1 flex justify-around items-center text-xl font-medium`}
                      disabled={singleProd.productStock > 0 ? false : true}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleBuy}
                  className={`p-2 w-[80%] sm:w-[60%] h-full bg-white border border-Gray text-Gray ${
                    singleProd.productStock > 0
                      ? "hover:cursor-pointer hover:bg-black hover:border-black hover:text-white opacity-100"
                      : "hover:cursor-not-allowed opacity-50"
                  } transition duration-200 ease-in-out active:translate-y-1 flex justify-around items-center text-lg font-medium`}
                  disabled={singleProd.productStock > 0 ? false : true}
                >
                  BUY NOW
                </button>
              </div>

              {/* div 3  */}
              <div className="flex flex-col gap-1 tracking-wide">
                <div className="flex gap-2">
                  <p className="flex items-center text-lg font-semibold">{`Brand:`}</p>
                  <p className="flex items-center text-lg">
                    {" "}
                    {singleProd?.productBrand}
                  </p>
                </div>
                <div className="flex gap-2">
                  <p className="flex items-center text-lg font-semibold">
                    Category:
                  </p>
                  <p className="flex items-center text-lg">
                    {singleProd?.productCategory}
                  </p>
                </div>
              </div>

              {/* div 4 */}
              <div className="flex flex-col gap-1">
                {/* description  */}
                <div className="flex flex-col gap-3 tracking-wide">
                  <div
                    onClick={() => setF1(!f1)}
                    className="flex justify-between items-center w-[100%] hover:cursor-pointer bg-WhiteLight p-2"
                  >
                    <h4 className="md:py-3 py-1 text-lg font-medium flex gap-2 items-center">
                      <TbFileDescription className="text-xl" />
                      Details
                    </h4>
                    {!f1 && (
                      <IoIosArrowDown className="mt-1 text-shadow-lg tracking-wider" />
                    )}
                    {f1 && (
                      <IoIosArrowUp className="mt-1 text-shadow-lg tracking-wider" />
                    )}
                  </div>

                  {f1 && (
                    <p className="text-Gray font-medium px-3">
                      {singleProd?.productDescription}
                    </p>
                  )}
                </div>

                {/* shipping and return  */}
                <div className="flex flex-col gap-3 tracking-wide">
                  <div
                    onClick={() => setF2(!f2)}
                    className="flex justify-between items-center w-[100%] hover:cursor-pointer bg-WhiteLight p-2"
                  >
                    <h4 className="md:py-3 py-1 text-lg font-medium flex gap-2 items-center">
                      <FiTruck className="text-xl" />
                      Shipping & Returns
                    </h4>
                    {!f2 && (
                      <IoIosArrowDown className="mt-1 text-shadow-lg tracking-wider" />
                    )}
                    {f2 && (
                      <IoIosArrowUp className="mt-1 text-shadow-lg tracking-wider" />
                    )}
                  </div>

                  {f2 && (
                    <p className="text-Gray font-medium px-3">
                      Free shipping and returns available on all orders! We ship
                      all US domestic orders within 5-10 business days
                    </p>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <ClipLoader />
        )}
      </div>

      {/* Description heading  */}
      {/* <div className="mainHeading flex flex-col justify-center items-center mb-5 tracking-wide px-5 mt-5 md:px-10 lg:mt-10 2xl:w-[1500px] 2xl:mx-auto border border-transparent border-b-GrayLight">
        <h1 className="py-3 text-center text-2xl font-bold">Description:</h1>
        <span className="bg-Red text-center w-[100px] lg:w-[7%] h-1"></span>
      </div> */}

      {/* Description  */}
      {/* <div className="mainHeading flex flex-col justify-start items-start tracking-wide mb-10 px-5 md:px-10 2xl:w-[1500px] 2xl:mx-auto [&>p]:text-Gray [&>p]:font-medium [&>p]:mb-3 [&>h3]:py-3 [&>h3]:text-start [&>h3]:text-lg [&>h3]:font-bold">
        <h1 className="py-3 text-start text-3xl font-bold">About This Item</h1>
        <p className="pb-5">
          Asian Shoes for regular comfort. The body of shoes is designed with
          colorful soft material describing to improve the overall look of the
          shoes. The upper material keeps air circulation while moderated ankles
          takes full care of your feet when you go out for running. Perfect to
          rev up your sporty spirit, this trendy pair of Sports shoes from the
          house of Power Provides excellent durability and ensures sturdy grip.
          Designed to keep feet relaxed with a soft and comfortable fit, this
          stylish yet functional pair ensures flexibility and freedom of
          movement with responsive cushioning and enhanced lightweight feel.
        </p>

        <h3 className="">Lightweight & Breathable :</h3>
        <p className="">
          Exclusive design and durable materials every step feels light and
          breezy. Breathable, free-moving fabrics which adjust according to your
          foot and creates an astoundingly easy-going experience.
        </p>

        <h3 className="">Non Slip & Shockproof :</h3>
        <p className="">
          Great engineering strikes a balance in style, made in the potent
          design and latest fashion trends. Made for long-term wear, with extra
          emphasis on providing cushion to the feet, removing heel strain.
        </p>

        <h3 className="">Comfort Sole & Flexible Walk :</h3>
        <p className="">
          The outsoles are made by an air cushion, doubling the effect of shock
          absorption. Besides, these shoes perform excellent in durability and
          are also slip resistant. It provides push cushioning comfort for foot
          pain relief and helps relieve pressure while conforming to your every
          step.
        </p>
        <p className="">
          Shoes brings to you this pair of running shoes which look attractive
          and stylish. They have been designed for women who need a pair of
          comfortable footwear for their day trips. The shoes are made from Mesh
          as upper material and EVA & TPR as sole material and is available in
          different shades.
        </p>
      </div> */}

      <ProductsSection />

      <NewsLetter />
      <Footer />
    </>
  );
};

export default SingleProductPage;
