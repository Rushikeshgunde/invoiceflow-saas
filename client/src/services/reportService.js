import api from "./api";

// ==========================================
// Revenue Report
// ==========================================

export const getRevenueReport = async () => {
  const { data } = await api.get("/reports/revenue");
  return data;
};

// ==========================================
// Invoice Report
// ==========================================

export const getInvoiceReport = async () => {
  const { data } = await api.get("/reports/invoices");
  return data;
};

// ==========================================
// Payment Report
// ==========================================

export const getPaymentReport = async () => {
  const { data } = await api.get("/reports/payments");
  return data;
};

// ==========================================
// Customer Report
// ==========================================

export const getCustomerReport = async () => {
  const { data } = await api.get("/reports/customers");
  return data;
};

// ==========================================
// Product Report
// ==========================================

export const getProductReport = async () => {
  const { data } = await api.get("/reports/products");
  return data;
};


export const getSummaryReport = async () => {
  const res = await api.get("/reports/summary");
  return res.data;
};