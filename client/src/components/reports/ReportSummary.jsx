// ==========================================
// Imports
// ==========================================

import {
  FaRupeeSign,
  FaFileInvoice,
  FaMoneyCheckAlt,
  FaUsers,
  FaBoxOpen,
} from "react-icons/fa";

import "../../styles/Reports.css";

// ==========================================
// Report Summary
// ==========================================

function ReportSummary({
  revenue,
  invoices,
  payments,
  customers,
  products,
}) {
  // ==========================================
  // Cards
  // ==========================================

  const cards = [
    {
      title: "Revenue Collected",
      value: `₹${Number(
        revenue?.totalRevenue || 0
      ).toLocaleString("en-IN")}`,
      icon: <FaRupeeSign />,
      color: "green",
    },

    {
      title: "Total Invoices",
      value: invoices?.totalInvoices || 0,
      icon: <FaFileInvoice />,
      color: "blue",
    },

    {
      title: "Total Payments",
      value: payments?.totalPayments || 0,
      icon: <FaMoneyCheckAlt />,
      color: "purple",
    },

    {
      title: "Customers",
      value: customers?.length || 0,
      icon: <FaUsers />,
      color: "orange",
    },

    {
      title: "Products",
      value: products?.length || 0,
      icon: <FaBoxOpen />,
      color: "red",
    },
  ];

  // ==========================================
  // Render
  // ==========================================

  return (
    <div className="report-summary">

      {cards.map((card) => (
        <div
          key={card.title}
          className={`report-summary-card ${card.color}`}
        >
          <div className="report-summary-icon">
            {card.icon}
          </div>

          <div className="report-summary-content">

            <h5>{card.title}</h5>

            <h3>{card.value}</h3>

          </div>
        </div>
      ))}

    </div>
  );
}

export default ReportSummary;