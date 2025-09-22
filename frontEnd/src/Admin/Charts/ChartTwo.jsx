import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ChartTwo = () => {
  const { allUsersCount, nationalCustomers } = useSelector(
    (state) => state.userSlice
  );
  const { allOrdersCount } = useSelector((state) => state.orderSlice);

  const options = {
    chart: {
      type: "donut",
    },
    labels: [
      `National: ${nationalCustomers}`,
      `InterNational: ${allUsersCount - nationalCustomers}`,
    ],
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "18em",
      itemMargin: {
        horizontal: 5,
        vertical: 0,
      },
      markers: {
        width: 12,
        height: 12,
        radius: 12,
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          legend: {
            position: "bottom",
            horizontalAlign: "center",
            fontSize: "17em",
            itemMargin: {
              horizontal: 5,
              vertical: 0,
            },
          },
        },
      },
    ],
  };

  const series = [
    (nationalCustomers / allUsersCount) * 100,
    ((allUsersCount - nationalCustomers) / allUsersCount) * 100,
  ];

  return (
    <div className="w-full flex flex-col gap-5 justify-around items-center h-full">
      <div className="flex justify-between items-start w-full">
        <Link to={"/admin/usersManagement"}>
          <h2 className="text-xl font-bold px-5 pt-5">Customers Statistics</h2>
        </Link>
      </div>

      <Chart
        options={options}
        series={series}
        type="donut"
        className="flex justify-center w-[90%] bigSm:w-[70%] sm:w-[60%] md:w-[55%] lg:w-[100%]"
      />
    </div>
  );
};

export default ChartTwo;
