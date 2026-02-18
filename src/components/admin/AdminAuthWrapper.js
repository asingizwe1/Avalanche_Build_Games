import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const AdminAuthWrapper = () => {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem('astrolearn_token');
  const isAdmin = localStorage.getItem('astrolearn_role') === 'admin';

  return isAuthenticated && isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default AdminAuthWrapper;