
// import PaymentRow from "./PaymentRow";

// import "../../styles/Payments.css";

// // ==========================================
// // Payment Table
// // ==========================================

// function PaymentTable({ payments, onView, onEdit, onDelete }) {
//   return (
//     <div className="payment-table-wrapper">
//       <table className="payment-table">
//         <thead>
//           <tr>
//             <th>Invoice</th>
//             <th>Customer</th>
//             <th>Payment Date</th>
//             <th>Method</th>
//             <th>Amount</th>
//             <th>Reference</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {payments.length === 0 ? (
//             <tr>
//               <td colSpan="7" className="payment-table-empty">
//                 No payments found.
//               </td>
//             </tr>
//           ) : (
//             payments.map((payment) => (
//               <PaymentRow
//                 key={payment._id}
//                 payment={payment}
//                 onView={onView}
//                 onEdit={onEdit}
//                 onDelete={onDelete}
//               />
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default PaymentTable;
