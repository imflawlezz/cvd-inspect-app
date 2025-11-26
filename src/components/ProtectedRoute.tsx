import React from 'react';
import { Redirect } from 'react-router-dom';
import { useApp } from '../context/AppContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { submittedData } = useApp();

  if (!submittedData) {
    return <Redirect to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;