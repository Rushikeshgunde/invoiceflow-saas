// ==========================================
// Imports
// ==========================================

import { useState } from "react";

import { FaFilePdf, FaFileExcel, FaFileCsv } from "react-icons/fa";

import exportExpensePDF from "../../utils/exportExpensePDF";
import exportExpenseExcel from "../../utils/exportExpenseExcel";
import exportExpenseCSV from "../../utils/exportExpenseCSV";

import "../../styles/Expenses.css";

// ==========================================
// Expense Export Component
// ==========================================

function ExpenseExport({ expenses }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="expense-export">
      <button
        className="expense-export-btn"
        onClick={() => setShowMenu(!showMenu)}
      >
        Export ▼
      </button>

      {showMenu && (
        <div className="expense-export-menu">
          <button
            onClick={() => {
              exportExpensePDF(expenses);
              setShowMenu(false);
            }}
          >
            <FaFilePdf />
            PDF
          </button>

          <button
            onClick={() => {
              exportExpenseExcel(expenses);
              setShowMenu(false);
            }}
          >
            <FaFileExcel />
            Excel
          </button>

          <button
            onClick={() => {
              exportExpenseCSV(expenses);
              setShowMenu(false);
            }}
          >
            <FaFileCsv />
            CSV
          </button>
        </div>
      )}
    </div>
  );
}

export default ExpenseExport;
