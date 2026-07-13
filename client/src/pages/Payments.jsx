// ==========================================
// Imports
// ==========================================

import { useState } from "react";

import "../styles/Payments.css";

import { usePayment } from "../context/PaymentContext";

import PaymentSummary from "../components/payments/PaymentSummary";
import PaymentFilter from "../components/payments/PaymentFilter";
import PaymentTable from "../components/payments/PaymentTable";
import PaymentModal from "../components/payments/PaymentModal";
import AddPaymentModal from "../components/payments/AddPaymentModal";
import EditPaymentModal from "../components/payments/EditPaymentModal";
import DeletePaymentModal from "../components/payments/DeletePaymentModal";

// ==========================================
// Payments Page
// ==========================================

function Payments() {
  const {
    payments,
    loading,
    removePayment,
  } = usePayment();

  // ==========================================
  // States
  // ==========================================

  const [search, setSearch] = useState("");
  const [method, setMethod] = useState("");

  const [selectedPayment, setSelectedPayment] = useState(null);

  const [showViewModal, setShowViewModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // ==========================================
  // Close All Modals
  // ==========================================

  const closeAllModals = () => {
    setShowViewModal(false);
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);

    setSelectedPayment(null);
  };

  // ==========================================
  // View Payment
  // ==========================================

  const handleView = (payment) => {
    closeAllModals();

    setSelectedPayment(payment);
    setShowViewModal(true);
  };

  // ==========================================
  // Edit Payment
  // ==========================================

  const handleEdit = (payment) => {
    closeAllModals();

    setSelectedPayment(payment);
    setShowEditModal(true);
  };

  // ==========================================
  // Delete Payment
  // ==========================================

  const handleDelete = (payment) => {
    closeAllModals();

    setSelectedPayment(payment);
    setShowDeleteModal(true);
  };

  // ==========================================
  // Confirm Delete
  // ==========================================

  const handleDeleteConfirm = async (id) => {
    const result = await removePayment(id);

    if (result.success) {
      closeAllModals();
    }
  };

  // ==========================================
  // Filter Payments
  // ==========================================

  const filteredPayments = payments.filter((payment) => {
    const invoice =
      payment.invoice?.invoiceNumber?.toLowerCase() || "";

    const customer =
      payment.customer?.customerName?.toLowerCase() ||
      payment.customer?.businessName?.toLowerCase() ||
      "";

    const matchesSearch =
      invoice.includes(search.toLowerCase()) ||
      customer.includes(search.toLowerCase());

    const matchesMethod =
      method === "" ||
      payment.paymentMethod === method;

    return matchesSearch && matchesMethod;
  });

  // ==========================================
  // Render
  // ==========================================

  return (
    <section className="payments-page">
      {/* Summary */}

      <PaymentSummary payments={payments} />

      {/* Filters */}

      <PaymentFilter
        search={search}
        setSearch={setSearch}
        method={method}
        setMethod={setMethod}
        onAddPayment={() => setShowAddModal(true)}
        onResetFilters={() => {
          setSearch("");
          setMethod("");
        }}
      />

      {/* Payment Table */}

      <PaymentTable
        payments={filteredPayments}
        loading={loading}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* View Payment */}

      <PaymentModal
        open={showViewModal}
        payment={selectedPayment}
        onClose={closeAllModals}
      />

      {/* Add Payment */}

      <AddPaymentModal
        open={showAddModal}
        onClose={closeAllModals}
      />

      {/* Edit Payment */}

      <EditPaymentModal
        open={showEditModal}
        payment={selectedPayment}
        onClose={closeAllModals}
      />

      {/* Delete Payment */}

      <DeletePaymentModal
        open={showDeleteModal}
        payment={selectedPayment}
        loading={loading}
        onClose={closeAllModals}
        onDelete={handleDeleteConfirm}
      />
    </section>
  );
}

export default Payments;