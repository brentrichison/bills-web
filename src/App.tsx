import { Navigate, Route, Routes } from 'react-router-dom';
import { CalendarPage } from '@/pages/CalendarPage/CalendarPage';
import { BillPage } from '@/pages/BillPage/BillPage';
import { AccountPage } from '@/pages/AccountPage/AccountPage';
import { OidcCallback } from '@/auth/OidcCallback';
import { Header } from '@/components/Header/Header';
import { ProtectedBillsLayout } from '@/auth/ProtectedRoutes';
import { HomePage } from '@/pages/HomePage/HomePage';

export const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/oidc-callback" element={<OidcCallback />} />

        <Route element={<ProtectedBillsLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/bills" element={<BillPage />} />
          <Route path="/accounts" element={<AccountPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};
