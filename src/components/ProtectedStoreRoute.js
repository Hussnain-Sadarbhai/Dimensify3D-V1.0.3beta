// ProtectedStoreRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedStoreRoute = ({ children }) => {
  // Check if the user has access to the store, e.g. by verifying localStorage flag
  const hasStoreAccess = localStorage.getItem("onlineStoreAccess") === "true";

  if (!hasStoreAccess) {
    // Redirect to a password entry or login page
    return <Navigate to="/onlinestorelogin" replace />;
  }

  return children;
};

export default ProtectedStoreRoute;
