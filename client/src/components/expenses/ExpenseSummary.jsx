
import "../../styles/Expenses.css";

// ==========================================
// Expense Summary Component
// ==========================================

function ExpenseSummary({ expenses }) {
  // ==========================================
  // Calculations
  // ==========================================

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount || 0),
    0
  );

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyExpenses = expenses
    .filter((expense) => {
      const expenseDate = new Date(expense.expenseDate);

      return (
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear
      );
    })
    .reduce(
      (sum, expense) => sum + Number(expense.amount || 0),
      0
    );

  const paidExpenses = expenses
    .filter((expense) => expense.status === "Paid")
    .reduce(
      (sum, expense) => sum + Number(expense.amount || 0),
      0
    );

  const pendingExpenses = expenses
    .filter((expense) => expense.status === "Pending")
    .reduce(
      (sum, expense) => sum + Number(expense.amount || 0),
      0
    );

  // ==========================================
  // Render
  // ==========================================

  return (
    <div className="expense-summary">

      <div className="expense-summary-card">
        <h4>Total Expenses</h4>

        <h2>
          ₹{totalExpenses.toLocaleString("en-IN")}
        </h2>
      </div>

      <div className="expense-summary-card">
        <h4>This Month</h4>

        <h2>
          ₹{monthlyExpenses.toLocaleString("en-IN")}
        </h2>
      </div>

      <div className="expense-summary-card">
        <h4>Paid</h4>

        <h2>
          ₹{paidExpenses.toLocaleString("en-IN")}
        </h2>
      </div>

      <div className="expense-summary-card">
        <h4>Pending</h4>

        <h2>
          ₹{pendingExpenses.toLocaleString("en-IN")}
        </h2>
      </div>

    </div>
  );
}

export default ExpenseSummary;