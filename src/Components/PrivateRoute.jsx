import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = () => {
  const isAuthenticated = Cookies.get("token") || null; // Adjust based on your authentication mechanism

  if(isAuthenticated !== null)
  {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;