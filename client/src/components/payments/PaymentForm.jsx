// ==========================================
// Imports
// ==========================================

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { usePayment } from "../../context/PaymentContext";
import { getInvoices } from "../../services/invoiceService";

import "../../styles/Payments.css";

// ==========================================
// Payment Form
// ==========================================

function PaymentForm({
  payment,
  onClose,
  onAdd,
  onUpdate,
}) {
  const { addPayment, editPayment } = usePayment();

  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    try {
      const res = await getInvoices();

      setInvoices(res.invoices || []);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load invoices.");
    }
  };

  // ==========================================
  // Edit Mode
  // ==========================================

  useEffect(() => {
    if (payment) {
      setFormData({
        invoice: payment.invoice?._id || "",
        amount: payment.amount || "",
        paymentDate: payment.paymentDate
          ? payment.paymentDate.slice(0, 10)
          : new Date().toISOString().split("T")[0],
        paymentMethod: payment.paymentMethod || "Cash",
        referenceNumber: payment.referenceNumber || "",
        notes: payment.notes || "",
      });
    }
  }, [payment]);

  // ==========================================
  // Handle Change
  // ==========================================

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ==========================================
  // Submit
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.invoice)
      return toast.error("Please select an invoice.");

    if (!formData.amount)
      return toast.error("Please enter payment amount.");

    if (Number(formData.amount) <= 0)
      return toast.error("Amount must be greater than zero.");

    try {
      setLoading(true);

      let result;

      if (payment) {
        result = await editPayment(payment._id, formData);

        if (result.success && onUpdate) {
          onUpdate();
        }
      } else {
        result = await addPayment(formData);

        if (result.success && onAdd) {
          onAdd();
        }
      }

      if (result.success) {
        onClose();
      }
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // JSX
  // ==========================================

  return (
    <form
      className="payment-form"
      onSubmit={handleSubmit}
    >
      {/* Invoice */}

      <div className="payment-form-group">
        <label>Invoice *</label>

        <select
          name="invoice"
          value={formData.invoice}
          onChange={handleChange}
          required
        >
          <option value="">Select Invoice</option>

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

      {/* Amount */}

      <div className="payment-form-group">
        <label>Amount *</label>

        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Enter payment amount"
          min="1"
          step="0.01"
          required
        />
      </div>

      {/* Payment Date */}

      <div className="payment-form-group">
        <label>Payment Date *</label>

        <input
          type="date"
          name="paymentDate"
          value={formData.paymentDate}
          onChange={handleChange}
          required
        />
      </div>

      {/* Payment Method */}

      <div className="payment-form-group">
        <label>Payment Method *</label>

        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
        >
          <option value="Cash">Cash</option>
          <option value="UPI">UPI</option>
          <option value="Card">Card</option>
          <option value="Bank Transfer">
            Bank Transfer
          </option>
          <option value="Cheque">Cheque</option>
        </select>
      </div>

      {/* Reference Number */}

      <div className="payment-form-group">
        <label>Reference Number</label>

        <input
          type="text"
          name="referenceNumber"
          value={formData.referenceNumber}
          onChange={handleChange}
          placeholder="Transaction / Cheque Number"
        />
      </div>

      {/* Notes */}

      <div className="payment-form-group">
        <label>Notes</label>

        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows="4"
          placeholder="Additional notes..."
        />
      </div>

      {/* Footer */}

      <div className="payment-form-actions">
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
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : payment
            ? "Update Payment"
            : "Save Payment"}
        </button>
      </div>
    </form>
  );
}

export default PaymentForm;