import { useEffect, useState, type ReactNode } from 'react';
import type { AccountType, BillType, CalendarYearType } from '@/models/types';
import { attachBearer } from '@/api/client';
import { useAuth } from 'react-oidc-context';
import { AppContext } from './AppContext';
import { useGetAllAccounts } from '@/hooks/useGetAllAccounts';
import { useGetAllBills } from '@/hooks/useGetAllBills';
import { useGetCalendarYear } from '@/hooks/useGetCalendarYear';
import { Typography } from '@mui/material';

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const { data: accountsData, error: accountsError } = useGetAllAccounts();
  const { data: billsData, error: billsError } = useGetAllBills();
  const {
    data: calendarYearData,
    error: calendarYearError,
    isPending,
    isFetching,
  } = useGetCalendarYear(new Date().getFullYear());
  const [accounts, setAccounts] = useState<AccountType[]>([]);
  const [bills, setBills] = useState<BillType[]>([]);
  const [calendarYear, setCalendarYear] = useState<CalendarYearType | null>(
    null
  );

  useEffect(() => {
    attachBearer(user?.access_token ?? undefined);
  }, [user?.access_token]);

  useEffect(() => {
    if (accountsData) setAccounts(accountsData);
  }, [accountsData]);

  useEffect(() => {
    if (billsData) setBills(billsData);
  }, [billsData]);

  useEffect(() => {
    if (calendarYearData) setCalendarYear(calendarYearData);
  }, [calendarYearData]);

  if (accountsError || billsError || calendarYearError) {
    return (
      <Typography color="error">
        Error loading accounts, bills, or calendar.
      </Typography>
    );
  }

  return (
    <AppContext.Provider
      value={{
        accounts,
        setAccounts,
        bills,
        setBills,
        calendarYear,
        setCalendarYear,
        calendarIsLoading: isPending || isFetching,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
