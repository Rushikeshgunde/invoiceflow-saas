import "../../styles/Customers.css";

function CustomerInput({
  label,
  type = "text",
  name,
  register,
  error,
  required = false,
}) {
  return (
    <div className="form-group">
      <label htmlFor={name}>
        {label}
        {required && <span className="required">*</span>}
      </label>

      <input
        id={name}
        type={type}
        {...register(name)}
        className={error ? "input error-input" : "input"}
      />

      {error && <p className="error-text">{error.message}</p>}
    </div>
  );
}

export default CustomerInput;
