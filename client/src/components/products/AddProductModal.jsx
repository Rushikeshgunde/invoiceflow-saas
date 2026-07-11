import { useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";

import ProductForm from "./ProductForm";

import "../../styles/Products.css";

function AddProductModal({
  open,
  onClose,
  refreshProducts,
  product,
}) {
  const modalRef = useRef(null);

  // ==========================================
  // Close on Escape
  // ==========================================

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

  // ==========================================
  // Close on Outside Click
  // ==========================================

  const handleOutsideClick = (e) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(e.target)
    ) {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div
      className="product-modal-overlay"
      onClick={handleOutsideClick}
    >
      <div
        className="product-modal"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="product-modal-header">
          <div>
            <h2>
              {product ? "Edit Product" : "Add Product"}
            </h2>

            <p>
              {product
                ? "Update product details."
                : "Create a new product."}
            </p>
          </div>

          <button
            className="modal-close-btn"
            onClick={onClose}
          >
            <FaTimes />
          </button>
        </div>

        <ProductForm
          onClose={onClose}
          refreshProducts={refreshProducts}
          product={product}
        />
      </div>
    </div>
  );
}

export default AddProductModal;


// ----------------------------------------------------------------------------

