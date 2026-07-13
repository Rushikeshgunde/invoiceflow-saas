const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },

    invoice: {
      prefix: {
        type: String,
        default: "INV-",
      },

      dueDays: {
        type: Number,
        default: 30,
      },

      notes: {
        type: String,
        default: "",
      },

      terms: {
        type: String,
        default: "",
      },
    },

    tax: {
      gstRate: {
        type: Number,
        default: 18,
      },

      currency: {
        type: String,
        default: "INR",
      },

      taxInclusive: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Setting",
  settingSchema
);