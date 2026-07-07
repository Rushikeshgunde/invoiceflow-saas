// import { Navigate } from "react-router-dom";

// import useAuth from "../hooks/useAuth";

// function ProtectedRoute({ children }) {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return <h2>Loading...</h2>;
//   }

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }

// export default ProtectedRoute;

// -------------------------------------------------------------------------

import { Navigate, useLocation } from "react-router-dom";

function isAuthenticated() {
  return !!localStorage.getItem("token");
}

function ProtectedRoute({ children }) {
  const location = useLocation();

  if (!isAuthenticated()) {
    // replace: true -> no dashboard entry left in history
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;