import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

import "../../styles/DashboardCharts.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

function SalesChart({ data = [] }) {
  // ==========================================
  // Month Labels
  // ==========================================

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",];

  // ==========================================
  // Convert API Data to Monthly Revenue
  // ==========================================

  const monthlyRevenue = new Array(12).fill(0);

  data.forEach((item) => {
    monthlyRevenue[item._id - 1] = item.total;
  });

  // ==========================================
  // Chart Data
  // ==========================================

  const chartData = {
    labels: months,

    datasets: [
      {
        label: "Revenue",

        data: monthlyRevenue,

        borderColor: "#2563eb",

        backgroundColor: "rgba(37,99,235,.15)",

        fill: true,

        tension: 0.4,
      },
    ],
  };

  // ==========================================
  // Chart Options
  // ==========================================

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // ==========================================
  // Render
  // ==========================================

  return (
    <div className="chart-card">
      <h3>Monthly Invoice Value</h3>

      <div className="chart-wrapper">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}

export default SalesChart;
