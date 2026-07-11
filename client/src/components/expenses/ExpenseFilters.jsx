// ==========================================
// Imports
// ==========================================

import "../../styles/Expenses.css";

// ==========================================
// Expense Filter Component
// ==========================================

function ExpenseFilter({
  search,
  setSearch,
  category,
  setCategory,
  status,
  setStatus,
  paymentMethod,
  setPaymentMethod,
  onReset,
}) {
  return (
    <div className="expense-filter">
      {/* Search */}

      <input
        type="text"
        placeholder="Search expenses..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Category */}

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>

        <option value="Rent">Rent</option>

        <option value="Salary">Salary</option>

        <option value="Utilities">Utilities</option>

        <option value="Travel">Travel</option>

        <option value="Marketing">Marketing</option>

        <option value="Maintenance">Maintenance</option>

        <option value="Office">Office</option>

        <option value="Other">Other</option>
      </select>

      {/* Status */}

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">All Status</option>

        <option value="Paid">Paid</option>

        <option value="Pending">Pending</option>

        <option value="Cancelled">Cancelled</option>
      </select>

      {/* Payment Method */}

      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <option value="">All Methods</option>

        <option value="Cash">Cash</option>

        <option value="UPI">UPI</option>

        <option value="Bank Transfer">Bank Transfer</option>

        <option value="Card">Card</option>

        <option value="Cheque">Cheque</option>
      </select>

      {/* Reset */}

      <button type="button" className="expense-reset-btn" onClick={onReset}>
        Reset
      </button>
    </div>
  );
}

export default ExpenseFilter;
