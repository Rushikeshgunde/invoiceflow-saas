// ==========================================
// Imports
// ==========================================

import ExpenseRow from "./ExpenseRow";

import "../../styles/Expenses.css";

// ==========================================
// Expense Table Component
// ==========================================

function ExpenseTable({ expenses, loading, onView, onEdit, onDelete }) {
  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return <div className="expense-loading">Loading expenses...</div>;
  }

  // ==========================================
  // Render
  // ==========================================

  return (
    <div className="expense-table-wrapper">
      <table className="expense-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Title</th>
            <th>Category</th>
            <th>Vendor</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {expenses.length === 0 ? (
            <tr>
              <td colSpan="7" className="expense-table-empty">
                No expenses found.
              </td>
            </tr>
          ) : (
            expenses.map((expense) => (
              <ExpenseRow
                key={expense._id}
                expense={expense}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseTable;
