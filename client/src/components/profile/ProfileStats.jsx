// ==========================================
// Imports
// ==========================================

import {
  FaFileInvoice,
  FaUsers,
  FaBoxOpen,
  FaIndianRupeeSign,
} from "react-icons/fa6";

import "../../styles/Profile.css";

// ==========================================
// Profile Stats
// ==========================================

function ProfileStats({ profile }) {
  // ==========================================
  // Stats
  // ==========================================

  const stats = [
    {
      title: "Invoices",
      value: profile?.totalInvoices || 0,
      icon: <FaFileInvoice />,
    },
    {
      title: "Customers",
      value: profile?.totalCustomers || 0,
      icon: <FaUsers />,
    },
    {
      title: "Products",
      value: profile?.totalProducts || 0,
      icon: <FaBoxOpen />,
    },
    {
      title: "Revenue",
      value: `₹${Number(profile?.totalRevenue || 0).toLocaleString("en-IN")}`,
      icon: <FaIndianRupeeSign />,
    },
  ];

  // ==========================================
  // Render
  // ==========================================

  return (
    <div className="profile-stats">
      {stats.map((item) => (
        <div key={item.title} className="profile-stat-card">
          <div className="profile-stat-icon">{item.icon}</div>

          <div className="profile-stat-content">
            <h4>{item.title}</h4>

            <h2>{item.value}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProfileStats;
