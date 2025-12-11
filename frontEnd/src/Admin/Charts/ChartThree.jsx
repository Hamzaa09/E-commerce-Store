import Chart from "react-apexcharts";
import { getAllOrdersAdminThunk } from "../../../store/orders/order.thunk";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const ChartThree = ({ height }) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [Sales, setSales] = useState({
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  });
  const dispatch = useDispatch();
  const { allOrdersDataAdmin, allOrdersAdmin } = useSelector(
    (state) => state.orderSlice
  );

  useEffect(() => {
    dispatch(getAllOrdersAdminThunk());
  }, [dispatch]);

  useEffect(() => {
    if (allOrdersDataAdmin) {
      const orders = allOrdersDataAdmin.flatMap((user) => user.orders || []);
      const monthly = {
        Jan: 0,
        Feb: 0,
        Mar: 0,
        Apr: 0,
        May: 0,
        Jun: 0,
        Jul: 0,
        Aug: 0,
        Sep: 0,
        Oct: 0,
        Nov: 0,
        Dec: 0,
      };

      orders.forEach((order) => {
        const month = monthNames[new Date(order.orderedAt).getMonth()];

        monthly[month] += 1;
      });

      setSales(monthly);
    }
  }, [allOrdersAdmin, allOrdersDataAdmin]);

  const options = {
    chart: {
      id: "basic-line",
      toolbar: {
        show: true,
      },
      width: "100%",
    },
    xaxis: {
      categories: Array(monthNames)[0],
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            width: "100%",
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const series = [
    {
      name: "Sales",
      data: Object.values(monthNames.map((month) => Sales[month])),
    },
  ];

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold m-5 mb-0">Monthly Sales</h2>
      </div>

      <Chart options={options} series={series} type="bar" height={height} />
    </div>
  );
};

export default ChartThree;
