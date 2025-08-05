import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext"
import { Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user,loading } = useAuth();
  const userRole = user?.role || '';
  // console.log("نقش کاربر:", user?.role);  // باید چاپ کنه: "admin"
  
  if (loading) return null; // یا spinner نشون بده
  
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
