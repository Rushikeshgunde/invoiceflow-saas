// ==========================================
// Imports
// ==========================================

const Invoice = require("../models/Invoice");
const generateInvoiceNumber = require("../utils/generateInvoiceNumber");
const Company = require("../models/Company");


// ==========================================
// Create Invoice
// ==========================================



const createInvoice = async (req, res) => {
  try {
    const {
      customer,

      invoiceDate,

      dueDate,

      paymentStatus,

      items,

      subtotal,

      gstTotal,

      grandTotal,

      notes,
    } = req.body;

    // ==========================================
    // Generate Invoice Number
    // ==========================================

    const invoiceNumber = await generateInvoiceNumber();

//     console.log("========== INVOICE DATA ==========");
// console.log({
//   invoiceNumber,
//   customer,
//   invoiceDate,
//   dueDate,
//   paymentStatus,
//   items,
//   subtotal,
//   gstTotal,
//   grandTotal,
//   notes,
//   user: req.user.id,
// });

    // ==========================================
    // Save Invoice
    // ==========================================

    const invoice = await Invoice.create({
      invoiceNumber,

      customer,

      invoiceDate,

      dueDate,

      paymentStatus,

      items,

      subtotal,

      gstTotal,

      grandTotal,

      notes,

      user: req.user.id,
    });

    res.status(201).json({
      success: true,

      message: "Invoice created successfully.",

      invoice,
    });
  } catch (error) {
  // console.error("CREATE INVOICE ERROR");
  console.error(error);

  res.status(500).json({
    success: false,
    message: error.message,
    stack: error.stack,
  });
}
};

// ==========================================
// Get All Invoices
// ==========================================

const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({
      user: req.user.id,
    })
      .populate("customer", "customerName businessName")
      .populate("items.product", "productName sku")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: invoices.length,
      invoices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ==========================================
// Download Invoice PDF
// ==========================================

const downloadInvoicePDF = async (req, res) => {
  try {
    const invoice = await Invoice.findOne({
      _id: req.params.id,
      user: req.user.id,
    })
      .populate("customer")
      .populate("items.product");

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    const company = await Company.findOne({
      user: req.user.id,
    });

    generateInvoicePDF(invoice, company, res);

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




// ==========================================
// Delete 
// ==========================================

const deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    res.json({
      success: true,
      message: "Invoice deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// update invoice
// ==========================================

const updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    res.json({
      success: true,
      message: "Invoice updated successfully",
      invoice,
    });
  } catch (error) {
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
  createInvoice,
  getInvoices,
  deleteInvoice,
  updateInvoice,
  downloadInvoicePDF,
};
