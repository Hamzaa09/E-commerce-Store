import React, { useState } from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { IoCallOutline } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";

const Footer = () => {
  const [f1, setF1] = useState(false);
  const [f2, setF2] = useState(false);
  const [f3, setF3] = useState(false);

  return (
    <>
      <footer className="lg:hidden">
        <div className="flex flex-col py-5 px-5 md:px-10 text-lg pt-20 sticky bottom-0">
          <div className="footer-div1 w-full">
            <div className="flex justify-center items-center h-[8vh] max-w-[35vw] sm:w-[25vw] mb-1 md:mb-3">
              <img src="/Logo.jpg" alt="" />
            </div>
            <p className="pr-10 text-[#696969]">
              We take pride in offering shoes that blend performance with
              personality, ensuring every step you take feels just right.
              Whether you're hitting the track or strolling the streets, JogKar
              is here to keep you moving in style - with trusted service,
              nationwide delivery, and a passion for quality that speaks for
              itself. We accept:
            </p>
            <div
              className="credit-cards mt-5 text-center width-full flex gap-5"
            >
              <img
                height="3 We accept: 0"
                src="https://shoplineimg.com/assets/footer/card_visa.png"
              />
              <img
                height="3 We accept: 0"
                src="https://shoplineimg.com/assets/footer/card_master.png"
              />
              <img
                height="30"
                src="https://shoplineimg.com/assets/footer/card_paypal.png"
              />
            </div>
          </div>

          <div className="footer-div2 w-full mt-5">
            <div
              onClick={() => setF1(!f1)}
              className="flex justify-between items-center w-[100%] mb-2 hover:cursor-pointer"
            >
              <h4 className="md:py-3 py-1 text-xl font-medium">Quick Links</h4>
              {!f1 && (
                <IoIosArrowDown className="mt-1 text-xl tracking-wider" />
              )}
              {f1 && <IoIosArrowUp className="mt-1 text-xl tracking-wider" />}
            </div>

            {f1 && (
              <ul className="flex flex-col gap-2 [&>a]:text-[#696969] [&>a]:hover:text-[#c5172e] [&>a]:transition [&>a]:duration-100 [&>a]:ease-in-out">
                <Link to={"/"}>Home</Link>
                <Link to={"/shop"}>Shop</Link>
                <Link to={"/collections"}>Collections </Link>
                <Link to={"/sneakers"}>Sneakers</Link>
                <Link to={"/blogs"}>Blogs</Link>
                <Link to={"/contact"}>Contact</Link>
              </ul>
            )}
          </div>

          <div className="footer-div3 w-full">
            <div
              onClick={() => setF2(!f2)}
              className="flex justify-between items-center w-[100%] mb-2 hover:cursor-pointer"
            >
              <h4 className="md:py-3 py-1 text-xl font-medium">
                Customer Support
              </h4>
              {!f2 && (
                <IoIosArrowDown className="mt-1 text-xl tracking-wider" />
              )}
              {f2 && <IoIosArrowUp className="mt-1 text-xl tracking-wider" />}
            </div>

            {f2 && (
              <ul className="flex flex-col gap-2 [&>a]:text-[#696969] [&>a]:hover:text-[#c5172e] [&>a]:transition [&>a]:duration-100 [&>a]:ease-in-out">
                <Link to={`/footer/${"privacy-policy"}`}>Privacy Policy</Link>
                <Link to={`/footer/${"refund-policy"}`}>Refund Policy</Link>
                <Link to={`/footer/${"shopping-policy"}`}>Shipping Policy</Link>
                <Link to={`/footer/${"terms-of-services"}`}>
                  Terms of Service
                </Link>
                <Link to={`/footer/${"policy-for-buyers"}`}>
                  Policy for Buyers
                </Link>
                <Link to={`/footer/${"policy-for-sellers"}`}>
                  Policy for Sellers
                </Link>
              </ul>
            )}
          </div>

          <div className="footer-div4 w-full">
            <div
              onClick={() => setF3(!f3)}
              className="flex justify-between items-center w-[100%] mb-2 hover:cursor-pointer"
            >
              <h4 className="md:py-3 py-1 text-xl font-medium">
                About Information
              </h4>
              {!f3 && (
                <IoIosArrowDown className="mt-1 text-xl tracking-wider" />
              )}
              {f3 && <IoIosArrowUp className="mt-1 text-xl tracking-wider" />}
            </div>

            {f3 && (
              <ul className="flex flex-col gap-2 [&>a]:text-[#696969] [&>a]:hover:text-[#c5172e] [&>a]:transition [&>a]:duration-100 [&>a]:ease-in-out">
                <p className="text-[#696969] flex items-center gap-2">
                  <IoLocationOutline className="text-[#c5172e] text-2xl" />
                  House-001/23, Sector ABC, Karachi.
                </p>
                <Link to={"/"} className="flex items-center gap-2">
                  <IoMailOutline className="text-[#c5172e] text-2xl" />
                  hamza-dev@gmail.com
                </Link>
                <Link to={"/"} className="flex items-center gap-2">
                  <IoCallOutline className="text-[#c5172e] text-2xl" />
                  03485379552
                </Link>
              </ul>
            )}
          </div>

          <div className="flex items-center justify-center gap-3 mt-5 mb-3 [&>a]:bg-[#eeeeee] [&>a]:p-3 [&>a]:rounded-full [&>a]:hover:bg-[#c5172e] [&>a]:hover:text-white [&>a]:transition [&>a]:duration-300 [&>a]:ease-in-out">
            <Link to={"/"}>
              <FaFacebookF />
            </Link>
            <Link to={"/"}>
              <FaInstagram />
            </Link>
            <Link to={"/"}>
              <FaWhatsapp />
            </Link>
            <Link to={"/"}>
              <BsTwitterX />
            </Link>
          </div>
        </div>

        <div className="copyright border-t-1 border-t-[#69696945] py-3 mt-4">
          <p className="text-center text-sm text-[#696969]">
            © 2025 JogKar. All rights reserved.
          </p>
        </div>
      </footer>

      <footer className="hidden lg:block">
        <div className="flex justify-between py-5 px-20 text-lg pt-20 sticky bottom-0">
          <div className="footer-div1 w-[35%]">
            <div className="flex justify-center items-center h-[8vh] w-[10vw] mb-3">
              <img src="/Logo.jpg" alt="" />
            </div>
            <p className="pr-10 text-[#696969]">
              We take pride in offering shoes that blend performance with
              personality, ensuring every step you take feels just right.
              Whether you're hitting the track or strolling the streets, JogKar
              is here to keep you moving in style - with trusted service,
              nationwide delivery, and a passion for quality that speaks for
              itself.
            </p>
            <div
              className="credit-cards mt-5 text-center width-full flex gap-5"
            >
              <img
                height="3 We accept: 0"
                src="https://shoplineimg.com/assets/footer/card_visa.png"
              />
              <img
                height="3 We accept: 0"
                src="https://shoplineimg.com/assets/footer/card_master.png"
              />
              <img
                height="30"
                src="https://shoplineimg.com/assets/footer/card_paypal.png"
              />
            </div>
          </div>

          <div className="footer-div2 w-max flex flex-col gap-3 px-2 xl:px-4 [&>a]:text-[#696969] [&>a]:hover:text-[#c5172e] [&>a]:transition [&>a]:duration-100 [&>a]:ease-in-out">
            <div className="flex flex-col w-[100%] mb-2">
              <h4 className="py-3 text-xl font-medium">Quick Links</h4>
              <span className="bg-[#c5172e] w-[45%] h-0.5"></span>
            </div>
            <Link to={"/"}>Home</Link>
            <Link to={"/shop"}>Shop</Link>
            <Link to={"/collections"}>Collections </Link>
            <Link to={"/sneakers"}>Sneakers</Link>
            <Link to={"/blogs"}>Blogs</Link>
            <Link to={"/contact"}>Contact</Link>
          </div>

          <div className="footer-div3 w-max flex flex-col gap-3 px-2 xl:px-4 [&>a]:text-[#696969] [&>a]:hover:text-[#c5172e] [&>a]:transition [&>a]:duration-100 [&>a]:ease-in-out">
            <div className="flex flex-col w-[100%] mb-2">
              <h4 className="py-3 text-xl font-medium">Customer Support</h4>
              <span className="bg-[#c5172e] w-[45%] h-0.5"></span>
            </div>
            <Link to={`/footer/${"privacy-policy"}`}>Privacy Policy</Link>
            <Link to={`/footer/${"refund-policy"}`}>Refund Policy</Link>
            <Link to={`/footer/${"shopping-policy"}`}>Shipping Policy</Link>
            <Link to={`/footer/${"terms-of-services"}`}>Terms of Service</Link>
            <Link to={`/footer/${"policy-for-buyers"}`}>Policy for Buyers</Link>
            <Link to={`/footer/${"policy-for-sellers"}`}>
              Policy for Sellers
            </Link>
          </div>

          <div className="footer-div4 w-max flex flex-col gap-4 pl-4 [&>a]:text-[#696969] [&>a]:hover:text-[#c5172e]">
            <div className="flex flex-col w-[100%] mb-2">
              <h4 className="py-3 text-xl font-medium">About Information</h4>
              <span className="bg-[#c5172e] w-[25%] h-0.5"></span>
            </div>
            <p className="text-[#696969] flex items-center gap-2">
              <IoLocationOutline className="text-[#c5172e] text-2xl" />
              House-001/23, Sector ABC, Karachi.
            </p>
            <Link to={"/"} className="flex items-center gap-2">
              <IoMailOutline className="text-[#c5172e] text-2xl" />
              hamza-dev@gmail.com
            </Link>
            <Link to={"/"} className="flex items-center gap-2">
              <IoCallOutline className="text-[#c5172e] text-2xl" />
              03485379552
            </Link>
            <div className="flex gap-3 mt-5 [&>a]:bg-[#eeeeee] [&>a]:p-3 [&>a]:rounded-full [&>a]:hover:bg-[#c5172e] [&>a]:hover:text-white [&>a]:transition [&>a]:duration-300 [&>a]:ease-in-out">
              <Link to={"/"}>
                <FaFacebookF />
              </Link>
              <Link to={"/"}>
                <FaInstagram />
              </Link>
              <Link to={"/"}>
                <FaWhatsapp />
              </Link>
              <Link to={"/"}>
                <BsTwitterX />
              </Link>
            </div>
          </div>
        </div>

        <div className="copyright border-t-1 border-t-[#69696945] py-3 mt-4">
          <p className="text-center text-sm text-[#696969]">
            © 2025 JogKar | All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
