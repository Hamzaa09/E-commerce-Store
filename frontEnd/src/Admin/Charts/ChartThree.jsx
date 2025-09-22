import Chart from "react-apexcharts";

const ChartThree = ({ height }) => {
  const options = {
    chart: {
      id: "basic-line",
      toolbar: {
        show: true,
      },
      width: "100%",
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jun", "Jun", "Jun"],
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
      data: [300, 400, 300, 500, 400, 600, 100, 150, 200 ],
    },
  ];

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold m-5 mb-0">Monthly Sales</h2>
      </div>
      
      <Chart options={options} series={series} type="bar" height={height}/>
    </div>
  );
};

export default ChartThree;
