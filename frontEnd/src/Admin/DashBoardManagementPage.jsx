import AdminNav from "./AdminNav";
import SideBarComponent from "./SideBarComponent";
import {
  FaBox,
  FaLongArrowAltDown,
  FaLongArrowAltUp,
  FaUsers,
} from "react-icons/fa";
import ChartThree from "./Charts/ChartThree";
import ChartTwo from "./Charts/ChartTwo";
import { Link } from "react-router-dom";
import PageChunk from "./Divs/PageChunk";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllUsersCountThunk } from "../../store/users/user.thunk";
import { getAllOrdersCountThunk } from "../../store/orders/order.thunk";
import { getAllProductThunk } from "../../store/products/product.thunk";


const DashBoardManagementPage = () => {
  const dispatch = useDispatch();
  const { allUsersCount } = useSelector((state) => state.userSlice);
  const { allOrdersCount } = useSelector((state) => state.orderSlice);

  useEffect(() => {
    dispatch(getAllUsersCountThunk());
    dispatch(getAllOrdersCountThunk());
    dispatch(getAllProductThunk());
  }, []);

  return (
    <div className="flex w-full">
      <div className="flex">
        <SideBarComponent value={"dashboard"} />
      </div>

      <div className="flex flex-col w-full bg-WhiteLight">
        <AdminNav />

        {/* charts  */}
        <div className="grid lg:grid-cols-3 h-fit gap-5 w-full p-5">
          {/* chart one  */}
          <div className="lg:col-span-2 flex flex-col sm:flex-row gap-5 justify-between h-fit">
            {/* div 1 */}
            <Link
              to={"/admin/usersManagement"}
              className="w-full md:w-[50%] h-40 lg:h-50 bg-white border border-GrayLight rounded-lg flex"
            >
              <div className="flex flex-col gap-4 w-[50%] h-full justify-around px-5 md:px-[15%] xl:px-7 py-5">
                <div className="bg-WhiteLight p-2 rounded-lg text-3xl lg:text-4xl w-fit">
                  <FaUsers />
                </div>
                <div className="flex flex-col gap-2">
                  <h6 className="text-base lg:text-lg font-medium text-Gray">
                    Customers
                  </h6>
                  <h2 className="text-3xl lg:text-4xl font-bold">
                    {allUsersCount}
                  </h2>
                </div>
              </div>

              <div className="flex flex-col gap-4 w-[50%] h-full justify-end items-end px-10 py-5">
                <div className="bg-green-100 px-2 py-1 rounded-2xl text-sm lg:text-base text-green-900 font-semibold flex justify-center items-center">
                  <FaLongArrowAltUp />
                  17.01%
                </div>
              </div>
            </Link>

            {/* div 2 */}
            <Link
              to={"/admin/ordersManagement"}
              className="w-full md:w-[50%] h-40 lg:h-50 bg-white border border-GrayLight rounded-lg flex"
            >
              <div className="flex flex-col gap-4 w-[50%] h-full justify-around px-5 md:px-[15%] xl:px-7 py-5">
                <div className="bg-WhiteLight p-2 rounded-lg text-2xl lg:text-3xl w-fit">
                  <FaBox />
                </div>
                <div className="flex flex-col gap-2">
                  <h6 className="text-base lg:text-lg font-medium text-Gray">
                    Orders
                  </h6>
                  <h2 className="text-3xl lg:text-4xl font-bold">
                    {allOrdersCount}
                  </h2>
                </div>
              </div>

              <div className="flex flex-col gap-4 w-[50%] h-full justify-end items-end px-10 py-5">
                <div className="bg-red-100 px-2 py-1 rounded-2xl text-sm lg:text-base text-red-900 font-semibold flex justify-center items-center">
                  <FaLongArrowAltDown />
                  12.01%
                </div>
              </div>
            </Link>
          </div>

          {/* chart two  */}
          <div className="bg-white w-full border border-GrayLight rounded-lg pb-5 lg:row-span-2">
            <ChartTwo />
          </div>

          {/* Chart Three  */}
          <div className="lg:col-span-2 w-full bg-white border border-GrayLight rounded-lg flex flex-col xl:items-center overflow-auto">
            <div className="min-w-[700px] md:w-full flex justify-center items-center">
              <ChartThree height={200} />
            </div>
          </div>

          {/* Chart Four  */}
          <div className="lg:col-span-3 w-full overflow-hidden">
            <PageChunk
              value={{
                pageName: "OrdersManagement",
                pageHeading: "Recent Orders",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardManagementPage;
