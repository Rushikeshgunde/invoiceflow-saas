// ==========================================
// Imports
// ==========================================

import { createContext, useContext, useEffect, useState } from "react";

import { toast } from "react-toastify";

import {
  getPayments,
  createPayment,
  updatePayment,
  deletePayment,
} from "../services/paymentService";

// ==========================================
// Context
// ==========================================

const PaymentContext = createContext();

// ==========================================
// Provider
// ==========================================

export function PaymentProvider({ children }) {
  const [payments, setPayments] = useState([]);

  const [loading, setLoading] = useState(false);

  // ==========================================
  // Load Payments
  // ==========================================

  const loadPayments = async () => {
    try {
      setLoading(true);

      const res = await getPayments();

      setPayments(res.payments || []);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load payments.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Refresh
  // ==========================================

  const refreshPayments = async () => {
    await loadPayments();
  };

  // ==========================================
  // Add Payment
  // ==========================================

  const addPayment = async (paymentData) => {
    try {
      const res = await createPayment(paymentData);

      toast.success(res.message);

      await refreshPayments();

      return {
        success: true,
      };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to create payment.";

      toast.error(message);

      return {
        success: false,
      };
    }
  };

  // ==========================================
  // Update Payment
  // ==========================================

  const editPayment = async (id, paymentData) => {
    try {
      const res = await updatePayment(id, paymentData);

      toast.success(res.message);

      await refreshPayments();

      return {
        success: true,
      };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to update payment.";

      toast.error(message);

      return {
        success: false,
      };
    }
  };

  // ==========================================
  // Delete Payment
  // ==========================================

  const removePayment = async (id) => {
    try {
      const res = await deletePayment(id);

      toast.success(res.message);

      await refreshPayments();

      return {
        success: true,
      };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to delete payment.";

      toast.error(message);

      return {
        success: false,
      };
    }
  };

  // ==========================================
  // First Load
  // ==========================================

  useEffect(() => {
    loadPayments();
  }, []);

  return (
    <PaymentContext.Provider
      value={{
        payments,
        loading,

        refreshPayments,

        addPayment,
        editPayment,
        removePayment,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
}

// ==========================================
// Hook
// ==========================================

export const usePayment = () => useContext(PaymentContext);