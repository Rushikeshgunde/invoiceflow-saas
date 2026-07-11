const Invoice = require("../models/Invoice");

const generateInvoiceNumber = async () => {
  const year = new Date().getFullYear();

  const lastInvoice = await Invoice.findOne()
    .sort({ createdAt: -1 });

  let nextNumber = 1;

  if (lastInvoice) {
    const last = parseInt(lastInvoice.invoiceNumber.split("-")[2], 10);
    nextNumber = last + 1;
  }

  return `INV-${year}-${String(nextNumber).padStart(5, "0")}`;
};

module.exports = generateInvoiceNumber;