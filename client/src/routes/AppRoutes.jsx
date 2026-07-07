import {  Routes, Route, 
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
import Settings from "../pages/Settings";
import Profile from "../pages/Profile";

import DashboardLayout from "../layouts/DashboardLayout";


import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    
      <Routes>
        {/* Redirect "/" to Login */}
        <Route path="/" element={  <Login/>} />

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

        <Route path="expenses" element={<Expenses />} />

        <Route path="reports" element={<Reports />} />

        <Route path="settings" element={<Settings />} />

        <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    
  );
}

export default AppRoutes;

// --------------------------------------------------------------------------------

// import { Routes, Route,Navigate } from "react-router-dom";

// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import ForgotPassword from "../pages/ForgotPassword";
// import ResetPassword from "../pages/ResetPassword";

// import DashboardLayout from "../layouts/DashboardLayout";
// import Dashboard from "../pages/Dashboard";

// import ProtectedRoute from "./ProtectedRoute";
// import PublicRoute from "./PublicRoute";

// function AppRoutes() {
//   return (
//     <Routes>
//       {/* Public routes: redirect to dashboard if already logged in */}
//       <Route
//         path="/"
//         element={
//           <PublicRoute>
//             <Login />
//           </PublicRoute>
//         }
//       />
//       <Route
//         path="/register"
//         element={
//           <PublicRoute>
//             <Register />
//           </PublicRoute>
//         }
//       />
//       <Route
//         path="/forgot-password"
//         element={
//           <PublicRoute>
//             <ForgotPassword />
//           </PublicRoute>
//         }
//       />
//       <Route path="/reset-password/:token" element={<ResetPassword />} />

//       {/* Protected routes */}
//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <DashboardLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route index element={<Dashboard />} />
//       </Route>

//       {/* Catch-all */}
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// }

// export default AppRoutes;