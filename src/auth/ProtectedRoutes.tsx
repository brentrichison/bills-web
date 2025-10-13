import { Outlet } from 'react-router-dom';
import { RequireAuth } from '@auth/RequireAuth';
import { AppProvider } from '@/context/AppProvider';

export const ProtectedBillsLayout = () => {
  return (
    <RequireAuth>
      <AppProvider>
        <Outlet />
      </AppProvider>
    </RequireAuth>
  );
};
