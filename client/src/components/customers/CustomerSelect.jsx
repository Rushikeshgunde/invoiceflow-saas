import "../../styles/Customers.css";

function CustomerSelect({
  label,
  name,
  register,
  options,
  error,
}) {
  return (
    <div className="form-group">
      <label htmlFor={name}>
        {label}
      </label>

      <select
        id={name}
        {...register(name)}
        className={error ? "input error-input" : "input"}
      >
        {options.map((item) => (
          <option
            key={item.value}
            value={item.value}
          >
            {item.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="error-text">
          {error.message}
        </p>
      )}
    </div>
  );
}

export default CustomerSelect;