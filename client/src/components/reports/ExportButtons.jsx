
import { FaFilePdf, FaFileExcel, FaPrint } from "react-icons/fa";

import "../../styles/Reports.css";

// ==========================================
// Export Buttons
// ==========================================

function ExportButtons({ onExportPDF, onExportExcel, onPrint }) {
  return (
    <div className="report-export-buttons">
      <button className="report-pdf-btn" onClick={onExportPDF}>
        <FaFilePdf />
        Export PDF
      </button>

      <button className="report-excel-btn" onClick={onExportExcel}>
        <FaFileExcel />
        Export Excel
      </button>

      <button className="report-print-btn" onClick={onPrint}>
        <FaPrint />
        Print
      </button>
    </div>
  );
}

export default ExportButtons;
