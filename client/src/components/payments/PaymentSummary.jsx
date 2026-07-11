// // ==========================================
// // Imports
// // ==========================================

// import {
//   FaMoneyBillWave,
//   FaWallet,
//   FaCalendarAlt,
//   FaChartLine,
// } from "react-icons/fa";

// import "../../styles/PaymentSummaryCards.css";

// // ==========================================
// // Payment Summary Cards
// // ==========================================

// function PaymentSummary({ payments }) {
//   // ==========================================
//   // Calculations
//   // ==========================================

//   const totalPayments = payments.length;

//   const totalAmount = payments.reduce(
//     (sum, payment) => sum + (payment.amount || 0),
//     0
//   );

//   const currentMonth = new Date().getMonth();
//   const currentYear = new Date().getFullYear();

//   const thisMonthAmount = payments
//     .filter((payment) => {
//       const date = new Date(payment.paymentDate);

//       return (
//         date.getMonth() === currentMonth &&
//         date.getFullYear() === currentYear
//       );
//     })
//     .reduce((sum, payment) => sum + payment.amount, 0);

//   const averagePayment =
//     totalPayments > 0
//       ? Math.round(totalAmount / totalPayments)
//       : 0;

//   // ==========================================
//   // Cards
//   // ==========================================

//   const cards = [
//     {
//       title: "Total Payments",
//       value: totalPayments,
//       icon: <FaMoneyBillWave />,
//       className: "payment-card-blue",
//     },
//     {
//       title: "Amount Received",
//       value: `₹${totalAmount.toLocaleString()}`,
//       icon: <FaWallet />,
//       className: "payment-card-green",
//     },
//     {
//       title: "This Month",
//       value: `₹${thisMonthAmount.toLocaleString()}`,
//       icon: <FaCalendarAlt />,
//       className: "payment-card-orange",
//     },
//     {
//       title: "Average Payment",
//       value: `₹${averagePayment.toLocaleString()}`,
//       icon: <FaChartLine />,
//       className: "payment-card-purple",
//     },
//   ];

//   // ==========================================
//   // Render
//   // ==========================================

//   return (
//     <div className="payment-summary-grid">
//       {cards.map((card) => (
//         <div
//           key={card.title}
//           className={`payment-summary-card ${card.className}`}
//         >
//           <div className="payment-summary-icon">
//             {card.icon}
//           </div>

//           <div className="payment-summary-content">
//             <h4>{card.title}</h4>

//             <h2>{card.value}</h2>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default PaymentSummary;