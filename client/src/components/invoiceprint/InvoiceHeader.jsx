// ==========================================
// Invoice Header
// ==========================================

function InvoiceHeader() {
  return (
    <div className="invoice-header">
      <div className="invoice-header-left">
        <img src="/logo.png" alt="InvoiceFlow" className="invoice-logo" />
      </div>

      <div className="invoice-header-right">
        <h1>TAX INVOICE</h1>

        <h3>ORIGINAL COPY</h3>

        <p>For Recipient</p>
      </div>
    </div>
  );
}

export default InvoiceHeader;
