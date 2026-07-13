// ==========================================
// Imports
// ==========================================

import { FaBell } from "react-icons/fa";

import "../../styles/Notifications.css";

// ==========================================
// Notification Bell
// ==========================================

function NotificationBell({
  unreadCount,
  onClick,
}) {
  return (
    <button
      className="notification-bell"
      onClick={onClick}
      type="button"
    >
      <FaBell />

      {unreadCount > 0 && (
        <span className="notification-badge">
          {unreadCount > 99
            ? "99+"
            : unreadCount}
        </span>
      )}
    </button>
  );
}

export default NotificationBell;