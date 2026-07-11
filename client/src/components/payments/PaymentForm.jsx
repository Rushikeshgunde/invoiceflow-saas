// // ==========================================
// // Imports
// // ==========================================

// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";

// import { createPayment, updatePayment } from "../../services/paymentService";

// import { getInvoices } from "../../services/invoiceService";

// import "../../styles/Payments.css";

// // ==========================================
// // Payment Form
// // ==========================================

// function PaymentForm({ open, payment, onClose, onSuccess }) {
//   const [invoices, setInvoices] = useState([]);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     defaultValues: {
//       invoice: "",
//       amount: "",
//       paymentDate: "",
//       paymentMethod: "Cash",
//       referenceNumber: "",
//       notes: "",
//     },
//   });

//   // ==========================================
//   // Load invoices
//   // ==========================================

//   useEffect(() => {
//     if (!open) return;

//     loadInvoices();
//   }, [open]);

//   const loadInvoices = async () => {
//     try {
//       const res = await getInvoices();

//       setInvoices(res.invoices || []);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // ==========================================
//   // Edit Mode
//   // ==========================================

//   useEffect(() => {
//     if (payment) {
//       reset({
//         invoice: payment.invoice?._id,
//         amount: payment.amount,
//         paymentDate: payment.paymentDate?.substring(0, 10),
//         paymentMethod: payment.paymentMethod,
//         referenceNumber: payment.referenceNumber || "",
//         notes: payment.notes || "",
//       });
//     } else {
//       reset({
//         invoice: "",
//         amount: "",
//         paymentDate: "",
//         paymentMethod: "Cash",
//         referenceNumber: "",
//         notes: "",
//       });
//     }
//   }, [payment, reset]);

//   // ==========================================
//   // Submit
//   // ==========================================

//   const onSubmit = async (data) => {
//     try {
//       if (payment) {
//         await updatePayment(payment._id, data);

//         toast.success("Payment updated successfully.");
//       } else {
//         await createPayment(data);

//         toast.success("Payment recorded successfully.");
//       }

//       onSuccess();
//     } catch (error) {
//       console.error(error);

//       toast.error(error.response?.data?.message || "Something went wrong.");
//     }
//   };

//   if (!open) return null;

//   return (
//     <div className="payment-modal-overlay">
//       <div className="payment-form-modal">
//         <div className="payment-modal-header">
//           <h2>{payment ? "Edit Payment" : "Record Payment"}</h2>

//           <button onClick={onClose} className="payment-form-close-btn">
//             ×
//           </button>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="payment-form">
//           {/* Invoice */}

//           <label>Invoice</label>

//           <select
//             {...register("invoice", {
//               required: "Invoice is required",
//             })}
//           >
//             <option value="">Select Invoice</option>

//             {invoices.map((invoice) => (
//               <option key={invoice._id} value={invoice._id}>
//                 {invoice.invoiceNumber}
//               </option>
//             ))}
//           </select>

//           <p>{errors.invoice?.message}</p>

//           {/* Amount */}

//           <label>Amount</label>

//           <input
//             type="number"
//             {...register("amount", {
//               required: "Amount is required",
//             })}
//           />

//           <p>{errors.amount?.message}</p>

//           {/* Payment Date */}

//           <label>Payment Date</label>

//           <input
//             type="date"
//             {...register("paymentDate", {
//               required: "Payment Date is required",
//             })}
//           />

//           <p>{errors.paymentDate?.message}</p>

//           {/* Method */}

//           <label>Payment Method</label>

//           <select {...register("paymentMethod")}>
//             <option>Cash</option>

//             <option>UPI</option>

//             <option>Bank Transfer</option>

//             <option>Cheque</option>

//             <option>Card</option>
//           </select>

//           {/* Reference */}

//           <label>Reference Number</label>

//           <input {...register("referenceNumber")} />

//           {/* Notes */}

//           <label>Notes</label>

//           <textarea rows="4" {...register("notes")} />

//           {/* Buttons */}

//           <div className="payment-form-actions">
//             <button
//               type="button"
//               className="payment-cancel-btn"
//               onClick={onClose}
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               className="payment-save-btn"
//               disabled={isSubmitting}
//             >
//               {payment ? "Update Payment" : "Save Payment"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default PaymentForm;
