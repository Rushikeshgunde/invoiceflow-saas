import {
  FaUserPlus,
  FaFileInvoice,
  FaBoxOpen,
  FaMoneyBillWave,
} from "react-icons/fa";

import "../../styles/QuickActions.css";

function QuickActions() {
  const actions = [
    {
      title: "Add Customer",
      icon: <FaUserPlus />,
    },

    {
      title: "Create Invoice",
      icon: <FaFileInvoice />,
    },

    {
      title: "Add Product",
      icon: <FaBoxOpen />,
    },

    {
      title: "Add Expense",
      icon: <FaMoneyBillWave />,
    },
  ];

  return (
    <div className="quick-actions">
      <h3>Quick Actions</h3>

      <div className="actions-grid">
        {actions.map((item, index) => (
          <button key={index} className="action-card">
            {item.icon}

            <span>{item.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuickActions;
