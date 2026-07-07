import { useEffect, useMemo, useState } from "react";

import CustomerToolbar from "../components/customers/CustomerToolbar";
import CustomerTable from "../components/customers/CustomerTable";
import CustomerPagination from "../components/customers/CustomerPagination";
import AddCustomerModal from "../components/customers/AddCustomerModal";
import { successToast, errorToast } from "../utils/toast";

// import customersData from "../data/customers";
import { getCustomers, deleteCustomer } from "../services/customerService";

import "../styles/Customers.css";

function Customers() {
  // Modal
  const [openModal, setOpenModal] = useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  // API Data
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 5;

  // ---------------------------------------------------------------------------------
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  // -------------------------------------------------------------------------
  //view model
  const [viewCustomer, setViewCustomer] = useState(null);
  const [openViewModal, setOpenViewModal] = useState(false);

  const handleView = (customer) => {
    setViewCustomer(customer);
    setOpenViewModal(true);
  };
  // ============================
  // Fetch Customers
  // ============================
  const loadCustomers = async () => {
    try {
      setLoading(true);

      const res = await getCustomers();

      setCustomers(res.customers);

      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  // ============================
  // Search + Status Filter
  // ============================
  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch =
        customer.customerName?.toLowerCase().includes(search.toLowerCase()) ||
        customer.email?.toLowerCase().includes(search.toLowerCase()) ||
        customer.phone?.includes(search);

      const matchesStatus = status === "All" || customer.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [customers, search, status]);

  // ============================
  // Reset Pagination on Filter
  // ============================

  useEffect(() => {
    setCurrentPage(1);
  }, [search, status]);

  // Pagination
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

  const currentCustomers = filteredCustomers.slice(
    (currentPage - 1) * customersPerPage,
    currentPage * customersPerPage,
  );

  //-----------------delete data-----------------------------
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?",
    );

    if (!confirmDelete) return;

    try {
      await deleteCustomer(id);
      successToast("Customer deleted successfully.");
      loadCustomers();
    } catch (err) {
      errorToast(err.response?.data?.message || "Delete failed.");
    }
  };
  //----------------------------------------------

  // ============================
  // Loading State
  // ============================

  if (loading) {
    return (
      <section className="customers-page">
        <div className="loading-state">
          <h3>Loading Customers...</h3>
        </div>
      </section>
    );
  }

  // ============================
  // Error State
  // ============================

  if (error) {
    return (
      <section className="customers-page">
        <div className="error-state">
          <h3>{error}</h3>
        </div>
      </section>
    );
  }

  return (
    <section className="customers-page">
      <div className="page-header">
        <h1>Customers</h1>
        <p>Manage your customer records</p>
      </div>

      <CustomerToolbar
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        onAddCustomer={() => setOpenModal(true)}
        customers={filteredCustomers}
      />

      <CustomerTable
        customers={currentCustomers}
        onEdit={(customer) => {
          setSelectedCustomer(customer);
          setOpenModal(true);
        }}
        onView={handleView}
        onDelete={handleDelete}
      />

      {filteredCustomers.length > 0 && (
        <CustomerPagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}

      <AddCustomerModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedCustomer(null);
        }}
        refreshCustomers={loadCustomers}
        customer={selectedCustomer}
      />

      {openViewModal && (
        <div
          className="view-modal-overlay"
          onClick={() => setOpenViewModal(false)}
        >
          <div className="view-modal" onClick={(e) => e.stopPropagation()}>
            <div className="view-modal-header">
              <div className="view-modal-identity">
                <div className="view-avatar">
                  {viewCustomer.customerName?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2>{viewCustomer.customerName}</h2>
                  <p>{viewCustomer.businessName}</p>
                </div>
              </div>
              <button
                className="view-close-btn"
                onClick={() => setOpenViewModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="view-modal-body">
              <span
                className={`view-status-badge ${viewCustomer.status?.toLowerCase()}`}
              >
                {viewCustomer.status}
              </span>

              <div className="view-section">
                <h4>Contact</h4>
                <div className="view-grid">
                  <div className="view-field">
                    <span className="view-label">Email</span>
                    <span className="view-value">{viewCustomer.email}</span>
                  </div>
                  <div className="view-field">
                    <span className="view-label">Phone</span>
                    <span className="view-value">{viewCustomer.phone}</span>
                  </div>
                </div>
              </div>

              <div className="view-section">
                <h4>Business Details</h4>
                <div className="view-grid">
                  <div className="view-field">
                    <span className="view-label">GST Number</span>
                    <span className="view-value">{viewCustomer.gstNumber}</span>
                  </div>
                  <div className="view-field">
                    <span className="view-label">PAN Number</span>
                    <span className="view-value">{viewCustomer.panNumber}</span>
                  </div>
                </div>
              </div>

              <div className="view-section">
                <h4>Location</h4>
                <div className="view-grid">
                  <div className="view-field">
                    <span className="view-label">City</span>
                    <span className="view-value">{viewCustomer.city}</span>
                  </div>
                  <div className="view-field">
                    <span className="view-label">State</span>
                    <span className="view-value">{viewCustomer.state}</span>
                  </div>
                  <div className="view-field view-field-full">
                    <span className="view-label">Address</span>
                    <span className="view-value">{viewCustomer.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Customers;
