// ==========================================
// Imports
// ==========================================

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import "../../styles/Reports.css";

// ==========================================
// Revenue Chart
// ==========================================

function RevenueChart({ data }) {
  // ==========================================
  // Monthly Data
  // ==========================================

  const chartData = data?.monthlyRevenue || [];

  // ==========================================
  // Render
  // ==========================================

  return (
    <div className="report-chart-card">

      {/* Header */}

      <div className="report-chart-header">
        <h3>Revenue Collected by Month</h3>
      </div>

      {/* Chart */}

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <LineChart data={chartData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip
            formatter={(value) =>
              `₹${Number(value).toLocaleString("en-IN")}`
            }
          />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}

export default RevenueChart;