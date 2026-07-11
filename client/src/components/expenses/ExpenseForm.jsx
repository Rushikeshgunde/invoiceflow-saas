// ==========================================
// Imports
// ==========================================

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import "../../styles/Expenses.css";

// ==========================================
// Expense Form
// ==========================================

function ExpenseForm({ expense, onSubmit, onCancel }) {
  // ==========================================
  // React Hook Form
  // ==========================================

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      category: "",
      vendor: "",
      amount: "",
      paymentMethod: "",
      referenceNumber: "",
      expenseDate: "",
      status: "Paid",
      notes: "",
    },
  });

  // ==========================================
  // Edit Mode
  // ==========================================

  useEffect(() => {
    if (expense) {
      reset({
        ...expense,
        expenseDate: expense.expenseDate
          ? expense.expenseDate.substring(0, 10)
          : "",
      });
    } else {
      reset({
        title: "",
        category: "",
        vendor: "",
        amount: "",
        paymentMethod: "",
        referenceNumber: "",
        expenseDate: "",
        status: "Paid",
        notes: "",
      });
    }
  }, [expense, reset]);

  // ==========================================
  // Reset Form
  // ==========================================

  useEffect(() => {
    if (expense) {
      reset({
        ...expense,
        expenseDate: expense.expenseDate
          ? expense.expenseDate.substring(0, 10)
          : "",
      });
    } else {
      reset({
        title: "",
        category: "",
        vendor: "",
        amount: "",
        paymentMethod: "",
        referenceNumber: "",
        expenseDate: "",
        status: "Paid",
        notes: "",
      });
    }
  }, [expense, reset]);

  // ==========================================
  // Prevent Background Scroll
  // ==========================================

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // ==========================================
  // Close on ESC
  // ==========================================

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onCancel]);

  // ==========================================
  // Render
  // ==========================================

  return (
    <div className="expense-form-overlay" onClick={onCancel}>
      <div className="expense-form-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}

        <div className="expense-form-header">
          <h2>{expense ? "Edit Expense" : "Add Expense"}</h2>

          <button
            type="button"
            className="expense-form-close"
            onClick={onCancel}
          >
            ×
          </button>
        </div>

        <form className="expense-form" onSubmit={handleSubmit(onSubmit)}>
          {/* Expense Title */}

          <div className="expense-form-group">
            <label>Expense Title</label>
            <input
              autoFocus
              placeholder="Office Rent"
              {...register("title", {
                required: "Expense title is required",
              })}
            />
            {errors.title && (
              <small className="expense-error">{errors.title.message}</small>
            )}
          </div>

          {/* Category */}

          <div className="expense-form-group">
            <label>Category</label>

            <select
              {...register("category", { required: "Category is required" })}
            >
              <option value="">Select Category</option>

              <option value="Rent">Rent</option>

              <option value="Salary">Salary</option>

              <option value="Utilities">Utilities</option>

              <option value="Travel">Travel</option>

              <option value="Marketing">Marketing</option>

              <option value="Maintenance">Maintenance</option>

              <option value="Office">Office</option>

              <option value="Other">Other</option>
            </select>
            {errors.category && (
              <small className="expense-error">{errors.category.message}</small>
            )}
          </div>

          {/* Vendor */}

          <div className="expense-form-group">
            <label>Vendor</label>

            <input {...register("vendor")} placeholder="Vendor Name" />
          </div>

          {/* Amount */}

          <div className="expense-form-group">
            <label>Amount</label>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              {...register("amount", {
                required: "Amount is required",
                min: {
                  value: 1,
                  message: "Amount must be greater than 0",
                },
              })}
            />

            {errors.amount && (
              <small className="expense-error">{errors.amount.message}</small>
            )}
          </div>

          {/* Payment Method */}

          <div className="expense-form-group">
            <label>Payment Method</label>

            <select {...register("paymentMethod")}>
              <option value="">Select Method</option>

              <option value="Cash">Cash</option>

              <option value="UPI">UPI</option>

              <option value="Bank Transfer">Bank Transfer</option>

              <option value="Card">Card</option>

              <option value="Cheque">Cheque</option>
            </select>
          </div>

          {/* Reference Number */}

          <div className="expense-form-group">
            <label>Reference Number</label>

            <input
              {...register("referenceNumber")}
              placeholder="Transaction ID"
            />
          </div>

          {/* Expense Date */}

          <div className="expense-form-group">
            <label>Expense Date</label>
            <input
              type="date"
              {...register("expenseDate", {
                required: "Expense date is required",
              })}
            />{" "}
          </div>

          {/* Status */}

          <div className="expense-form-group">
            <label>Status</label>

            <select {...register("status")}>
              <option value="Paid">Paid</option>

              <option value="Pending">Pending</option>

              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Notes */}

          <div className="expense-form-group expense-full-width">
            <label>Notes</label>

            <textarea
              rows="4"
              {...register("notes")}
              placeholder="Enter notes..."
            />
          </div>

          {/* Actions */}

          <div className="expense-form-actions">
            <button
              type="button"
              className="expense-cancel-btn"
              onClick={onCancel}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="expense-save-btn"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Saving..."
                : expense
                  ? "Update Expense"
                  : "Save Expense"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ExpenseForm;
