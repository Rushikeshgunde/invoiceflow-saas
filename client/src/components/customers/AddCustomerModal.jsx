import { useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";

import CustomerForm from "./CustomerForm";

import "../../styles/Customers.css";

function AddCustomerModal({ open, onClose, refreshCustomers, customer }) {
  const modalRef = useRef(null);

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [open, onClose]);

  // Close on outside click
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div className="customer-modal-overlay" onClick={handleOutsideClick}>
      <div
        className="customer-modal"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="customer-modal-header">
          <div>
            <h2>{customer ? "Edit Customer" : "Add Customer"}</h2>

            <p>
              {customer ? "Update customer details." : "Create a new customer."}
            </p>
          </div>

          <button className="modal-close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <CustomerForm
          onClose={onClose}
          refreshCustomers={refreshCustomers}
          customer={customer}
        />
      </div>
    </div>
  );
}

export default AddCustomerModal;
