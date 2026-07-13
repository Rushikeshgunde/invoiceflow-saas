// ==========================================
// Imports
// ==========================================

const mongoose = require("mongoose");

const Customer = require("../models/Customer");
const Product = require("../models/Product");
const Invoice = require("../models/Invoice");

// ==========================================
// Dashboard Stats
// ==========================================

const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // ==========================================
    // Counts & Invoices
    // ==========================================

    const [customers, products, invoices] = await Promise.all([
      Customer.countDocuments({ user: userId }),
      Product.countDocuments({ user: userId }),
      Invoice.find({ user: userId }),
    ]);

    // ==========================================
    // Revenue
    // ==========================================

    // ==========================================
    // Total Invoice Value
    // ==========================================

    const totalInvoiceValue = invoices.reduce(
      (sum, invoice) => sum + (invoice.grandTotal || 0),
      0,
    );

    // ==========================================
    // Revenue Collected
    // ==========================================

    const payments = await require("../models/Payment")
      .find({
        user: userId,
      })
      .lean();

    const revenueCollected = payments.reduce(
      (sum, payment) => sum + payment.amount,
      0,
    );

    // ==========================================
    // Outstanding Amount
    // ==========================================

    const outstandingAmount = totalInvoiceValue - revenueCollected;

    // ==========================================
    // Recent Invoices
    // ==========================================

    const recentInvoices = await Invoice.find({
      user: userId,
    })
      .populate("customer", "customerName businessName")
      .sort({ createdAt: -1 })
      .limit(5);

    // ==========================================
    // Recent Customers
    // ==========================================

    const recentCustomers = await Customer.find({
      user: userId,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    // ==========================================
    // Upcoming Due Invoices
    // ==========================================

    const today = new Date();

    const upcomingDueInvoices = await Invoice.find({
      user: userId,
      dueDate: { $gte: today },
      paymentStatus: { $ne: "Paid" },
    })
      .populate("customer", "customerName businessName")
      .sort({ dueDate: 1 })
      .limit(5);

    // ==========================================
    // Invoice Status Chart
    // ==========================================

    const invoiceStatus = {
      paid: invoices.filter((i) => i.paymentStatus === "Paid").length,

      unpaid: invoices.filter((i) => i.paymentStatus === "Unpaid").length,

      partiallyPaid: invoices.filter(
        (i) => i.paymentStatus === "Partially Paid",
      ).length,
    };
    // ==========================================
    // Monthly Sales Chart
    // ==========================================

    const salesChart = await Invoice.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $group: {
          _id: {
            $month: "$invoiceDate",
          },
          total: {
            $sum: "$grandTotal",
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    const lowStockProducts = await Product.find({
      user: userId,
      $expr: {
        $lte: ["$stock", "$lowStockLimit"],
      },
    })
      .select("productName sku stock lowStockLimit")
      .limit(5);

    const recentActivities = [];

    // Recent Invoices
    const invoicesActivity = await Invoice.find({
      user: userId,
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("invoiceNumber createdAt");

    invoicesActivity.forEach((item) => {
      recentActivities.push({
        type: "invoice",
        title: `Invoice ${item.invoiceNumber} created`,
        createdAt: item.createdAt,
      });
    });

    // Recent Customers
    const customersActivity = await Customer.find({
      user: userId,
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("customerName businessName createdAt");

    customersActivity.forEach((item) => {
      recentActivities.push({
        type: "customer",
        title: `${item.customerName || item.businessName} added`,
        createdAt: item.createdAt,
      });
    });

    // Recent Products
    const productsActivity = await Product.find({
      user: userId,
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("productName createdAt");

    productsActivity.forEach((item) => {
      recentActivities.push({
        type: "product",
        title: `${item.productName} added`,
        createdAt: item.createdAt,
      });
    });

    recentActivities.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
    // ==========================================
    // Response
    // ==========================================

    res.status(200).json({
      success: true,

      stats: {
        totalCustomers: customers,
        totalProducts: products,
        totalInvoices: invoices.length,

        totalInvoiceValue,
        revenueCollected,
        outstandingAmount,
      },

      recentInvoices,
      recentCustomers,
      salesChart,
      invoiceStatus,
      lowStockProducts,
      upcomingDueInvoices,
      recentActivities,
    });
  } catch (error) {
    console.error("========== DASHBOARD ERROR ==========");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Export
// ==========================================

module.exports = {
  getDashboardStats,
};
