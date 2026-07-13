// ==========================================
// Imports
// ==========================================

const express = require("express");

const router = express.Router();

const {
  getNotifications,
  markAllRead,
  deleteNotification,
  markNotificationRead,
} = require("../controllers/notificationController");

const protect = require("../middleware/authMiddleware");

// ==========================================
// Notification Routes
// ==========================================

// Get all notifications
router.get("/", protect, getNotifications);

// Mark all notifications as read
router.put("/read-all", protect, markAllRead);

router.put("/:id/read", protect, markNotificationRead);

// Delete notification
router.delete("/:id", protect, deleteNotification);

module.exports = router;
