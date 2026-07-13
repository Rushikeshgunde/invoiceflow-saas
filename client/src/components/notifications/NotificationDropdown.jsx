// ==========================================
// Imports
// ==========================================

import { useNotification } from "../../context/NotificationContext";
import NotificationItem from "./NotificationItem";

import "../../styles/Notifications.css";
import { useNavigate } from "react-router-dom";

// ==========================================
// Notification Dropdown
// ==========================================

function NotificationDropdown({ notifications, onClose, onMarkAllRead }) {
  const { readNotification } = useNotification();
  const navigate = useNavigate();

  return (
    <div className="notification-dropdown">
      {/* Header */}

      <div className="notification-dropdown-header">
        <h3>Notifications</h3>

        {notifications.length > 0 && (
          <button
            type="button"
            className="notification-mark-btn"
            onClick={onMarkAllRead}
          >
            Mark all read
          </button>
        )}
      </div>

      {/* Body */}

      <div className="notification-dropdown-body">
        {notifications.length === 0 ? (
          <div className="notification-empty">No notifications found.</div>
        ) : (
          notifications.map((notification) => (
            <NotificationItem
              key={notification._id}
              notification={notification}
              onClick={() => readNotification(notification._id)}
            />
          ))
        )}
      </div>

      {/* Footer */}

      <div className="notification-dropdown-footer">
        <button
          type="button"
          className="notification-view-all-btn"
          onClick={() => {
            onClose();
            navigate("/dashboard/notifications");
          }}
        >
          View All Notifications
        </button>
      </div>
    </div>
  );
}

export default NotificationDropdown;
