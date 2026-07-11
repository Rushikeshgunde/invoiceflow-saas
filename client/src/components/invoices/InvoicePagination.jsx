// ==========================================
// Imports
// ==========================================

import "../../styles/Invoices.css";

// ==========================================
// Invoice Pagination
// ==========================================

function InvoicePagination({
  currentPage,
  totalPages,
  setCurrentPage,
}) {
  return (
    <div className="invoice-pagination">
      <button
        className="invoice-pagination-btn"
        disabled={currentPage === 1}
        onClick={() =>
          setCurrentPage((prev) => prev - 1)
        }
      >
        Previous
      </button>

      <span className="invoice-pagination-text">
        Page {currentPage} of {totalPages}
      </span>

      <button
        className="invoice-pagination-btn"
        disabled={currentPage === totalPages}
        onClick={() =>
          setCurrentPage((prev) => prev + 1)
        }
      >
        Next
      </button>
    </div>
  );
}

export default InvoicePagination;