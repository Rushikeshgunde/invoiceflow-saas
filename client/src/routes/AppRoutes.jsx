import {
  Routes,
  Route,
  // Navigate
} from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

import Dashboard from "../pages/Dashboard";
import Customers from "../pages/Customers";
import Products from "../pages/Products";
import Invoices from "../pages/Invoices";
import Expenses from "../pages/Expenses";
import Reports from "../pages/Reports";
// import Settings from "../pages/Settings";
import Profile from "../pages/Profile";
// import Payments from "../pages/Payments";
// import Invoices from "./pages/Invoices";

import DashboardLayout from "../layouts/DashboardLayout";

import ProtectedRoute from "./ProtectedRoute";
import CompanySettings from "../pages/CompanySettings";

function AppRoutes() {
  return (
    <Routes>
      {/* Redirect "/" to Login */}
      <Route path="/" element={<Login />} />

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="customers" element={<Customers />} />
        <Route path="products" element={<Products />} />
        <Route path="invoices" element={<Invoices />} />
        {/* <Route path="payments" element={<Payments />} /> */}
        <Route path="expenses" element={<Expenses />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<CompanySettings />} />
        <Route path="profile" element={<Profile />} />

        {/* <Route path="/dashboard/products" element={<Products />} /> */}
        {/* <Route path="/invoices" element={<Invoices />} /> */}
      </Route>
    </Routes>
  );
}

export default AppRoutes;

// --------------------------------------------------------------------------------


