// // ==========================================
// // Imports
// // ==========================================

// import { useEffect, useMemo, useState } from "react";

// import { toast } from "react-toastify";

// import PageHeader from "../components/common/PageHeader";
// import PaymentSummaryCards from "../components/payments/PaymentSummaryCards";
// import PaymentTable from "../components/payments/PaymentTable";
// import PaymentModal from "../components/payments/PaymentModal";
// import PaymentForm from "../components/payments/PaymentForm";

// import { getPayments, deletePayment } from "../services/paymentService";

// import "../styles/Payments.css";

// // ==========================================
// // Payments Page
// // ==========================================

// function Payments() {
//   const [payments, setPayments] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [selectedPayment, setSelectedPayment] = useState(null);
//   const [selectedEditPayment, setSelectedEditPayment] = useState(null);
//   const [showPaymentForm, setShowPaymentForm] = useState(false);

//   const handleView = (payment) => {
//     setSelectedPayment(payment);
//   };

//   const handleEdit = (payment) => {
//     setSelectedEditPayment(payment);
//     setShowPaymentForm(true);
//   };

//   // ==========================================
//   // Load Payments
//   // ==========================================

//   useEffect(() => {
//     loadPayments();
//   }, []);

//   const loadPayments = async () => {
//     try {
//       setLoading(true);

//       const res = await getPayments();

//       setPayments(res.payments || []);
//     } catch (error) {
//       console.error(error);

//       toast.error("Failed to load payments.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ==========================================
//   // Delete Payment
//   // ==========================================

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm("Delete this payment?");

//     if (!confirmDelete) return;

//     try {
//       await deletePayment(id);

//       toast.success("Payment deleted successfully.");

//       loadPayments();
//     } catch (error) {
//       console.error(error);

//       toast.error("Unable to delete payment.");
//     }
//   };

//   // ==========================================
//   // Search
// //   ==========================================

//   const filteredPayments = useMemo(() => {
//     return payments.filter((payment) => {
//       const invoice = payment.invoice?.invoiceNumber || "";

//       const customer = payment.invoice?.customer?.customerName || "";

//       return (
//         invoice.toLowerCase().includes(search.toLowerCase()) ||
//         customer.toLowerCase().includes(search.toLowerCase())
//       );
//     });
//   }, [payments, search]);

//   // ==========================================
//   // Render
//   // ==========================================

//   if (loading) {
//     return <div className="page-loader">Loading payments...</div>;
//   }

//   return (
//     <div className="payments-page">
//       <PageHeader
//         title="Payments"
//         subtitle="Manage customer payments"
//         buttonText="+ Record Payment"
//         onButtonClick={() => {
//           setSelectedEditPayment(null);
//           setShowPaymentForm(true);
//         }}
//       />

//       <PaymentModal
//         payment={selectedPayment}
//         onClose={() => setSelectedPayment(null)}
//       />

//       <PaymentForm
//         open={showPaymentForm}
//         payment={selectedEditPayment}
//         onClose={() => {
//           setShowPaymentForm(false);
//           setSelectedEditPayment(null);
//         }}
//         onSuccess={() => {
//           loadPayments();
//           setShowPaymentForm(false);
//           setSelectedEditPayment(null);
//         }}
//       />

//       <PaymentSummaryCards payments={payments} />

//       <div className="payments-toolbar">
//         <input
//           type="text"
//           placeholder="Search payment..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       <PaymentTable
//         payments={filteredPayments}
//         onView={handleView}
//         onEdit={handleEdit}
//         onDelete={handleDelete}
//       />
//     </div>
//   );
// }

// export default Payments;
