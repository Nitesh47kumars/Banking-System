import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "../redux/authSlice";
import Loading from "../utils/Loading"

const ProtectedRoute = () => {
  
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if(!user){
      dispatch(getUser())
    }
  }, [dispatch]);

  if (loading) return <Loading/>;
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
