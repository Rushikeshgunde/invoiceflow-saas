
// import api from "./api";

// // ==========================================
// // Get All Payments
// // ==========================================

// export const getPayments = async () => {
//   const { data } = await api.get("/payments");

//   return data;
// };

// // ==========================================
// // Get Single Payment
// // ==========================================

// export const getPayment = async (id) => {
//   const { data } = await api.get(`/payments/${id}`);

//   return data;
// };

// // ==========================================
// // Create Payment
// // ==========================================

// export const createPayment = async (paymentData) => {
//   const { data } = await api.post(
//     "/payments",
//     paymentData
//   );

//   return data;
// };

// // ==========================================
// // Delete Payment
// // ==========================================

// export const deletePayment = async (id) => {
//   const { data } = await api.delete(
//     `/payments/${id}`
//   );

//   return data;
// };