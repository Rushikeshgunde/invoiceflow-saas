// ==========================================
// Imports
// ==========================================

import { FaPlus, FaSearch, FaUndo } from "react-icons/fa";
import "../../styles/Payments.css";

// ==========================================
// Payment Filters
// ==========================================

function PaymentFilter({
  search,
  setSearch,
  method,
  setMethod,
  onAddPayment,
  onResetFilters,
}) {
  return (
    <div className="payment-filters">

      {/* Search */}

      <div className="payment-filter-search">

        <FaSearch className="payment-search-icon" />

        <input
          type="text"
          placeholder="Search invoice or customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* Payment Method */}

      <select
        value={method}
        onChange={(e) => setMethod(e.target.value)}
      >
        <option value="">All Methods</option>

        <option value="Cash">Cash</option>

        <option value="UPI">UPI</option>

        <option value="Card">Card</option>

        <option value="Bank Transfer">
          Bank Transfer
        </option>

        <option value="Cheque">Cheque</option>
      </select>

      {/* Reset */}

      <button
        className="payment-reset-btn"
        onClick={onResetFilters}
      >
        <FaUndo />

        Reset
      </button>

      {/* Add Payment */}

      <button
        className="payment-add-btn"
        onClick={onAddPayment}
      >
        <FaPlus />

        Add Payment
      </button>

    </div>
  );
}

export default PaymentFilter;