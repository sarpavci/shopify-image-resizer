import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuthStore } from '@src/store/auth';

type GuestRouteProps = {
  children?: React.ReactNode;
};

export const GuestRoute: React.FC<GuestRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  if (isAuthenticated) {
    return <Navigate to={'/studio'} replace />;
  }

  return (
    <>
      {children && children}
      {!children && <Outlet />}
    </>
  );
};
