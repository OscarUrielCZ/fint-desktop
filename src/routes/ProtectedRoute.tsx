import React from "react";
import { Navigate } from "react-router-dom";

import { Typography } from "@mui/material";

import { useAuth } from "../hooks/useAuth.ts";

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { user, loading }: any = useAuth();

  if (loading) {
    return <Typography>Loading...</Typography>; // Or a spinner
  }

  if (!user) {
    return <Navigate to="/fint-desktop/login" />;
  }

  return <Element />;
};

export default ProtectedRoute;
