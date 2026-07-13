// ==========================================
// Imports
// ==========================================

const Invoice = require("../models/Invoice");
const Payment = require("../models/Payment");
const Customer = require("../models/Customer");
const Product = require("../models/Product");
const mongoose = require("mongoose");

// ==========================================
// Summary
// ==========================================

// ==========================================
// Summary Report
// ==========================================

const getSummaryReport = async (req, res) => {
  try {
    // ==========================================
    // Revenue
    // ==========================================

    const payments = await Payment.find({
      user: req.user.id,
    }).lean();

    const totalRevenue = payments.reduce(
      (sum, payment) => sum + payment.amount,
      0,
    );

    // ==========================================
    // Invoices
    // ==========================================

    const invoices = await Invoice.find({
      user: req.user.id,
    })
      .select("paymentStatus")
      .lean();

    const totalInvoices = invoices.length;

    const paidInvoices = invoices.filter(
      (invoice) => invoice.paymentStatus === "Paid",
    ).length;

    const partialInvoices = invoices.filter(
      (invoice) => invoice.paymentStatus === "Partially Paid",
    ).length;

    const unpaidInvoices = invoices.filter(
      (invoice) => invoice.paymentStatus === "Unpaid",
    ).length;

    // ==========================================
    // Customers
    // ==========================================

    const totalCustomers = await Customer.countDocuments({
      user: req.user.id,
    });

    // ==========================================
    // Products
    // ==========================================

    const totalProducts = await Product.countDocuments({
      user: req.user.id,
    });

    // ==========================================
    // Payments
    // ==========================================

    const totalPayments = payments.length;

    // ==========================================
    // Response
    // ==========================================

    res.status(200).json({
      success: true,

      summary: {
        totalRevenue,

        totalInvoices,

        paidInvoices,

        partialInvoices,

        unpaidInvoices,

        totalCustomers,

        totalProducts,

        totalPayments,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Revenue Report
// ==========================================

const getRevenueReport = async (req, res) => {
  try {
    const revenue = await Payment.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.id),
          status: "Completed",
        },
      },

      {
        $group: {
          _id: {
            year: { $year: "$paymentDate" },
            month: { $month: "$paymentDate" },
          },

          revenue: {
            $sum: "$amount",
          },
        },
      },

      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const formattedRevenue = revenue.map((item) => ({
      year: item._id.year,
      month: months[item._id.month - 1],
      revenue: item.revenue,
    }));

    res.status(200).json({
      success: true,
      revenue: formattedRevenue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Invoice
// ==========================================

// ==========================================
// Invoice Report
// ==========================================

const getInvoiceReport = async (req, res) => {
  try {
    // ==========================================
    // Load Invoices
    // ==========================================

    const invoices = await Invoice.find({
      user: req.user.id,
    })
      .select("paymentStatus grandTotal")
      .lean();

    // ==========================================
    // Load Payments
    // ==========================================

    const payments = await Payment.find({
      user: req.user.id,
      status: "Completed",
    })
      .select("amount")
      .lean();

    // ==========================================
    // Invoice Counts
    // ==========================================

    const totalInvoices = invoices.length;

    const paidInvoices = invoices.filter(
      (invoice) => invoice.paymentStatus === "Paid",
    ).length;

    const partialInvoices = invoices.filter(
      (invoice) => invoice.paymentStatus === "Partially Paid",
    ).length;

    const unpaidInvoices = invoices.filter(
      (invoice) => invoice.paymentStatus === "Unpaid",
    ).length;

    // ==========================================
    // Total Invoice Amount
    // ==========================================

    const invoiceAmount = invoices.reduce(
      (sum, invoice) => sum + invoice.grandTotal,
      0,
    );

    // ==========================================
    // Paid Amount
    // ==========================================

    const paidAmount = payments.reduce(
      (sum, payment) => sum + payment.amount,
      0,
    );

    // ==========================================
    // Outstanding
    // ==========================================

    const outstandingAmount = invoiceAmount - paidAmount;

    // ==========================================
    // Response
    // ==========================================

    res.status(200).json({
      success: true,

      report: {
        totalInvoices,

        paidInvoices,

        partialInvoices,

        unpaidInvoices,

        invoiceAmount,

        paidAmount,

        outstandingAmount,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
// ==========================================
// Payment
// ==========================================

// ==========================================
// Payment Method Report
// ==========================================

const getPaymentReport = async (req, res) => {
  try {
    const payments = await Payment.find({
      user: req.user.id,
    }).lean();

    const report = {
      Cash: 0,
      UPI: 0,
      Card: 0,
      "Bank Transfer": 0,
      Cheque: 0,
    };

    payments.forEach((payment) => {
      if (report[payment.paymentMethod] !== undefined) {
        report[payment.paymentMethod] += payment.amount;
      }
    });

    res.status(200).json({
      success: true,
      paymentMethods: report,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ==========================================
// Customer
// ==========================================

const getCustomerReport = async (req, res) => {
  try {
    const customers = await Customer.find({
      user: req.user.id,
    }).lean();

    const invoices = await Invoice.find({
      user: req.user.id,
    }).lean();

    const payments = await Payment.find({
      user: req.user.id,
    }).lean();

    const report = customers.map((customer) => {
      // Customer Invoices
      const customerInvoices = invoices.filter(
        (invoice) => invoice.customer.toString() === customer._id.toString(),
      );

      // Total Invoice Amount
      const totalRevenue = customerInvoices.reduce(
        (sum, invoice) => sum + invoice.grandTotal,
        0,
      );

      // Total Paid
      const totalPaid = payments
        .filter(
          (payment) => payment.customer.toString() === customer._id.toString(),
        )
        .reduce((sum, payment) => sum + payment.amount, 0);

      return {
        _id: customer._id,

        customerName: customer.customerName || customer.businessName,

        totalInvoices: customerInvoices.length,

        totalRevenue,

        totalPaid,

        pendingAmount: totalRevenue - totalPaid,
      };
    });

    // Highest Revenue First
    report.sort((a, b) => b.totalRevenue - a.totalRevenue);

    res.status(200).json({
      success: true,
      customers: report,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ==========================================
// Product
// ==========================================

const getProductReport = async (req, res) => {
  try {
    // ==========================================
    // Fetch Products & Invoices
    // ==========================================

    const products = await Product.find({
      user: req.user.id,
    }).lean();

    const invoices = await Invoice.find({
      user: req.user.id,
    }).lean();

    // ==========================================
    // Build Product Report
    // ==========================================

    const report = products.map((product) => {
      let soldQuantity = 0;

      let revenue = 0;

      let totalInvoices = 0;

      invoices.forEach((invoice) => {
        invoice.items.forEach((item) => {
          if (
            item.product &&
            item.product.toString() === product._id.toString()
          ) {
            soldQuantity += item.quantity;

            revenue += item.total;

            totalInvoices++;
          }
        });
      });

      return {
        _id: product._id,

        productName: product.productName,

        sku: product.sku,

        stock: product.stock,

        soldQuantity,

        revenue,

        totalInvoices,
      };
    });

    // ==========================================
    // Highest Revenue First
    // ==========================================

    report.sort((a, b) => b.revenue - a.revenue);

    res.status(200).json({
      success: true,
      products: report,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ==========================================

module.exports = {
  getSummaryReport,
  getRevenueReport,
  getInvoiceReport,
  getPaymentReport,
  getCustomerReport,
  getProductReport,
};
