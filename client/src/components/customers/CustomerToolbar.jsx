import "../../styles/Customers.css";
import { CSVLink } from "react-csv";

function CustomerToolbar({
  search,
  setSearch,
  status,
  setStatus,
  onAddCustomer,
  customers,
}) {
  const csvData = customers.map((customer) => ({
    Name: customer.customerName,
    Business: customer.businessName,
    Email: customer.email,
    Phone: customer.phone,
    GST: customer.gstNumber,
    PAN: customer.panNumber,
    City: customer.city,
    State: customer.state,
    Status: customer.status,
  }));

  return (
    <div className="customer-toolbar">
      <div className="customer-search">
        <input
          type="text"
          placeholder="Search Customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="customer-actions">
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button onClick={onAddCustomer}>+ Add Customer</button>

        <CSVLink data={csvData} filename="customers.csv" className="export-btn">
          Export CSV
        </CSVLink>
      </div>
    </div>
  );
}

export default CustomerToolbar;
