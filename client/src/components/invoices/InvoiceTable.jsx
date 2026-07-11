// ==========================================
// Imports
// ==========================================

import InvoiceRow from "./InvoiceRow";

import "../../styles/Invoices.css";

// ==========================================
// Invoice Table Component
// ==========================================

function InvoiceTable({ invoices, onView, onEdit, onDelete }) {
  
  return (
    <div className="invoice-table-wrapper">
      <table className="invoice-table">
        <thead>
          <tr>
            <th>Invoice No</th>
            <th>Customer</th>
            <th>Invoice Date</th>
            <th>Due Date</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {invoices.length === 0 ? (
            <tr>
              <td colSpan="7" className="invoice-table-empty">
                No invoices found.
              </td>
            </tr>
          ) : (
            invoices.map((invoice) => (
              <InvoiceRow
                key={invoice._id}
                invoice={invoice}
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

export default InvoiceTable;
