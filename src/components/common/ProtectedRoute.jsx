import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '50px 0' }}>
        <h2 style={{ color: '#b91c1c' }}>403 - غير مصرح لك بالوصول لهذه الصفحة</h2>
        <p style={{ marginTop: '10px' }}>هذه الصفحة مخصصة للمدراء فقط.</p>
      </div>
    );
  }

  return children;
};