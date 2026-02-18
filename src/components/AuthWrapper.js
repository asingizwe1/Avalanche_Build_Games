import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const AuthWrapper = () => {
  const location = useLocation();
  // const isAuthenticated = !!localStorage.getItem('astrolearn_token');
  const isAuthenticated = true;

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default AuthWrapper;