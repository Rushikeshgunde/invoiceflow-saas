// ==========================================
// Imports
// ==========================================

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getInvoiceById } from "../services/invoiceService";

import InvoiceTemplate from "../components/invoicePrint/InvoiceTemplate";
import InvoiceActions from "../components/invoicePrint/InvoiceActions";
import "../styles/invoiceprint.css";

// ==========================================
// Invoice Preview
// ==========================================

function InvoicePreview() {
  const { id } = useParams();

  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    const loadInvoice = async () => {
      try {
        const res = await getInvoiceById(id);

        setInvoice(res.invoice);
      } catch (error) {
        console.error(error);
      }
    };

    loadInvoice();
  }, [id]);

  if (!invoice) {
    return <h2>Loading Invoice...</h2>;
  }

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {};

  const handleEmail = () => {};

  const handleShare = () => {};

  return (
    <section className="invoice-preview-page">
      <InvoiceActions
        onPrint={handlePrint}
        onDownload={handleDownload}
        onEmail={handleEmail}
        onShare={handleShare}
      />

      <InvoiceTemplate invoice={invoice} copyType="ORIGINAL" />
    </section>
  );
}

export default InvoicePreview;
