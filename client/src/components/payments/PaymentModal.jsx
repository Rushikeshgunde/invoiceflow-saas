// // ==========================================
// // Imports
// // ==========================================

// import { FaTimes } from "react-icons/fa";

// import "../../styles/Payments.css";

// // ==========================================
// // Payment Modal
// // ==========================================

// function PaymentModal({ payment, onClose }) {
//   if (!payment) return null;

//   return (
//     <div className="payment-modal-overlay">
//       <div className="payment-modal">
//         {/* Header */}

//         <div className="payment-modal-header">
//           <h2>Payment Details</h2>

//           <button className="payment-modal-close" onClick={onClose}>
//             <FaTimes />
//           </button>
//         </div>

//         {/* Body */}

//         <div className="payment-modal-body">
//           <div className="payment-detail">
//             <span>Invoice</span>

//             <strong>{payment.invoice?.invoiceNumber || "-"}</strong>
//           </div>

//           <div className="payment-detail">
//             <span>Customer</span>

//             <strong>
//               {payment.invoice?.customer?.customerName ||
//                 payment.invoice?.customer?.businessName ||
//                 "-"}
//             </strong>
//           </div>

//           <div className="payment-detail">
//             <span>Amount</span>

//             <strong>₹{Number(payment.amount).toLocaleString()}</strong>
//           </div>

//           <div className="payment-detail">
//             <span>Payment Method</span>

//             <strong>{payment.paymentMethod}</strong>
//           </div>

//           <div className="payment-detail">
//             <span>Payment Date</span>

//             <strong>
//               {new Date(payment.paymentDate).toLocaleDateString("en-IN")}
//             </strong>
//           </div>

//           <div className="payment-detail">
//             <span>Reference No.</span>

//             <strong>{payment.referenceNumber || "-"}</strong>
//           </div>

//           <div className="payment-detail">
//             <span>Received By</span>

//             <strong>{payment.receivedBy || "-"}</strong>
//           </div>

//           <div className="payment-detail payment-notes">
//             <span>Notes</span>

//             <p>{payment.notes || "No notes available."}</p>
//           </div>
//         </div>

//         {/* Footer */}

//         <div className="payment-modal-footer">
//           <button className="payment-close-btn" onClick={onClose}>
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PaymentModal;
