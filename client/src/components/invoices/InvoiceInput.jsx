// ==========================================
// Reusable Invoice Input Component
// ==========================================

import "../../styles/Invoices.css";

function InvoiceInput({
  label,
  name,
  type = "text",
  register,
  error,
  required = false,
  disabled = false,
}) {
  return (
    <div className="invoice-input-group">
      <label className="invoice-input-label">
        {label}

        {required && <span className="invoice-required">*</span>}
      </label>

      <input
        type={type}
        className={`invoice-input ${error ? "invoice-input-error" : ""}`}
        disabled={disabled}
        {...register(name)}
      />

      {error && <p className="invoice-error-text">{error.message}</p>}
    </div>
  );
}

export default InvoiceInput;
