// ==========================================
// Imports
// ==========================================

const mongoose = require("mongoose");

// ==========================================
// Expense Schema
// ==========================================

const expenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    vendor: {
      type: String,
      default: "",
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    paymentMethod: {
      type: String,
      enum: ["Cash", "UPI", "Card", "Bank Transfer", "Cheque"],
      default: "Cash",
    },

    referenceNumber: {
      type: String,
      default: "",
      trim: true,
    },

    expenseDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["Paid", "Pending", "Cancelled"],
      default: "Paid",
    },

    notes: {
      type: String,
      default: "",
      trim: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// ==========================================
// Export
// ==========================================

module.exports = mongoose.model("Expense", expenseSchema);
