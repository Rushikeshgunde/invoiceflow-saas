// // ==========================================
// // Imports
// // ==========================================

// const Payment = require("../models/Payment");
// const Invoice = require("../models/Invoice");

// // ==========================================
// // Create Payment
// // ==========================================

// const createPayment = async (req, res) => {
//   try {
//     const {
//       invoice,
//       amount,
//       paymentDate,
//       paymentMethod,
//       referenceNumber,
//       notes,
//     } = req.body;

//     // ==========================================
//     // Check Invoice
//     // ==========================================

//     const invoiceData = await Invoice.findOne({
//       _id: invoice,
//       user: req.user.id,
//     });

//     if (!invoiceData) {
//       return res.status(404).json({
//         success: false,
//         message: "Invoice not found.",
//       });
//     }

//     // ==========================================
//     // Save Payment
//     // ==========================================

//     const payment = await Payment.create({
//       invoice,
//       customer: invoiceData.customer,
//       amount,
//       paymentDate,
//       paymentMethod,
//       referenceNumber,
//       notes,
//       user: req.user.id,
//     });

//     // ==========================================
//     // Calculate Total Paid
//     // ==========================================

//     const payments = await Payment.find({
//       invoice,
//     });

//     const totalPaid = payments.reduce(
//       (sum, item) => sum + item.amount,
//       0
//     );

//     // ==========================================
//     // Update Invoice Status
//     // ==========================================

//     if (totalPaid >= invoiceData.grandTotal) {
//       invoiceData.paymentStatus = "Paid";
//     } else if (totalPaid > 0) {
//       invoiceData.paymentStatus = "Partially Paid";
//     } else {
//       invoiceData.paymentStatus = "Unpaid";
//     }

//     await invoiceData.save();

//     res.status(201).json({
//       success: true,
//       message: "Payment added successfully.",
//       payment,
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ==========================================
// // Get Payments
// // ==========================================

// const getPayments = async (req, res) => {
//   try {
//     const payments = await Payment.find({
//       user: req.user.id,
//     })
//       .populate("invoice", "invoiceNumber grandTotal")
//       .populate("customer", "customerName businessName")
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       count: payments.length,
//       payments,
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ==========================================
// // Get Single Payment
// // ==========================================

// const getPayment = async (req, res) => {
//   try {
//     const payment = await Payment.findOne({
//       _id: req.params.id,
//       user: req.user.id,
//     })
//       .populate("invoice")
//       .populate("customer");

//     if (!payment) {
//       return res.status(404).json({
//         success: false,
//         message: "Payment not found.",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       payment,
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ==========================================
// // Delete Payment
// // ==========================================

// const deletePayment = async (req, res) => {
//   try {

//     const payment = await Payment.findOneAndDelete({
//       _id: req.params.id,
//       user: req.user.id,
//     });

//     if (!payment) {
//       return res.status(404).json({
//         success: false,
//         message: "Payment not found.",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Payment deleted successfully.",
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ==========================================
// // Exports
// // ==========================================

// module.exports = {
//   createPayment,
//   getPayments,
//   getPayment,
//   deletePayment,
// };