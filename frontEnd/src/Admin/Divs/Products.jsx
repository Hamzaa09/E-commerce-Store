import { useEffect } from "react";
import { FaStar } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../../../backEnd/controllers/product.controller";
import {
  deleteProductThunk,
  getProductForUpdateThunk,
} from "../../../store/products/product.thunk";
import toast from "react-hot-toast";

const Products = (props) => {
  const { completeProducts } = useSelector((state) => state.productSlice);
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    const response = await dispatch(deleteProductThunk(id));

    if (response?.meta?.requestStatus === "fulfilled") {
      return toast.success("Deletion Successfull!");
    }

    return toast.error("Deletion Error!");
  };

  const handleUpdate = async (id) => {
    const response = await dispatch(getProductForUpdateThunk(id));
  };

  return (
    <>
      {/* table */}
      <div className="w-full overflow-auto">
        <div
          className={`bg-white min-w-[800px] h-[81vh] md:w-full border border-GrayLight rounded-lg  overflow-y-scroll transition-all duration-1000 ease-in-out`}
        >
          <table className="h-fit w-full group">
            <thead>
              <tr
                className={`w-full sticky top-0 z-10 bg-white group-hover:shadow-sm [&>th]:text-start [&>th]:pl-5 [&>th]:py-4 [&>th]:text-xl [&>th]:font-semibold mb-5`}
              >
                <th className="w-[10%] sm:w-fit">S no.</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Stock</th>
                <th>Reviews</th>
                <th>Options</th>
              </tr>
            </thead>

            <tbody>
              {completeProducts?.map((product, index) => (
                <tr
                  key={index}
                  className="[&>td]:text-start [&>td]:text-base [&>td]:px-4 [&>td]:py-2 border border-transparent border-b-GrayLight border-t-GrayLight last:border-b-transparent hover:bg-WhiteLight hover:cursor-pointer"
                >
                  <td>{index + 1}</td>
                  <td className="flex justify-start items-center gap-3">
                    <img
                      className="w-12 h-12 rounded-full"
                      src="/products/p1.jpg"
                      alt="Rounded avatar"
                    />
                    <p>{product.productName}</p>
                  </td>
                  <td>{product.productCategory}</td>
                  <td>${product.productPrice.toFixed(2)}</td>
                  <td>
                    {product.productDiscount ? product.productDiscount : 0}%
                  </td>
                  <td>{product.productStock}</td>
                  <td className="flex justify-start my-3 text-Gray gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`${
                          i <=
                          product.productRating.reduce(
                            (avg, item) => parseInt((item += avg / 5)),
                            0
                          )
                            ? "text-yellow-500"
                            : "text-GrayLight"
                        }`}
                      />
                    ))}
                  </td>
                  <td>
                    <div className="flex w-full">
                      <button
                        onClick={() => handleUpdate(product._id)}
                        className="text-white bg-blue-500 px-2 py-1 font-medium active:translate-y-1 hover:cursor-pointer opacity-90 hover:opacity-100 hover:shadow-md/10 rounded-2xl transition duration-300 ease-in-out"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="text-white bg-Red px-2 py-1 font-medium active:translate-y-1 hover:cursor-pointer opacity-90 hover:opacity-100 hover:shadow-md/10 rounded-2xl transition duration-300 ease-in-out ml-2"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Products;
