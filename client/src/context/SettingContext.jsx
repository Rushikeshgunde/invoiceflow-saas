// ==========================================
// Imports
// ==========================================

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { toast } from "react-toastify";

import {
  getSettings,
  updateSettings,
} from "../services/settingService";

// ==========================================
// Context
// ==========================================

const SettingContext = createContext();

// ==========================================
// Provider
// ==========================================

export function SettingProvider({ children }) {
  const [settings, setSettings] = useState(null);

  const [loading, setLoading] = useState(false);

  // ==========================================
  // Load Settings
  // ==========================================

  const loadSettings = async () => {
    try {
      setLoading(true);

      const res = await getSettings();

      setSettings(res.settings);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load settings.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Refresh Settings
  // ==========================================

  const refreshSettings = async () => {
    await loadSettings();
  };

  // ==========================================
  // Update Settings
  // ==========================================

  const editSettings = async (settingData) => {
    try {
      const res = await updateSettings(settingData);

      toast.success(res.message);

      setSettings(res.settings);

      return {
        success: true,
      };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to update settings.";

      toast.error(message);

      return {
        success: false,
      };
    }
  };

  // ==========================================
  // First Load
  // ==========================================

  useEffect(() => {
    loadSettings();
  }, []);

  return (
    <SettingContext.Provider
      value={{
        settings,
        loading,

        refreshSettings,

        editSettings,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
}

// ==========================================
// Hook
// ==========================================

export const useSetting = () =>
  useContext(SettingContext);