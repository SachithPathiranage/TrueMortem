import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Performance from "./Performance";

ChartJS.register(ArcElement, Tooltip, Legend);

function HeaderStat() {
  const data = {
    labels: ["Heart Diseases", "Cancer", "Respiratory Diseases", "Other"],
    datasets: [
      {
        label: "Causes",
        data: [33, 18, 7, 42],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        hoverBackgroundColor: ["#FF4D6A", "#2A8AC4", "#E6B94C", "#3A9898"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            let total = tooltipItem.dataset.data.reduce(
              (acc, val) => acc + val,
              0
            );
            let value = tooltipItem.raw;
            let percentage = ((value / total) * 100).toFixed(1) + "%";
            return `${tooltipItem.label}: ${percentage}`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-full p-4">
      {/* Top Row - 50% Height */}
      <div className="grid md:grid-cols-2 gap-5 h-1/2 shadow-lg">
        <div className="flex flex-col items-center p-2 ml-6 rounded-lg shadow-lg bg-white h-full">
          <h1 className="text-lg font-semibold mb-3">Main Causes</h1>
          <div className="w-[95%] h-[80%] bg-[#efefef] rounded-lg flex items-center justify-center p-2">
            {/* <Doughnut
              data={data}
              options={options}
              className="w-[85%] h-[85%] max-h-[75%] max-w-[75%]"
            /> */}
          </div>
        </div>
        <div className="flex flex-col items-center p-2 mr-6 rounded-lg shadow-lg bg-white h-full">
          <h1 className="text-lg font-semibold mb-3">Our Focus</h1>
          <div className="w-[95%] h-[80%] bg-[#efefef] rounded-lg flex items-center justify-center p-2">
            {/* <img
              className="h-[85%] w-[85%] max-h-[75%] max-w-[75%] object-contain"
              src="/HomeHeart.png"
              alt="heart"
            /> */}
          </div>
        </div>
      </div>

      {/* Bottom Row - 50% Height */}
      <div className="h-1/2 flex justify-center rounded-lg shadow-lg bg-white mt-4 p-3">
        <Performance />
      </div>
    </div>
  );
}

export default HeaderStat;
