import api from "./api";

// ==========================================
// Get All Expenses
// ==========================================

export const getExpenses = async () => {
  const { data } = await api.get("/expenses");
  return data;
};

// ==========================================
// Get Single Expense
// ==========================================

export const getExpenseById = async (id) => {
  const { data } = await api.get(`/expenses/${id}`);

  return data;
};

// ==========================================
// Create Expense
// ==========================================

export const createExpense = async (expenseData) => {
  const { data } = await api.post(
    "/expenses",
    expenseData
  );

  return data;
};

// ==========================================
// Update Expense
// ==========================================

export const updateExpense = async (
  id,
  expenseData
) => {
  const { data } = await api.put(
    `/expenses/${id}`,
    expenseData
  );

  return data;
};

// ==========================================
// Delete Expense
// ==========================================

export const deleteExpense = async (id) => {
  const { data } = await api.delete(
    `/expenses/${id}`
  );

  return data;
};