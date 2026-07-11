// -------------------------------------------------------------------------------------------

import InvoiceToolbar from "../components/invoices/InvoiceToolbar";
import { useState, useEffect, useMemo } from "react";
// ==========================================
// Import Invoice Table
// import invoicesData from "../data/invoices";

import { getInvoices, deleteInvoice } from "../services/invoiceService";

import { toast } from "react-toastify";
import InvoiceTable from "../components/invoices/InvoiceTable";
import InvoicePagination from "../components/invoices/InvoicePagination";
import AddInvoiceModal from "../components/invoices/AddInvoiceModal";
import ViewInvoiceModal from "../components/invoices/ViewInvoiceModal.jsx";
import "../styles/Invoices.css";

function Invoices() {
  // ==========================================
  // Invoice List State
  // ==========================================
  // CHANGE: was `const [invoices] = useState(invoicesData)` — the setter
  // was never destructured, so every call below to setInvoices() (in
  // handleAddInvoice, handleUpdateInvoice, handleDeleteInvoice) would
  // throw "setInvoices is not defined" the moment any of those ran.
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [viewInvoice, setViewInvoice] = useState(null);
  const [openViewModal, setOpenViewModal] = useState(false);

  const handleViewInvoice = (invoice) => {
    setViewInvoice(invoice);
    setOpenViewModal(true);
  };

  // ==========================================
  // Load Invoices
  // ==========================================

  // const loadInvoices = async () => {
  //   try {
  //     setLoading(true);

  //     const res = await getInvoices();

  //     setInvoices(Array.isArray(res.invoices) ? res.invoices : []);

  //     setError("");
  //   } catch (err) {
  //     setError(err.response?.data?.message || "Unable to load invoices.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const loadInvoices = async () => {
    try {
      setLoading(true);

      const res = await getInvoices();

      setInvoices(Array.isArray(res.invoices) ? res.invoices : []);

      setError("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Unable to load invoices.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInvoices();
  }, []);
  // ==========================================
  // Search & Filter States
  // ==========================================
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  // ==========================================
  // Pagination State
  // ==========================================
  const [currentPage, setCurrentPage] = useState(1);
  const invoicesPerPage = 5;

  // ==========================================
  // Add/Edit Invoice Modal State
  // ==========================================
  const [openModal, setOpenModal] = useState(false);

  // CHANGE: this state was missing entirely. The JSX below references
  // `selectedInvoice` and `setSelectedInvoice` (for onClose and for
  // passing the invoice being edited into the modal), but there was no
  // useState for it — another guaranteed ReferenceError on render.
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // ==========================================
  // Search + Status Filter
  // ==========================================
  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice) => {
      const invoiceNo = invoice.invoiceNumber || "";

      // Support populated customer object & plain string
      const customerName =
        typeof invoice.customer === "string"
          ? invoice.customer
          : invoice.customer?.customerName ||
            invoice.customer?.businessName ||
            "";

      const matchesSearch =
        invoiceNo.toLowerCase().includes(search.toLowerCase()) ||
        customerName.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        status === "All" || (invoice.paymentStatus || "") === status;

      return matchesSearch && matchesStatus;
    });
  }, [invoices, search, status]);

  // ==========================================
  // Pagination
  // ==========================================
  const totalPages = Math.ceil(filteredInvoices.length / invoicesPerPage);

  const currentInvoices = filteredInvoices.slice(
    (currentPage - 1) * invoicesPerPage,
    currentPage * invoicesPerPage,
  );

  // ==========================================
  // Reset Page When Filter Changes
  // ==========================================
  useEffect(() => {
    setCurrentPage(1);
  }, [search, status]);

  // ==========================================
  // Add Invoice Without Reload
  // ==========================================
  const handleAddInvoice = () => {
    loadInvoices();
  };

  // ==========================================
  // Update Invoice
  // ==========================================
  const handleUpdateInvoice = () => {
    loadInvoices();
  };

  // ==========================================
  // Delete Invoice
  // ==========================================

  const handleDeleteInvoice = async (id) => {
    if (!window.confirm("Delete this invoice?")) return;

    try {
      await deleteInvoice(id);

      setInvoices((prev) => prev.filter((item) => item._id !== id));

      toast.success("Invoice deleted successfully.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to delete invoice.");
    }
  };

  // ==========================================
  // Loading State
  // ==========================================
  if (loading) {
    return (
      <section className="invoices-page">
        <h2>Loading invoices...</h2>
      </section>
    );
  }

  // ==========================================
  // Error State
  // ==========================================
  if (error) {
    return (
      <section className="invoices-page">
        <h2>{error}</h2>
      </section>
    );
  }
  // console.log("Invoices State:", invoices);
  return (
    <section className="invoices-page">
      <div className="page-header">
        <h1>Invoices</h1>
        <p>Manage all customer invoices</p>
      </div>

      <InvoiceToolbar
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        onAddInvoice={() => {
          // CHANGE: clear any previously selected invoice before opening
          // in "add" mode, same pattern as Products' onAddProduct —
          // otherwise clicking "Add Invoice" right after editing one
          // could reopen the modal pre-filled with the last edited invoice.
          setSelectedInvoice(null);
          setOpenModal(true);
        }}
      />

      {/* =================// Invoice Table //======================== */}
      <InvoiceTable
        invoices={currentInvoices}
        onView={handleViewInvoice}
        onEdit={(invoice) => {
          setSelectedInvoice(invoice);
          setOpenModal(true);
        }}
        onDelete={handleDeleteInvoice}
      />

      {/* === Pagination=========== */}
      {filteredInvoices.length > 0 && (
        <InvoicePagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}

      {/*  ========= Add Invoice Modal ========================================== */}
      <AddInvoiceModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedInvoice(null);
        }}
        invoice={selectedInvoice}
        onAdd={handleAddInvoice}
        onUpdate={handleUpdateInvoice}
      />

      <ViewInvoiceModal
        open={openViewModal}
        onClose={() => {
          setOpenViewModal(false);
          setViewInvoice(null);
        }}
        invoice={viewInvoice}
      />
    </section>
  );
}

export default Invoices;
