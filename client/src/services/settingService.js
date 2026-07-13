// ==========================================
// Imports
// ==========================================

import api from "./api";

// ==========================================
// Get Settings
// ==========================================

export const getSettings = async () => {
  const { data } = await api.get("/settings");

  return data;
};

// ==========================================
// Update Settings
// ==========================================

export const updateSettings = async (settingsData) => {
  const { data } = await api.put(
    "/settings",
    settingsData
  );

  return data;
};