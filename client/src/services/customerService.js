import api from "../api/axios";

// Get All Customers
export const getCustomers = async () => {
  const response = await api.get("/customers");
  return response.data;
};

// Get Single Customer
export const getCustomerById = async (id) => {
  const response = await api.get(`/customers/${id}`);
  return response.data;
};

// Create Customer
export const createCustomer = async (data) => {
  const response = await api.post("/customers", data);
  return response.data;
};

// Update Customer
export const updateCustomer = async (id, data) => {
  const response = await api.put(`/customers/${id}`, data);
  return response.data;
};

// Delete Customer
export const deleteCustomer = async (id) => {
  const response = await api.delete(`/customers/${id}`);
  return response.data;
};