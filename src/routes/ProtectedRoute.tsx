import React from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth.ts";

import LoadingExpenses from "../components/LoadingExpenses/index.js";

interface ProtectedRouteProps {
  element: React.ComponentType;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element: Element }) => {
  const { user, loading } = useAuth() as any;

  if (loading) {
    return <LoadingExpenses />;
  }

  if (!user) {
    return <Navigate to="/fint-desktop/login" />;
  }

  return <Element />;
};

export default ProtectedRoute;
