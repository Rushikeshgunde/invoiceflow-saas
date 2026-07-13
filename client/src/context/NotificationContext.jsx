// ==========================================
// Imports
// ==========================================

import { createContext, useContext, useEffect, useState } from "react";

import { toast } from "react-toastify";

import { getNotifications } from "../services/notificationService";

import { markNotificationRead } from "../services/notificationService";

// ==========================================
// Context
// ==========================================

const NotificationContext = createContext();

// ==========================================
// Provider
// ==========================================

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const [loading, setLoading] = useState(false);

  // ==========================================
  // Load Notifications
  // ==========================================

  const loadNotifications = async () => {
    try {
      setLoading(true);

      const res = await getNotifications();

      setNotifications(res.notifications || []);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load notifications.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Refresh
  // ==========================================

  const refreshNotifications = async () => {
    await loadNotifications();
  };

  // ==========================================
  // Unread Count
  // ==========================================

  const unreadCount = notifications.filter((item) => !item.read).length;

  const readNotification = async (id) => {
    const notification = notifications.find((n) => n._id === id);

    if (notification?.read) return;

    try {
      await markNotificationRead(id);

      await refreshNotifications();
    } catch (error) {
      console.error(error);
    }
  };
  // ==========================================
  // First Load
  // ==========================================

  useEffect(() => {
    loadNotifications();
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setNotifications,

        unreadCount,

        loading,

        refreshNotifications,
        readNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

// ==========================================
// Hook
// ==========================================

export const useNotification = () => useContext(NotificationContext);
