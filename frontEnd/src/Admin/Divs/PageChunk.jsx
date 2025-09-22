import UserDiv from "./UserDiv";
import { CiSearch } from "react-icons/ci";
import OrdersDiv from "./OrdersDiv";
import Products from "./Products";
import Inquirydiv from "./InquiryDiv";
import BlogsDiv from "./BlogsDiv";
import { useState } from "react";

const PageChunk = (props) => {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <>
      {/* Product Page  */}
      <div className="w-full">
        <div className="w-full h-fit bg-white border border-GrayLight rounded-lg">
          {/* text & Search */}
          <div className="flex justify-between items-center border border-transparent border-b-GrayLight py-3 px-5">
            <h2 className="p-2 font-semibold text-2xl text-black">
              {props.value.pageHeading}
            </h2>
            <div
              className={`border ${
                props.value.pageHeading === "Recent Orders" ? "hidden" : "flex"
              } border-GrayLight rounded-sm hover:cursor-pointer hover:bg-WhiteLight items-center px-2`}
            >
              <CiSearch className="text-2xl" />
              <input
                type="text"
                className="outline-none p-2 text-base w-[15vw]"
                placeholder="Search..."
                name="search"
                value={search}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="p-5">
            {props.value.pageHeading === "All Users" && (
              <UserDiv value={search} />
            )}
            {props.value.pageHeading === "All Orders" && (
              <OrdersDiv value={search} />
            )}
            {props.value.pageHeading === "Recent Orders" && (
              <OrdersDiv value={search} />
            )}
            {props.value.pageHeading === "All Products" && (
              <Products value={search} />
            )}
            {props.value.pageHeading === "All Inquiries" && (
              <Inquirydiv value={search} />
            )}
            {props.value.pageHeading === "All Blogs" && (
              <BlogsDiv value={search} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PageChunk;
