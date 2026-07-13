// ==========================================
// Imports
// ==========================================

const Setting = require("../models/Setting");

// ==========================================
// Get Settings
// ==========================================

const getSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne({
      user: req.user.id,
    });

    // Create default settings if none exist
    if (!settings) {
      settings = await Setting.create({
        user: req.user.id,
      });
    }

    res.status(200).json({
      success: true,
      settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Update Settings
// ==========================================

const updateSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne({
      user: req.user.id,
    });

    if (!settings) {
      settings = await Setting.create({
        user: req.user.id,
      });
    }

    settings.invoice = req.body.invoice || settings.invoice;
    settings.tax = req.body.tax || settings.tax;

    await settings.save();

    res.status(200).json({
      success: true,
      message: "Settings updated successfully.",
      settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Exports
// ==========================================

module.exports = {
  getSettings,
  updateSettings,
};