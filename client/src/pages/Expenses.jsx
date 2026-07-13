// ==========================================
// Imports
// ==========================================

import { useEffect, useMemo, useState } from "react";

import { toast } from "react-toastify";

import PageHeader from "../components/common/PageHeader";
import { useNotification } from "../context/NotificationContext";

import ExpenseSummary from "../components/expenses/ExpenseSummary";
import ExpenseTable from "../components/expenses/ExpenseTable";
// import ExpenseModal from "../components/expenses/ExpenseModal";
import ExpenseViewModal from "../components/expenses/ExpenseViewModal";
import ExpenseForm from "../components/expenses/ExpenseForm";
import ExpenseFilters from "../components/expenses/ExpenseFilters";
import ExpenseExport from "../components/expenses/ExpenseExport";

import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../services/expenseService";

import "../styles/Expenses.css";

// ==========================================
// Expenses Page
// ==========================================

function Expenses() {
  const [expenses, setExpenses] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedExpense, setSelectedExpense] = useState(null);

  const [selectedEditExpense, setSelectedEditExpense] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const [category, setCategory] = useState("");

  const [status, setStatus] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("");

  const { refreshNotifications } = useNotification();

  // ==========================================
  // Load Expenses
  // ==========================================

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      setLoading(true);

      const res = await getExpenses();

      setExpenses(res.expenses || []);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load expenses.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Add Expense
  // ==========================================

  const handleCreate = () => {
    setSelectedEditExpense(null);

    setShowForm(true);
  };

  // ==========================================
  // Edit Expense
  // ==========================================

  const handleEdit = (expense) => {
    setSelectedEditExpense(expense);

    setShowForm(true);
  };

  // ==========================================
  // View Expense
  // ==========================================

  const handleView = (expense) => {
    setSelectedExpense(expense);
  };

  // ==========================================
  // Save Expense
  // ==========================================

 const handleSave = async (formData) => {
  try {
    if (selectedEditExpense) {
      await updateExpense(selectedEditExpense._id, formData);

      await refreshNotifications();

      toast.success("Expense updated successfully.");
    } else {
      await createExpense(formData);

      await refreshNotifications();

      toast.success("Expense created successfully.");
    }

    setShowForm(false);

    setSelectedEditExpense(null);

    await loadExpenses();
  } catch (error) {
    console.error(error);

    toast.error("Unable to save expense.");
  }
};

  // ==========================================
  // Delete Expense
  // ==========================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this expense?");

    if (!confirmDelete) return;

    try {
      await deleteExpense(id);

      toast.success("Expense deleted successfully.");

      loadExpenses();
    } catch (error) {
      console.error(error);

      toast.error("Unable to delete expense.");
    }
  };

  // ==========================================
  // Search Filter
  // ==========================================

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const matchesSearch =
        expense.title?.toLowerCase().includes(search.toLowerCase()) ||
        expense.vendor?.toLowerCase().includes(search.toLowerCase()) ||
        expense.category?.toLowerCase().includes(search.toLowerCase());

      const matchesCategory = !category || expense.category === category;

      const matchesStatus = !status || expense.status === status;

      const matchesPayment =
        !paymentMethod || expense.paymentMethod === paymentMethod;

      return (
        matchesSearch && matchesCategory && matchesStatus && matchesPayment
      );
    });
  }, [expenses, search, category, status, paymentMethod]);

  const handleResetFilters = () => {
    setSearch("");
    setCategory("");
    setStatus("");
    setPaymentMethod("");
  };

  // ==========================================
  // Render
  // ==========================================

  return (
    <div className="expenses-page">
      <PageHeader
        title="Expenses"
        subtitle="Manage all business expenses"
        buttonText="+ Add Expense"
        
        onButtonClick={handleCreate}
      > 
      <ExpenseExport expenses={filteredExpenses} />
       </PageHeader>
      <ExpenseSummary expenses={filteredExpenses} />

      {/* <div className="expenses-toolbar">
        <input
          type="text"
          placeholder="Search expenses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div> */}

      <ExpenseFilters
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        status={status}
        setStatus={setStatus}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod} 
        onReset={handleResetFilters}
      />

      <ExpenseTable
        expenses={filteredExpenses}
        loading={loading}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ExpenseViewModal
        expense={selectedExpense}
        onClose={() => setSelectedExpense(null)}
      />

      {showForm && (
        <ExpenseForm
          expense={selectedEditExpense}
          onSubmit={handleSave}
          onCancel={() => {
            setShowForm(false);
            setSelectedEditExpense(null);
          }}
        />
      )}
    </div>
  );
}

export default Expenses;
