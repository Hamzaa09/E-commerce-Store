import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersAdminThunk } from "../../../store/orders/order.thunk";
import { Select, MenuItem } from "@mui/material";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const OrdersDiv = ({ value }) => {
  const dispatch = useDispatch();
  const { allOrdersDataAdmin, allOrdersAdmin } = useSelector(
    (state) => state.orderSlice
  );
  const [Order, setOrder] = useState([]);
  const [expandedUsers, setExpandedUsers] = useState({}); // track which user's orders are expanded
  const productIDs = allOrdersAdmin.flatMap((item) => item);
  const productMap = {};
  productIDs.forEach((p) => {
    productMap[p._id] = p;
  });

  useEffect(() => {
    dispatch(getAllOrdersAdminThunk());
  }, [dispatch]);

  useEffect(() => {
    if (value) {
      setOrder(
        allOrdersDataAdmin.filter((user) =>
          user.email?.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setOrder(allOrdersDataAdmin);
    }
  }, [value, allOrdersAdmin, allOrdersDataAdmin]);

  const toggleExpand = (userId) => {
    setExpandedUsers((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  let rowNumber = 0;

  return (
    <div className="w-full overflow-auto">
      <div
        className={`bg-white min-w-[800px] md:w-full border border-GrayLight rounded-lg ${
          value ? "h-80" : "h-[81vh]"
        } overflow-y-scroll transition-all duration-1000 ease-in-out`}
      >
        <table className="h-fit w-full table-fixed group">
          <thead>
            <tr className="w-full sticky top-0 bg-white group-hover:shadow-sm [&>th]:text-start [&>th]:pl-5 [&>th]:py-4 [&>th]:text-xl [&>th]:font-semibold mb-5 z-10">
              <th className="px-4 w-[10%] whitespace-nowrap">S No.</th>
              <th className="px-4 w-[40%] whitespace-nowrap">User</th>
              <th className="px-4">Order</th>
            </tr>
          </thead>

          <tbody>
            {allOrdersAdmin.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="mainHeading flex flex-col justify-start items-start md:justify-center md:items-center mb-15 tracking-wide px-5 mt-5 md:px-10 lg:mt-10 2xl:w-[1500px] 2xl:mx-auto"
                >
                  <h1 className="py-3 text-center text-2xl md:text-3xl font-bold">
                    No Orders
                  </h1>
                  <span className="bg-Red w-[100px] lg:w-[10%] h-1"></span>
                </td>
              </tr>
            )}

            {Order.map((user) => {
              if (user.orders.length > 0) {
                rowNumber += 1;
                const isExpanded = expandedUsers[user._id] || false;

                return (
                  <tr
                    key={user._id}
                    className="[&>td]:text-start [&>td]:text-base [&>td]:mx-4 [&>td]:py-2 border border-transparent border-b-GrayLight border-t-GrayLight last:border-b-transparent hover:bg-WhiteLight hover:cursor-pointer"
                  >
                    <td className="pl-4">{rowNumber}</td>
                    <td className="flex justify-start items-center gap-3">
                      <img
                        className="w-12 h-12 rounded-full"
                        src="/ProfilePhoto.jpeg"
                        alt="Rounded avatar"
                      />
                      <p>{user.email}</p>
                    </td>
                    <td>
                      {/* Show first order */}
                      <OrderItem
                        item={user.orders[0]}
                        productMap={productMap}
                      />

                      {/* Show "Show More" if more than 1 order */}
                      {user.orders.length > 1 && (
                        <>
                          <button
                            className="flex items-center gap-2 mt-2 mb-2 text-blue-600 font-medium hover:cursor-pointer"
                            onClick={() => toggleExpand(user._id)}
                          >
                            {isExpanded
                              ? "Show Less"
                              : `Show ${user.orders.length - 1} More`}
                            {isExpanded ? (
                              <FiChevronUp className="w-4 h-4" />
                            ) : (
                              <FiChevronDown className="w-4 h-4" />
                            )}
                          </button>

                          {/* Collapsible rest of orders */}
                          <div
                            className={`transition-all duration-300 ease-in-out overflow-hidden ${
                              isExpanded ? "max-h-[2000px]" : "max-h-0"
                            }`}
                          >
                            {user.orders.slice(1).map((item) => (
                              <OrderItem
                                key={item.product}
                                item={item}
                                productMap={productMap}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const OrderItem = ({ item, productMap }) => (
  <div className="flex justify-between pr-20 py-2 gap-4 mb-2 border-b border-GrayLight">
    <div className="flex justify-start items-center gap-3">
      <img
        className="w-10 h-10 rounded-sm shadow-2xl"
        src={productMap[item.product]?.productImages?.[0]}
        alt="Product"
      />
      <p className="break-words">{productMap[item.product]?.productName}</p>
    </div>
    <div className="flex gap-2">
      <p>
        <strong>Quantity: </strong>
        {item.quantity}
      </p>
    </div>
  </div>
);

export default OrdersDiv;
