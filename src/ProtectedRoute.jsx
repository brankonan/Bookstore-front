import React from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn, hasRole } from "./auth";

export function PrivateRoute({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" replace />;
}

export function RoleRoute({ role, children }) {
  return isLoggedIn() && hasRole(role) ? children : <Navigate to="/" replace />;
}
