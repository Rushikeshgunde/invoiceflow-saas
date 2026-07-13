// ==========================================
// Imports
// ==========================================

const Notification = require("../models/Notification");

// ==========================================
// Create Notification
// ==========================================

const createNotification = async ({
  user,
  title,
  message,
  type = "general",
}) => {
  try {
    await Notification.create({
      user,
      title,
      message,
      type,
    });
  } catch (error) {
    console.error("Notification Error:", error.message);
  }
};

module.exports = createNotification;
