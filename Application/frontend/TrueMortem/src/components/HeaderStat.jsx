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
      <div className="grid md:grid-cols-2 gap-5 h-[50%]">
        <div className="flex flex-col items-center p-4 rounded-lg shadow-lg bg-white">
          <h1 className="text-lg font-semibold mb-4">Main Causes</h1>
          <div className="w-64 h-64">
            <Doughnut data={data} options={options} />
          </div>
        </div>
        <div className="flex items-center justify-center rounded-lg shadow-lg bg-white">
          <h1 className="text-lg font-bold">Our Focus</h1>
        </div>
      </div>
      {/* Second row */}
      <div className="h-[48%] md:h-[46%] my-auto flex justify-center rounded-lg shadow-lg bg-white mt-6">
        <Performance />
      </div>
    </div>
  );
}

export default HeaderStat;
