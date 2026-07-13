const Payment = require("../models/Payment");
const Invoice = require("../models/Invoice");

const createNotification = require("../utils/createNotification");

// ==========================================
// Helper: validate payment amount
// (NaN-safe check shared by createPayment and updatePayment.
// Number(amount) <= 0 alone would silently pass when amount is
// undefined/invalid, because Number(undefined) is NaN and
// "NaN <= 0" is false.)
// ==========================================

const isInvalidAmount = (amount) =>
  amount === undefined ||
  amount === null ||
  isNaN(Number(amount)) ||
  Number(amount) <= 0;

// ==========================================
// Create Payment
// ==========================================

const createPayment = async (req, res) => {
  try {
    const {
      invoice,
      amount,
      paymentDate,
      paymentMethod,
      referenceNumber,
      notes,
    } = req.body;

    // ==========================================
    // Check Invoice
    // ==========================================
    // NOTE: invoiceData is later mutated (paymentStatus) and
    // .save()'d below — so this one is NOT .lean()'d.

    const invoiceData = await Invoice.findOne({
      _id: invoice,
      user: req.user.id,
    });

    if (!invoiceData) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found.",
      });
    }

    if (isInvalidAmount(amount)) {
      return res.status(400).json({
        success: false,
        message: "Payment amount must be a valid number greater than zero.",
      });
    }

    // ==========================================
    // Prevent Over Payment
    // ==========================================
    // ADDED: .lean() — this result is only read (summed), never
    // saved, so skipping Mongoose's document wrapper is safe and
    // faster.

    const existingPayments = await Payment.find({
      invoice,
      user: req.user.id,
    }).lean();

    const alreadyPaid = existingPayments.reduce(
      (sum, item) => sum + item.amount,
      0,
    );

    // Round to 2 decimals to avoid floating-point subtraction
    // artifacts (e.g. 99.999999999998 instead of 100), which could
    // incorrectly reject a valid full payment.
    const remainingAmount = Number(
      (invoiceData.grandTotal - alreadyPaid).toFixed(2),
    );

    if (Number(amount) > remainingAmount) {
      return res.status(400).json({
        success: false,
        message: `Payment cannot exceed remaining amount of ₹${remainingAmount}.`,
      });
    }

    // ==========================================
    // Save Payment
    // ==========================================

    const payment = await Payment.create({
      invoice,
      customer: invoiceData.customer,
      amount,
      paymentDate,
      paymentMethod,
      referenceNumber,
      notes,
      user: req.user.id,
    });

    // Create Notification
    await createNotification({
      user: req.user.id,
      title: "Payment Received",
      message: `₹${payment.amount} received successfully.`,
      type: "payment",
    });

    // ==========================================
    // Calculate Total Paid
    // ==========================================
    // ADDED: .lean() — read-only, used just for the sum below.

    const payments = await Payment.find({
      invoice,
      user: req.user.id,
    }).lean();

    // Keep totalPaid as a NUMBER (not .toFixed() string) so the
    // comparisons below stay purely numeric.
    const totalPaid = payments.reduce((sum, item) => sum + item.amount, 0);

    // ==========================================
    // Update Invoice Status
    // ==========================================

    if (totalPaid >= invoiceData.grandTotal) {
      invoiceData.paymentStatus = "Paid";
    } else if (totalPaid > 0) {
      invoiceData.paymentStatus = "Partially Paid";
    } else {
      invoiceData.paymentStatus = "Unpaid";
    }

    await invoiceData.save();

    res.status(201).json({
      success: true,
      message: "Payment added successfully.",
      payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Get Payments
// ==========================================
// ADDED: .lean() — the result only goes straight into the JSON
// response, never saved or mutated, so lean is safe here too.

const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find({
      user: req.user.id,
    })
      .populate("invoice", "invoiceNumber grandTotal paymentStatus")
      .populate("customer", "customerName businessName")
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: payments.length,
      payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Get Single Payment
// ==========================================
// ADDED: .lean() — also read-only, sent straight to the client.

const getPayment = async (req, res) => {
  try {
    const payment = await Payment.findOne({
      _id: req.params.id,
      user: req.user.id,
    })
      .populate("invoice")
      .populate("customer")
      .lean();

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found.",
      });
    }

    res.status(200).json({
      success: true,
      payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Update Payment
// ==========================================

const updatePayment = async (req, res) => {
  try {
    const {
      invoice,
      amount,
      paymentDate,
      paymentMethod,
      referenceNumber,
      notes,
    } = req.body;

    // ==========================================
    // Find Payment
    // ==========================================
    // NOTE: this `payment` doc is mutated and .save()'d further
    // below — so it is NOT .lean()'d.

    const payment = await Payment.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found.",
      });
    }

    // ==========================================
    // Check Invoice
    // ==========================================
    // NOTE: invoiceData is mutated and .save()'d below — NOT lean.

    const invoiceData = await Invoice.findOne({
      _id: invoice,
      user: req.user.id,
    });

    if (!invoiceData) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found.",
      });
    }

    // Same amount validation used in createPayment — a payment
    // could otherwise be updated to 0, negative, or NaN.
    if (isInvalidAmount(amount)) {
      return res.status(400).json({
        success: false,
        message: "Payment amount must be a valid number greater than zero.",
      });
    }

    // ==========================================
    // Prevent Over Payment
    // ==========================================
    // ADDED: .lean() — read-only, used just for the sum below.

    const existingPayments = await Payment.find({
      invoice,
      user: req.user.id,
      _id: { $ne: payment._id },
    }).lean();

    const totalPaidBeforeUpdate = existingPayments.reduce(
      (sum, item) => sum + item.amount,
      0,
    );

    // Round to 2 decimals to avoid floating-point precision issues.
    const remainingAmount = Number(
      (invoiceData.grandTotal - totalPaidBeforeUpdate).toFixed(2),
    );

    if (Number(amount) > remainingAmount) {
      return res.status(400).json({
        success: false,
        message: `Payment cannot exceed remaining amount of ₹${remainingAmount}.`,
      });
    }

    // ==========================================
    // Update Payment
    // ==========================================

    payment.invoice = invoice;
    payment.customer = invoiceData.customer;
    payment.amount = amount;
    payment.paymentDate = paymentDate;
    payment.paymentMethod = paymentMethod;
    payment.referenceNumber = referenceNumber;
    payment.notes = notes;

    await payment.save();

    // ==========================================
    // Recalculate Invoice Status
    // ==========================================
    // ADDED: .lean() — read-only, used just for the sum below.

    const payments = await Payment.find({
      invoice,
      user: req.user.id,
    }).lean();

    const totalPaidAfterUpdate = payments.reduce(
      (sum, item) => sum + item.amount,
      0,
    );

    if (totalPaidAfterUpdate >= invoiceData.grandTotal) {
      invoiceData.paymentStatus = "Paid";
    } else if (totalPaidAfterUpdate > 0) {
      invoiceData.paymentStatus = "Partially Paid";
    } else {
      invoiceData.paymentStatus = "Unpaid";
    }

    await invoiceData.save();

    // ==========================================
    // Notification
    // ==========================================

    await createNotification({
      user: req.user.id,
      title: "Payment Updated",
      message: `Payment of ₹${payment.amount} has been updated.`,
      type: "payment",
    });

    res.status(200).json({
      success: true,
      message: "Payment updated successfully.",
      payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Delete Payment
// ==========================================

const deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found.",
      });
    }

    await createNotification({
      user: req.user.id,
      title: "Payment Deleted",
      message: `Payment of ₹${payment.amount} was deleted.`,
      type: "payment",
    });

    // ==========================================
    // Recalculate Invoice Payment Status
    // ==========================================
    // NOTE: `invoice` is mutated and .save()'d below — NOT lean.

    const invoice = await Invoice.findOne({
      _id: payment.invoice,
      user: req.user.id,
    });

    if (invoice) {
      // ADDED: .lean() — read-only, used just for the sum below.
      const payments = await Payment.find({
        invoice: payment.invoice,
        user: req.user.id,
      }).lean();

      const totalPaid = payments.reduce((sum, item) => sum + item.amount, 0);

      if (totalPaid >= invoice.grandTotal) {
        invoice.paymentStatus = "Paid";
      } else if (totalPaid > 0) {
        invoice.paymentStatus = "Partially Paid";
      } else {
        invoice.paymentStatus = "Unpaid";
      }

      await invoice.save();
    }

    res.status(200).json({
      success: true,
      message: "Payment deleted successfully.",
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
  createPayment,
  getPayments,
  getPayment,
  updatePayment,
  deletePayment,
};
