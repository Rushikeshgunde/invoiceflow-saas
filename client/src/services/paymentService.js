import api from "./api";

export const getPayments = async () => {
  const { data } = await api.get("/payments");
  return data;
};

export const createPayment = async (payment) => {
  const { data } = await api.post("/payments", payment);
  return data;
};

export const updatePayment = async (id, payment) => {
  const { data } = await api.put(`/payments/${id}`, payment);
  return data;
};

export const deletePayment = async (id) => {
  const { data } = await api.delete(`/payments/${id}`);
  return data;
};