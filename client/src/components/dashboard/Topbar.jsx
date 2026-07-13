import { FaBars} from "react-icons/fa";
import { useState } from "react";
import { markAllRead } from "../../services/notificationService";
import "../../styles/topbar.css";
import useSidebar from "../../hooks/useSidebar";
import ProfileDropdown from "./ProfileDropdown";
import NotificationBell from "../notifications/NotificationBell";
import NotificationDropdown from "../notifications/NotificationDropdown";
import GlobalSearch from "./GlobalSearch";
import { useRef, useEffect } from "react";

import { useNotification } from "../../context/NotificationContext";

import { toast } from "react-toastify";

function Topbar() {
  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const { toggleSidebar } = useSidebar();

  const [showNotifications, setShowNotifications] = useState(false);
  const { notifications, unreadCount, refreshNotifications } =
    useNotification();

  const notificationRef = useRef(null);

  const handleMarkAllRead = async () => {
    try {
      await markAllRead();

      await refreshNotifications();

      toast.success("All notifications marked as read.");
    } catch (error) {
      console.error(error);

      toast.error("Unable to update notifications.");
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <header className="topbar">
      {/* Left */}

      <div className="topbar-left">
        <button
          className="menu-btn"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <FaBars />
        </button>

        <div className="top-search-box">
          <GlobalSearch />
        </div>
      </div>

      {/* Right */}

      <div className="topbar-right">
        <div ref={notificationRef} className="notification-wrapper">
          <NotificationBell
            unreadCount={unreadCount}
            onClick={() => setShowNotifications((prev) => !prev)}
          />

          {showNotifications && (
            <NotificationDropdown
              notifications={notifications}
              onClose={() => setShowNotifications(false)}
              onMarkAllRead={handleMarkAllRead}
            />
          )}
        </div>
        {/* </button> */}

       

        <span className="today">{today}</span>

        {/* <div className="topbar-right"> */}
        <ProfileDropdown />
        {/* </div> */}
      </div>
    </header>
  );
}

export default Topbar;
