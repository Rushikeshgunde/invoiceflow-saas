import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function InvoiceStatusChart({ data }) {
  const chartData = {
    labels: ["Paid", "Unpaid", "Partially Paid"],

    datasets: [
      {
        data: [
          data?.paid || 0,
          data?.unpaid || 0,
          data?.partiallyPaid || 0,
        ],

        backgroundColor: [
          "#22c55e",
          "#ef4444",
          "#f59e0b",
        ],

        borderWidth: 1,
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
    },
  };

  return (
    <div className="chart-card">
      <h3>Invoice Status</h3>

      <div className="chart-wrapper">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
}

export default InvoiceStatusChart;