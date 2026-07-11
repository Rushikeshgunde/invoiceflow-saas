import { FaPlus, FaSearch } from "react-icons/fa";

import "../../styles/Invoices.css";

function InvoiceToolbar({
  search,
  setSearch,
  status,
  setStatus,
  onAddInvoice,
}) {
  return (
    <div className="invoice-toolbar">
      <div className="invoice-toolbar-left">
        <div className="invoice-toolbar-search">
          <FaSearch className="invoice-toolbar-search-icon" />

          <input
            type="text"
            placeholder="Search invoice..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="invoice-toolbar-select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Overdue">Overdue</option>
          <option value="Draft">Draft</option>
        </select>
      </div>

      <button className="invoice-toolbar-add-btn" onClick={onAddInvoice}>
        <FaPlus />

        <span>Add Invoice</span>
      </button>
    </div>
  );
}

export default InvoiceToolbar;
