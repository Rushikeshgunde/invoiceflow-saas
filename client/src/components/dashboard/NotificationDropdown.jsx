import { useEffect, useRef, useState } from "react";
import { FaBell, FaCheck } from "react-icons/fa";
import "../../styles/NotificationDropdown.css";

function NotificationDropdown() {
  const [open, setOpen] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Invoice #102 Paid",
      time: "2 min ago",
      read: false,
    },
    {
      id: 2,
      title: "New Customer Added",
      time: "10 min ago",
      read: false,
    },
    {
      id: 3,
      title: "Monthly Report Ready",
      time: "1 hour ago",
      read: false,
    },
  ]);

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(
    (item) => !item.read
  ).length;

  const markAllRead = () => {
    setNotifications((prev) =>
      prev.map((item) => ({
        ...item,
        read: true,
      }))
    );
  };

  return (
    <div className="notification" ref={dropdownRef}>
      <button
        className="notification-btn"
        onClick={() => setOpen(!open)}
      >
        <FaBell />

        {unreadCount > 0 && (
          <span className="notification-badge">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="notification-menu">

          <div className="notification-header">
            <h4>Notifications</h4>

            {unreadCount > 0 && (
              <button onClick={markAllRead}>
                <FaCheck />
                Mark all
              </button>
            )}
          </div>

          <div className="notification-list">

            {notifications.length === 0 ? (
              <p className="empty">
                No Notifications
              </p>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  className={`notification-item ${
                    item.read ? "read" : ""
                  }`}
                >
                  <h5>{item.title}</h5>

                  <span>{item.time}</span>
                </div>
              ))
            )}

          </div>

          <button className="view-all">
            View All
          </button>

        </div>
      )}
    </div>
  );
}

export default NotificationDropdown;