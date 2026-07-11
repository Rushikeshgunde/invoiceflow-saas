function ProductSelect({
  label,
  name,
  register,
  error,
  options,
  required = false,
}) {
  return (
    <div className="form-group">
      <label htmlFor={name}>
        {label}

        {required && <span className="required">*</span>}
      </label>

      <select
        id={name}
        className={`input ${error ? "input-error" : ""}`}
        {...register(name)}
      >
        <option value="">Select {label}</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <p className="error-text">{error.message}</p>}
    </div>
  );
}

export default ProductSelect;
