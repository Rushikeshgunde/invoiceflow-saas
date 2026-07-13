// ==========================================
// Imports
// ==========================================

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import "../../styles/Reports.css";

// ==========================================
// Colors
// ==========================================

const COLORS = [
  "#22c55e",
  "#f59e0b",
  "#ef4444",
];

// ==========================================
// Invoice Chart
// ==========================================

function InvoiceChart({ data }) {
  const chartData = [
    {
      name: "Paid",
      value: data?.paidInvoices || 0,
    },
    {
      name: "Partial",
      value: data?.partialInvoices || 0,
    },
    {
      name: "Unpaid",
      value: data?.unpaidInvoices || 0,
    },
  ];

  return (
    <div className="report-chart-card">
      <div className="report-chart-header">
        <h3>Invoice Status</h3>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {chartData.map((item, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default InvoiceChart;