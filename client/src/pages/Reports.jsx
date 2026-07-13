import { useEffect, useState } from "react";

import {
  getSummaryReport,
  getRevenueReport,
  getInvoiceReport,
  getPaymentReport,
  getCustomerReport,
  getProductReport,
} from "../services/reportService";

import ReportSummary from "../components/reports/ReportSummary";
import RevenueChart from "../components/reports/RevenueChart";
import InvoiceChart from "../components/reports/InvoiceChart";
import PaymentMethodChart from "../components/reports/PaymentMethodChart";
// import ExportButtons from "../components/reports/ExportButtons";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// import * as XLSX from "xlsx";

// import { saveAs } from "file-saver";

import "../styles/Reports.css";
// import PageHeader from "../components/common/PageHeader";

// ==========================================
// Reports Page
// ==========================================

function Reports() {
  // ==========================================
  // States
  // ==========================================

  const [loading, setLoading] = useState(true);

  const [revenueReport, setRevenueReport] = useState(null);

  const [invoiceReport, setInvoiceReport] = useState(null);

  const [paymentReport, setPaymentReport] = useState(null);

  const [customerReport, setCustomerReport] = useState([]);

  const [productReport, setProductReport] = useState([]);

  // ==========================================
  // Load Reports
  // ==========================================

  const loadReports = async () => {
    try {
      setLoading(true);

      const [summary, revenue, invoices, payments, customers, products] =
        await Promise.all([
          getSummaryReport(),
          getRevenueReport(),
          getInvoiceReport(),
          getPaymentReport(),
          getCustomerReport(),
          getProductReport(),
        ]);

      // Summary endpoint has the aggregate totals (totalRevenue,
      // totalInvoices, totalPayments) that the individual report
      // endpoints don't provide on their own.
      const summaryData = summary?.summary || {};

      // RevenueChart expects `data.monthlyRevenue`, backend sends `revenue`
      setRevenueReport({
        totalRevenue: summaryData.totalRevenue || 0,
        monthlyRevenue: revenue?.revenue || [],
      });

      // InvoiceChart/ReportSummary expect flat fields, backend nests
      // them under `report`
      setInvoiceReport({
        totalInvoices: summaryData.totalInvoices || 0,
        ...(invoices?.report || {}),
      });

      // PaymentMethodChart expects flat "Cash"/"UPI"/etc keys, backend
      // nests them under `paymentMethods`
      setPaymentReport({
        totalPayments: summaryData.totalPayments || 0,
        ...(payments?.paymentMethods || {}),
      });

      setCustomerReport(customers?.customers || []);

      setProductReport(products?.products || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // First Load
  // ==========================================

  useEffect(() => {
    loadReports();
  }, []);

  // const handleExportPDF = () => {
  //   const doc = new jsPDF();

  //   doc.setFontSize(18);

  //   doc.text("InvoiceFlow Report", 14, 18);

  //   autoTable(doc, {
  //     startY: 30,

  //     head: [["Metric", "Value"]],

  //     body: [
  //       ["Revenue", revenueReport?.totalRevenue || 0],

  //       ["Invoices", invoiceReport?.totalInvoices || 0],

  //       ["Payments", paymentReport?.totalPayments || 0],
  //     ],
  //   });

  //   doc.save("InvoiceFlow-Report.pdf");
  // };

  // const handleExportExcel = () => {
  //   const data = [
  //     {
  //       Revenue: revenueReport?.totalRevenue,

  //       Invoices: invoiceReport?.totalInvoices,

  //       Payments: paymentReport?.totalPayments,
  //     },
  //   ];

  //   const worksheet = XLSX.utils.json_to_sheet(data);

  //   const workbook = XLSX.utils.book_new();

  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

  //   const excelBuffer = XLSX.write(workbook, {
  //     bookType: "xlsx",
  //     type: "array",
  //   });

  //   const file = new Blob([excelBuffer], {
  //     type: "application/octet-stream",
  //   });

  //   saveAs(file, "InvoiceFlow-Report.xlsx");
  // };

  // const handlePrint = () => {
  //   window.print();
  // };
  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return <div className="reports-loading">Loading Reports...</div>;
  }

  // ==========================================
  // Render
  // ==========================================

  return (
    <section className="reports-page">
      {/* Date Filter */}
    {/* <PageHeader  /> */}
      {/* <DateFilter /> */}

      {/* Export */}

      {/* <ExportButtons
        onExportPDF={handleExportPDF}
        onExportExcel={handleExportExcel}
        onPrint={handlePrint}
      /> */}

      {/* Summary */}

      <ReportSummary
        revenue={revenueReport}
        invoices={invoiceReport}
        payments={paymentReport}
        customers={customerReport}
        products={productReport}
      />

      {/* Charts */}

      <div className="reports-chart-grid">
        <RevenueChart data={revenueReport} />

        <InvoiceChart data={invoiceReport} />

        <PaymentMethodChart data={paymentReport} />
      </div>

      {/* Tables */}

      <div className="reports-table-grid">
        {/* <CustomerTable customers={customerReport} /> */}

        {/* <ProductTable products={productReport} /> */}
      </div>
    </section>
  );
}

export default Reports;
