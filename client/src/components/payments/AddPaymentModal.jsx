// ==========================================
// Imports
// ==========================================

import { useEffect, useMemo, useState } from "react";

import { FaTimes } from "react-icons/fa";

import { getInvoices } from "../../services/invoiceService";

import { usePayment } from "../../context/PaymentContext";

import "../../styles/Payments.css";

// ==========================================
// Add Payment Modal
// ==========================================

function AddPaymentModal({ open, onClose }) {
  const { addPayment, payments } = usePayment();

  const [loading, setLoading] = useState(false);

  const [saving, setSaving] = useState(false);

  const [invoices, setInvoices] = useState([]);

  const [formData, setFormData] = useState({
    invoice: "",
    amount: "",
    paymentDate: new Date().toISOString().split("T")[0],
    paymentMethod: "Cash",
    referenceNumber: "",
    notes: "",
  });

  // ==========================================
  // Load Invoices
  // ==========================================

  const loadInvoices = async () => {
    try {
      setLoading(true);

      const res = await getInvoices();

      const unpaidInvoices =
        res.invoices?.filter(
          (invoice) => invoice.paymentStatus !== "Paid"
        ) || [];

      setInvoices(unpaidInvoices);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      loadInvoices();
    }
  }, [open]);

  // ==========================================
  // Selected Invoice
  // ==========================================

  const selectedInvoice = useMemo(() => {
    return invoices.find(
      (item) => item._id === formData.invoice
    );
  }, [formData.invoice, invoices]);

  // ==========================================
  // Total Paid
  // ==========================================

  const totalPaid = useMemo(() => {
    if (!selectedInvoice) return 0;

    return payments
      .filter(
        (payment) =>
          payment.invoice?._id === selectedInvoice._id
      )
      .reduce(
        (sum, payment) => sum + Number(payment.amount),
        0
      );
  }, [payments, selectedInvoice]);

  // ==========================================
  // Remaining Amount
  // ==========================================

  const remainingAmount = useMemo(() => {
    if (!selectedInvoice) return 0;

    return Number(
      (
        selectedInvoice.grandTotal - totalPaid
      ).toFixed(2)
    );
  }, [selectedInvoice, totalPaid]);

  // ==========================================
  // Handle Change
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

    // ==========================================
  // Submit
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);

    const result = await addPayment(formData);

    setSaving(false);

    if (result.success) {
      setFormData({
        invoice: "",
        amount: "",
        paymentDate: new Date().toISOString().split("T")[0],
        paymentMethod: "Cash",
        referenceNumber: "",
        notes: "",
      });

      onClose();
    }
  };

  if (!open) return null;

  return (
    <div className="payment-modal-overlay">
      <div className="payment-form-modal">
        {/* ========================================== */}
        {/* Header */}
        {/* ========================================== */}

        <div className="payment-modal-header">
          <h2>Add Payment</h2>

          <button
            className="payment-modal-close"
            onClick={onClose}
            type="button"
          >
            <FaTimes />
          </button>
        </div>

        {/* ========================================== */}
        {/* Form */}
        {/* ========================================== */}

        <form
          className="payment-form"
          onSubmit={handleSubmit}
        >
          {/* Invoice */}

          <div className="payment-form-group">
            <label>Select Invoice</label>

            <select
              name="invoice"
              value={formData.invoice}
              onChange={handleChange}
              required
              disabled={loading}
            >
              <option value="">
                -- Select Invoice --
              </option>

              {invoices.map((invoice) => (
                <option
                  key={invoice._id}
                  value={invoice._id}
                >
                  {invoice.invoiceNumber}
                </option>
              ))}
            </select>
          </div>

          {/* Customer */}

          {selectedInvoice && (
            <>
              <div className="payment-info-box">

                <div>
                  <span>Customer</span>

                  <strong>
                    {selectedInvoice.customer
                      ?.customerName ||
                      selectedInvoice.customer
                        ?.businessName}
                  </strong>
                </div>

                <div>
                  <span>Invoice Total</span>

                  <strong>
                    ₹
                    {Number(
                      selectedInvoice.grandTotal
                    ).toLocaleString()}
                  </strong>
                </div>

                <div>
                  <span>Already Paid</span>

                  <strong>
                    ₹
                    {Number(
                      totalPaid
                    ).toLocaleString()}
                  </strong>
                </div>

                <div>
                  <span>Remaining</span>

                  <strong className="remaining-amount">
                    ₹
                    {Number(
                      remainingAmount
                    ).toLocaleString()}
                  </strong>
                </div>
              </div>
            </>
          )}

          {/* Amount */}

          <div className="payment-form-group">
            <label>Payment Amount</label>

            <input
              type="number"
              name="amount"
              min="1"
              max={remainingAmount}
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>

          {/* Payment Date */}

          <div className="payment-form-group">
            <label>Payment Date</label>

            <input
              type="date"
              name="paymentDate"
              value={formData.paymentDate}
              onChange={handleChange}
              required
            />
          </div>

          {/* Method */}

          <div className="payment-form-group">
            <label>Payment Method</label>

            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
            >
              <option>Cash</option>
              <option>UPI</option>
              <option>Bank Transfer</option>
              <option>Card</option>
              <option>Cheque</option>
            </select>
          </div>

          {/* Reference */}

          <div className="payment-form-group">
            <label>Reference Number</label>

            <input
              type="text"
              name="referenceNumber"
              value={formData.referenceNumber}
              onChange={handleChange}
              placeholder="Optional"
            />
          </div>

          {/* Notes */}

          <div className="payment-form-group">
            <label>Notes</label>

            <textarea
              rows="4"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Additional notes..."
            />
          </div>

          {/* Footer */}

          <div className="payment-modal-footer">
            <button
              type="button"
              className="payment-cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="payment-save-btn"
              disabled={saving}
            >
              {saving ? "Saving..." : "Add Payment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPaymentModal;