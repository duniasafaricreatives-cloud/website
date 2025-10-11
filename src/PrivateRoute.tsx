import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

interface PrivateRouteProps {
  redirectTo?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ redirectTo = "/" }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // Or a spinner

  return user ? <Outlet /> : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
