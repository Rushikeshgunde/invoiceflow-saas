import { FaFilePdf } from "react-icons/fa6";
import { toast } from "react-toastify";

import generateInvoicePDF from "../../utils/generateInvoicePDF";
import { getCompany } from "../../services/companyService";

import "../../styles/Invoices.css";

function InvoicePDFButton({ invoice }) {
  const handleDownload = async () => {
    try {
      const res = await getCompany();

       console.log("Company Response:", res);
    console.log("Company:", res.company);
    // console.log(res);

      generateInvoicePDF(invoice, res.company);
    } catch (error) {
      console.error(error);

      toast.error("Unable to generate PDF.");
    }
  };

  return (
    <button
      type="button"
      className="invoice-pdf-btn"
      onClick={handleDownload}
    >
      <FaFilePdf />

      <span>Download PDF</span>
    </button>
  );
}

export default InvoicePDFButton;