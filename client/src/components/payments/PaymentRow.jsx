// // ==========================================
// // Imports
// // ==========================================

// import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

// import "../../styles/Payments.css";

// // ==========================================
// // Payment Row
// // ==========================================

// function PaymentRow({ payment, onView, onEdit, onDelete }) {
//   return (
//     <tr>
//       {/* Invoice Number */}

//       <td>{payment.invoice?.invoiceNumber || "-"}</td>

//       {/* Customer */}

//       <td>
//         {payment.invoice?.customer?.customerName ||
//           payment.invoice?.customer?.businessName ||
//           "-"}
//       </td>

//       {/* Payment Date */}

//       <td>{new Date(payment.paymentDate).toLocaleDateString("en-IN")}</td>

//       {/* Payment Method */}

//       <td>
//         <span
//           className={`payment-method ${payment.paymentMethod
//             ?.toLowerCase()
//             .replace(/\s+/g, "-")}`}
//         >
//           {payment.paymentMethod}
//         </span>
//       </td>

//       {/* Amount */}

//       <td>₹{Number(payment.amount).toLocaleString()}</td>

//       {/* Reference */}

//       <td>{payment.referenceNumber || "-"}</td>

//       {/* Actions */}

//       <td className="payment-action-buttons">
//         <button
//           className="payment-action-btn payment-view-btn"
//           title="View"
//           onClick={() => onView(payment)}
//         >
//           <FaEye />
//         </button>

//         <button
//           className="payment-action-btn payment-edit-btn"
//           title="Edit"
//           onClick={() => onEdit(payment)}
//         >
//           <FaEdit />
//         </button>

//         <button
//           className="payment-action-btn payment-delete-btn"
//           title="Delete"
//           onClick={() => onDelete(payment._id)}
//         >
//           <FaTrash />
//         </button>
//       </td>
//     </tr>
//   );
// }

// export default PaymentRow;
