import {
  FaIndianRupeeSign,
  FaFileInvoice,
  FaUsers,
  FaBox,
} from "react-icons/fa6";

import StatsCard from "./StatsCard";

function StatsCards() {
  const cards = [
    {
      title: "Total Revenue",
      value: "₹1,25,000",
      growth: "12.5%",
      icon: <FaIndianRupeeSign />,
    },
    {
      title: "Total Invoices",
      value: "125",
      growth: "8.2%",
      icon: <FaFileInvoice />,
    },
    {
      title: "Customers",
      value: "85",
      growth: "5.6%",
      icon: <FaUsers />,
    },
    {
      title: "Products",
      value: "230",
      growth: "2.1%",
      icon: <FaBox />,
    },
  ];

  return (
    <div className="stats-grid">
      {cards.map((card, index) => (
        <StatsCard
          key={index}
          {...card}
        />
      ))}
    </div>
  );
}

export default StatsCards;