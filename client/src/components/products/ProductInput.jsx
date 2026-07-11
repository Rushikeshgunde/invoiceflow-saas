// function ProductInput({
//   label,
//   name,
//   type = "text",
//   register,
//   error,
//   required = false,
// }) {
//   return (
//     <div className="form-group">
//       <label htmlFor={name}>
//         {label}

//         {required && <span className="required">*</span>}
//       </label>

//       <input
//         id={name}
//         type={type}
//         className={`input ${error ? "input-error" : ""}`}
//         {...register(name)}
//       />

//       {error && <p className="error-text">{error.message}</p>}
//     </div>
//   );
// }

// export default ProductInput;
// ---------------------------------------------------------------------------------

function ProductInput({
  label,
  name,
  type = "text",
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
        className={`input ${error ? "input-error" : ""}`}
        // CHANGE: number inputs change value on mouse-wheel scroll by
        // default in Chrome/Edge when focused. Since this modal scrolls
        // (long form), scrolling over a focused number field was
        // incrementing/decrementing stock, price, gst, etc. Blurring the
        // input on wheel stops the browser from treating scroll as a
        // spinner interaction. This is applied automatically here so
        // every number field (stock, purchasePrice, sellingPrice,
        // lowStock, and any future ones) is covered without needing to
        // pass onWheel manually from ProductForm each time.
        onWheel={type === "number" ? (e) => e.target.blur() : undefined}
        {...register(name)}
      />

      {error && <p className="error-text">{error.message}</p>}
    </div>
  );
}

export default ProductInput;
