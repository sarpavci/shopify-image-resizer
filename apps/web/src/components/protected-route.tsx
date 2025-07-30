import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuthStore } from '@src/store/auth';

type ProtectedRouteProps = React.PropsWithChildren<object>;

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to={'/login'} replace />;
  }

  return (
    <>
      {children && children}
      {!children && <Outlet />}
    </>
  );
};
