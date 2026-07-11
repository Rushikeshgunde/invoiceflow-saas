// ==========================================
// Imports
// ==========================================

import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

import "../../styles/Expenses.css";

// ==========================================
// Expense Row Component
// ==========================================

function ExpenseRow({ expense, onView, onEdit, onDelete }) {
  return (
    <tr>
      {/* Expense Date */}

      <td>{new Date(expense.expenseDate).toLocaleDateString("en-IN")}</td>

      {/* Expense Title */}

      <td>{expense.title}</td>

      {/* Category */}

      <td>{expense.category}</td>

      {/* Vendor */}

      <td>{expense.vendor || "-"}</td>

      {/* Amount */}

      <td>₹{Number(expense.amount || 0).toLocaleString("en-IN")}</td>

      {/* Status */}

      <td>
        <span
          className={`expense-status-badge ${expense.status
            ?.toLowerCase()
            .replace(/\s+/g, "-")}`}
        >
          {expense.status}
        </span>
      </td>

      {/* Actions */}

      <td className="expense-action-buttons">
        <button
          className="expense-action-btn expense-view-btn"
          title="View"
          onClick={() => onView(expense)}
        >
          <FaEye />
        </button>

        <button
          className="expense-action-btn expense-edit-btn"
          title="Edit"
          onClick={() => onEdit(expense)}
        >
          <FaEdit />
        </button>

        <button
          className="expense-action-btn expense-delete-btn"
          title="Delete"
          onClick={() => onDelete(expense._id)}
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}

export default ExpenseRow;
