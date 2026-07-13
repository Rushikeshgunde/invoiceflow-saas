// ==========================================
// Imports
// ==========================================

import InvoiceHeader from "./InvoiceHeader";
import CompanySection from "./CompanySection";
import CustomerSection from "./CustomerSection";
// import InvoiceItemTable from "./InvoiceItemTable";
import InvoiceItemsTable from "./InvoiceItemsTable";
import InvoiceTotals from "./InvoiceTotals";
// import PaymentInfo from "./PaymentInfo";
import InvoicePaymentInfo from "./InvoicePaymentInfo";
import InvoiceNotes from "./InvoiceNotes";
// import SignatureSection from "./SignatureSection";
import InvoiceSignature from "./InvoiceSignature"
import InvoiceCopy from "./InvoiceCopy";
import "../../styles/invoiceprint.css";
// ==========================================
// Invoice Template
// ==========================================

function InvoiceTemplate({ invoice, copyType = "ORIGINAL" }) {
  return (
    <div className="invoice-template">
      <InvoiceCopy type={copyType} />
      <InvoiceHeader />
      <CompanySection invoice={invoice} />
      <CustomerSection invoice={invoice} />
      <InvoiceItemsTable invoice={invoice} />
      <InvoiceTotals invoice={invoice} />

      <InvoicePaymentInfo invoice={invoice} />

      <InvoiceNotes invoice={invoice} />
      <InvoiceSignature />
    </div>
  );
}

export default InvoiceTemplate;
