import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { isFormDataComplete } from '../utils/routeValidation';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const history = useHistory();
  const { state } = useApp();

  useEffect(() => {
    if (!isFormDataComplete(state)) {
      history.replace('/');
    }
  }, [state, history]);

  if (!isFormDataComplete(state)) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

