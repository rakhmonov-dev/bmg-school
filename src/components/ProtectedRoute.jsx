import React from 'react';
import { Navigate } from 'react-router-dom';
import { ADMIN_BASE } from '../config';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('bmg_admin_token');
  if (!token) {
    return <Navigate to={`${ADMIN_BASE}/login`} replace />;
  }
  return children;
}
