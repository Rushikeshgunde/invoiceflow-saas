import {
  FaIndianRupeeSign,
  FaFileInvoice,
  FaUsers,
  FaBox,
} from "react-icons/fa6";

import StatsCard from "./StatsCard";

function StatsCards({ stats }) {
  if (!stats) {
    return <h3>Loading...</h3>;
  }

  const cards = [
    {
      title: "Total Revenue",
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      growth: "",
      icon: <FaIndianRupeeSign />,
    },
    {
      title: "Total Invoices",
      value: stats.totalInvoices,
      growth: "",
      icon: <FaFileInvoice />,
    },
    {
      title: "Customers",
      value: stats.totalCustomers,
      growth: "",
      icon: <FaUsers />,
    },
    {
      title: "Products",
      value: stats.totalProducts,
      growth: "",
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