// ==========================================
// Imports
// ==========================================

import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  Cell,
  Legend,
} from "recharts";

import "../../styles/Reports.css";

// ==========================================
// Colors
// ==========================================

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#f97316",
  "#a855f7",
  "#ef4444",
];

// ==========================================
// Payment Method Chart
// ==========================================

function PaymentMethodChart({ data }) {
  // NOTE: backend (getPaymentMethodReport) returns keys as
  // "Cash", "UPI", "Card", "Bank Transfer", "Cheque" — using
  // bracket notation here to match exactly, since dot notation
  // with lowercase/camelCase names silently returned undefined.
  const chartData = [
    {
      name: "Cash",
      value: data?.["Cash"] || 0,
    },
    {
      name: "UPI",
      value: data?.["UPI"] || 0,
    },
    {
      name: "Card",
      value: data?.["Card"] || 0,
    },
    {
      name: "Bank",
      value: data?.["Bank Transfer"] || 0,
    },
    {
      name: "Cheque",
      value: data?.["Cheque"] || 0,
    },
  ];

  return (
    <div className="report-chart-card">
      <div className="report-chart-header">
        <h3>Payment Methods</h3>
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
                fill={COLORS[index % COLORS.length]}
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

export default PaymentMethodChart;