import {
  //   FaHome,
  //   FaUsers,
  //   FaBox,
  //   FaFileInvoiceDollar,
  //   FaWallet,
  //   FaChartBar,
  //   FaCog,
  //   FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

import {} from //   LayoutDashboard,
//   Users,
//   Package,
//   FileText,
//   Wallet,
//   BarChart3,
//   Settings,
//   User,
// LogOut,
"lucide-react";

import { NavLink } from "react-router-dom";
import "../../styles/sidebar.css";

import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useSidebar from "../../hooks/useSidebar";
import logo from "../../assets/images/invoiceFlow-logo.png";

function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { collapsed, mobileOpen, toggleMobile, closeMobile } = useSidebar();

  const handleLogout = () => {
    logout();

    navigate("/login", {
      replace: true,
    });
  };

  const menuItems = [
    {
      name: "Dashboard",
      // icon: <LayoutDashboard className="side-bar" />,
      icon: "🏠",
      path: "/dashboard",
    },
    {
      name: "Customers",
      // icon: <FaUsers />,
      icon: "👥",
      path: "/dashboard/customers",
    },
    {
      name: "Products",
      // icon: <FaBox />,
      icon: "📦",
      path: "/dashboard/products",
    },
    {
      name: "Invoices",
      // icon: <FaFileInvoiceDollar />,
      icon: "🧾",
      path: "/dashboard/invoices",
    },
    // {
    //   name: "Payments",
    //   icon: "💳",
    //   path: "/dashboard/payments",
    // },
    {
      name: "Expenses",
      // icon: <FaWallet />,
      icon: "💰",
      path: "/dashboard/expenses",
    },
    {
      name: "Reports",
      // icon: <FaChartBar />,
      icon: "📊",
      path: "/dashboard/reports",
    },
    {
      name: "Settings",
      // icon: <FaCog />,
      icon: "⚙",
      path: "/dashboard/settings",
    },
    {
      name: "Profile",
      // icon: <FaUserCircle />,
      icon: "👤",
      path: "/dashboard/profile",
    },
  ];

  return (
    <>
      {/* Hamburger button — sirf mobile CSS media query mein visible hoga */}
      <button
        className="menu-toggle"
        onClick={toggleMobile}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      {/* Overlay — sirf mobile drawer open hone par dikhega */}
      <div
        className={`sidebar-overlay ${mobileOpen ? "show" : ""}`}
        onClick={closeMobile}
      />

      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        {/* <div className="sidebar-logo">
        {collapsed ? (
          <h2>IF</h2>
        ) : (
          <>
            <h2>InvoiceFlow</h2>
            <p>Business Suite</p>
            
          </>
        )}
      </div> */}

        <div className="sidebar-logo">
          {collapsed ? (
            <img src={logo} alt="InvoiceFlow" className="sidebar-logo-icon" />
          ) : (
            <img src={logo} alt="InvoiceFlow" className="sidebar-logo-full" />
          )}
        </div>

        <nav className="sidebar-menu">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/dashboard"}
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <span className="sidebar-icon">{item.icon}</span>

              {!collapsed && <span>{item.name}</span>}

              {collapsed && (
                <span className="sidebar-tooltip">{item.name}</span>
              )}
            </NavLink>
          ))}
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt />
          {!collapsed && <span>Logout</span>}
          {collapsed && <span className="sidebar-tooltip">Logout</span>}
        </button>
      </aside>
    </>
  );
}

export default Sidebar;
