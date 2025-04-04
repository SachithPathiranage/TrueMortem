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
    labels: [
      "PM Model",
      "Accuracy",
      "Precision",
      "Recall",
      "",
      "VA Model",
      "Accuracy",
      "Precision",
      "Recall",
    ],
    datasets: [
      {
        label: "Performance (%)",
        data: [null, 80, 92, 88, null, null, 86, 94, 91],
        backgroundColor: [
          "transparent",
          "#FF6384",
          "#FF6384",
          "#FF6384",
          "transparent",
          "transparent",
          "#36A2EB",
          "#36A2EB",
          "#36A2EB",
        ],
        hoverBackgroundColor: [
          "transparent",
          "#FF4D6A",
          "#FF4D6A",
          "#FF4D6A",
          "transparent",
          "transparent",
          "#2A8AC4",
          "#2A8AC4",
          "#2A8AC4",
        ],
        borderRadius: 5,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value) => `${value}%`,
          font: { size: 12 },
          color: "#333",
        },
        title: {
          display: true,
          text: "Performance (%)",
          font: { size: 14 },
        },
      },
      y: {
        ticks: {
          font: {
            size: 13,
            weight: (ctx) => {
              const label = data.labels[ctx.index];
              return label.includes("Model") ? "bold" : "normal";
            },
          },
          color: (ctx) => {
            const label = data.labels[ctx.index];
            if (label === "PM Model") return "#000000";
            if (label === "VA Model") return "#000000";
            return "#333";
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            if (tooltipItem.raw === null) return "";
            return `${tooltipItem.raw}%`;
          },
        },
      },
    },
  };

  return (
    <div className="mt-25 mb-25 max-w-[1240px] mx-auto h-full flex flex-col items-center p-8 rounded-lg shadow-lg bg-white">
      <h1 className="text-lg font-semibold mb-4">Model Performance Metrics</h1>
      <div className="w-full h-96">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default Performance;
