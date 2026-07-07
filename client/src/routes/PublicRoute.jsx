// import { Navigate } from "react-router-dom";
// import useAuth from "../hooks/useAuth";

// function PublicRoute({ children }) {
//   const { user, loading } = useAuth();

//   if (loading) return null;

//   if (user) {
//     return <Navigate to="/dashboard" replace />;
//   }

//   return children;
// }

// export default PublicRoute;

// ------------------------------------------------------------------------

import { Navigate } from "react-router-dom";

function isAuthenticated() {
  return !!localStorage.getItem("token");
}

function PublicRoute({ children }) {
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

export default PublicRoute;
