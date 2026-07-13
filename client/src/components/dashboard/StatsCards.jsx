import {
  FaIndianRupeeSign,
  FaFileInvoice,
  FaUsers,
  FaBox,
} from "react-icons/fa6";

import StatsCard from "./StatsCard";
import { FaMoneyBillWave } from "react-icons/fa";

function StatsCards({ stats }) {
  if (!stats) {
    return <h3>Loading...</h3>;
  }

  const cards = [
  {
    title: "Total Invoice Value",
    value: `₹${stats.totalInvoiceValue.toLocaleString()}`,
    icon: <FaFileInvoice />,
  },

  {
    title: "Revenue Collected",
    value: `₹${stats.revenueCollected.toLocaleString()}`,
    icon: <FaIndianRupeeSign />,
  },

  {
    title: "Outstanding",
    value: `₹${stats.outstandingAmount.toLocaleString()}`,
    icon: <FaMoneyBillWave />,
  },

  {
    title: "Total Invoices",
    value: stats.totalInvoices,
    icon: <FaFileInvoice />,
  },

  {
    title: "Customers",
    value: stats.totalCustomers,
    icon: <FaUsers />,
  },

  {
    title: "Products",
    value: stats.totalProducts,
    icon: <FaBox />,
  },
];
  return (
    <div className="stats-grid">
      {cards.map((card, index) => (
        <StatsCard key={index} {...card} />
      ))}
    </div>
  );
}

export default StatsCards;