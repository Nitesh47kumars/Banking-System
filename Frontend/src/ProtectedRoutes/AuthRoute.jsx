import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = () => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) return null;

  return user ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default AuthRoute;