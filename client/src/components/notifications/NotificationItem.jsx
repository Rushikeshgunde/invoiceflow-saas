// ==========================================
// Imports
// ==========================================

import {
  FaFileInvoice,
  FaMoneyBillWave,
  FaUsers,
  FaBoxOpen,
  FaWallet,
  FaBell,
} from "react-icons/fa";

import "../../styles/Notifications.css";

// ==========================================
// Notification Item
// ==========================================

function NotificationItem({ notification, onClick }) {
  // ==========================================
  // Icon
  // ==========================================

  const getIcon = () => {
    switch (notification.type) {
      case "invoice":
        return <FaFileInvoice />;

      case "payment":
        return <FaMoneyBillWave />;

      case "customer":
        return <FaUsers />;

      case "product":
        return <FaBoxOpen />;

      case "expense":
        return <FaWallet />;

      default:
        return <FaBell />;
    }
  };

  // ==========================================
  // Render
  // ==========================================

  return (
    <div
      className={`notification-item ${
        !notification.read ? "notification-unread" : ""
      }`}
      onClick={onClick}
    >
      {/* Icon */}

      <div className="notification-item-icon">{getIcon()}</div>

      {/* Content */}

      <div className="notification-item-content">
        <h4>{notification.title}</h4>

        <p>{notification.message}</p>

        <span>{notification.createdAt}</span>
      </div>

      {/* Unread Dot */}

      {!notification.read && <div className="notification-dot"></div>}
    </div>
  );
}

export default NotificationItem;
