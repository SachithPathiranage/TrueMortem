import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Performance() {
  const data = {
    labels: ["PM Model", "VA Model"],
    datasets: [
      {
        label: "Acurracy",
        data: [80, 86], // Accuracy & Precision for PM Model
        backgroundColor: "#FF6384",
        hoverBackgroundColor: "#FF4D6A",
        borderRadius: 5,
      },
      {
        label: "Precision",
        data: [92, 94], // Accuracy & Precision for VA Model
        backgroundColor: "#36A2EB",
        hoverBackgroundColor: "#2A8AC4",
        borderRadius: 5,
      },
    ],
  };

  const options = {
    indexAxis: "y", // Horizontal bar chart
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        max: 100, // Since accuracy & precision are percentages
        ticks: {
          font: { size: 13 },
          color: "#333",
          callback: (value) => `${value}%`, // Adds '%' to x-axis labels
        },
      },
      y: {
        ticks: {
          font: { size: 14 },
          color: "#333",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.raw}%`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-full p-4">
      <div className="flex flex-col items-center p-4 rounded-lg shadow-lg bg-white">
        <h1 className="text-lg font-semibold mb-4">
          Model Performance Comparison
        </h1>
        <div className="w-[100%] h-40">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
}

export default Performance;
