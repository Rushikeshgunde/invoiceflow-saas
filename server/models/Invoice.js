// ==========================================
// Imports
// ==========================================

const mongoose = require("mongoose");

// ==========================================
// Invoice Item Schema
// ==========================================

const invoiceItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    sku: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    discount: {
      type: Number,
      default: 0,
    },

    gst: {
      type: Number,
      default: 18,
    },

    total: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  },
);

// ==========================================
// Invoice Schema
// ==========================================

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    invoiceDate: {
      type: Date,
      required: true,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["Paid", "Unpaid", "Partially Paid"],
      default: "Unpaid",
    },

    items: [invoiceItemSchema],

    subtotal: {
      type: Number,
      required: true,
    },

    gstTotal: {
      type: Number,
      required: true,
    },

    grandTotal: {
      type: Number,
      required: true,
    },

    notes: {
      type: String,
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

module.exports = mongoose.model("Invoice", invoiceSchema);
