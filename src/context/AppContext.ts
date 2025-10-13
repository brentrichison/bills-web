import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from 'react';
import type { AccountType, BillType, CalendarYearType } from '@/models/types';

export type AppContext = {
  accounts: AccountType[];
  setAccounts: Dispatch<SetStateAction<AccountType[]>>;
  bills: BillType[];
  setBills: Dispatch<SetStateAction<BillType[]>>;
  calendarYear: CalendarYearType | null;
  setCalendarYear: Dispatch<SetStateAction<CalendarYearType | null>>;
  calendarIsLoading: boolean;
};

export const AppContext = createContext<AppContext | undefined>(undefined);

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
};
