import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersAdminThunk } from "../../../store/orders/order.thunk";
import { Select, MenuItem } from "@mui/material";

const OrdersDiv = ({ value }) => {
  const dispatch = useDispatch();
  const { allOrdersDataAdmin, allOrdersAdmin } = useSelector(
    (state) => state.orderSlice
  );
  const [Order, setOrder] = useState([]);

  useEffect(() => {
    dispatch(getAllOrdersAdminThunk());
  }, [dispatch]);

  //extera
  useEffect(() => {
    // console.log(allOrdersAdmin);
  }, [value, allOrdersAdmin, allOrdersDataAdmin]);

  useEffect(() => {
    if (value) {
      setOrder(
        allOrdersAdmin.map((products) =>
          products.filter(
            (product) =>
              product.productName
                ?.toLowerCase()
                .includes(value.toLowerCase()) ||
              String(product.productStock)
                ?.toLowerCase()
                .includes(value.toLowerCase()) ||
              product.productCategory
                ?.toLowerCase()
                .includes(value.toLowerCase()) ||
              String(product.productPrice)
                ?.toLowerCase()
                .includes(value.toLowerCase())
          )
        )
      );
    } else {
      setOrder(allOrdersAdmin);
    }
  }, [value, allOrdersAdmin, allOrdersDataAdmin]);

  const handleChange = (userId, productId, value) => {
    //update order
  }

  return (
    <>
      {/* table */}
      <div className="w-full overflow-auto">
        <div
          className={`bg-white min-w-[800px] md:w-full border border-GrayLight rounded-lg ${
            value ? "h-80" : "h-[81vh]"
          } overflow-y-scroll transition-all duration-1000 ease-in-out`}
        >
          <table className="h-fit w-full group">
            <thead>
              <tr
                className={`w-full sticky top-0 bg-white group-hover:shadow-sm [&>th]:text-start [&>th]:pl-5 [&>th]:py-4 [&>th]:text-xl [&>th]:font-semibold mb-5`}
              >
                <th className="w-[10%] sm:w-fit">S no.</th>
                <th>Name</th>
                <th>User Email</th>
                <th>Category</th>
                <th>Price/=</th>
                <th>Stock</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {Order?.map((products, i) =>
                products?.map((product, j) => (
                  <tr
                    key={j}
                    className="[&>td]:text-start [&>td]:text-base [&>td]:px-4 [&>td]:py-2 border border-transparent border-b-GrayLight border-t-GrayLight last:border-b-transparent hover:bg-WhiteLight hover:cursor-pointer"
                  >
                    <td>{j + 1}</td>
                    <td className="flex justify-start items-center gap-3">
                      <img
                        className="w-12 h-12 rounded-full"
                        src="/products/p1.jpg"
                        alt="Rounded avatar"
                      />
                      <p>{product.productName}</p>
                    </td>
                    <td>{allOrdersDataAdmin?.[i]?.email}</td>
                    <td>{product.productCategory}</td>
                    <td>{product.productPrice}</td>
                    <td>{product.productStock}</td>
                    <td>
                      <Select
                        size="small"
                        fullWidth
                        value={(
                          allOrdersDataAdmin?.[i]?.orders?.[j]?.status || ""
                        ).toLowerCase()}
                        onChange={(e) =>
                          handleChange(
                            allOrdersDataAdmin?.[i]?._id,
                            product._id,
                            e.target.value
                          )
                        }
                      >
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="processing">Processing</MenuItem>
                        <MenuItem value="shipped">Shipped</MenuItem>
                        <MenuItem value="delivered">Delivered</MenuItem>
                      </Select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default OrdersDiv;
