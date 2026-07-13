// ==========================================
// Imports
// ==========================================

import api from "./api";

// ==========================================
// Get Notifications
// ==========================================

export const getNotifications = async () => {
  const { data } = await api.get("/notifications");

  return data;
};

// ==========================================
// Mark All Read
// ==========================================

export const markAllRead = async () => {
  const { data } = await api.put("/notifications/read-all");

  return data;
};

// ==========================================
// Delete Notification
// ==========================================

export const deleteNotification = async (id) => {
  const { data } = await api.delete(`/notifications/${id}`);

  return data;
};

export const markNotificationRead = async (id) => {
  const { data } = await api.put(`/notifications/${id}/read`);

  return data;
};