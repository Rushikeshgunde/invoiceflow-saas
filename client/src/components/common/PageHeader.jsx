// src/components/common/PageHeader.jsx

import "../../styles/PageHeader.css";

function PageHeader({ title, subtitle, buttonText, onButtonClick,children }) {
  return (
    <div className="page-header">
      <div className="page-header-text">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      <div className="page-header-action">
        {children}
      {buttonText && (
        <button className="page-header-btn" onClick={onButtonClick}>
          {buttonText}
        </button>
      )}
      </div>
    </div>
  );
}

export default PageHeader;