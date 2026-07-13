import api from "./api";

// ==========================================
// Get All Invoices
// ==========================================

export const getInvoices = async () => {
  const { data } = await api.get("/invoices");
  return data;
};

// ==========================================
// Get Single Invoice
// ==========================================

export const getInvoiceById = async (id) => {
  const { data } = await api.get(`/invoices/${id}`);
  return data;
};

// ==========================================
// Create Invoice
// ==========================================

export const createInvoice = async (invoiceData) => {
  const { data } = await api.post("/invoices", invoiceData);
  return data;
};

// ==========================================
// Update Invoice
// ==========================================

export const updateInvoice = async (id, invoiceData) => {
  const { data } = await api.put(`/invoices/${id}`, invoiceData);
  return data;
};

// ==========================================
// Delete Invoice
// ==========================================

export const deleteInvoice = async (id) => {
  const { data } = await api.delete(`/invoices/${id}`);
  return data;
};