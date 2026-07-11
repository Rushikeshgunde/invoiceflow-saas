// ==========================================
// Reusable Invoice Select Component
// ==========================================

import "../../styles/Invoices.css";

function InvoiceSelect({
  label,
  name,
  register,
  error,
  options,
  required = false,
}) {
  return (
    <div className="invoice-input-group">
      <label className="invoice-input-label">
        {label}

        {required && <span className="invoice-required">*</span>}
      </label>

      <select
        className={`invoice-input ${error ? "invoice-input-error" : ""}`}
        {...register(name)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <p className="invoice-error-text">{error.message}</p>}
    </div>
  );
}

export default InvoiceSelect;
