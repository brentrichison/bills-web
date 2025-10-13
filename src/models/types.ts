export type BillOccurrenceType = {
  day?: number;
  month?: number;
  week?: number;
};

export type BillType = {
  id?: number;
  accountId: number;
  amount: number;
  name: string;
  occurrence: BillOccurrenceType;
};

export type AccountType = {
  id?: number;
  amount: number;
  depositAmount: number;
  name: string;
};

export type OccurrenceSelectType = {
  billId: number;
  onChange: (value: string) => void;
};

export type NavItemType = {
  dataTestId: string;
  label: string;
  to: string;
};

type CalendarDayType = {
  bills: BillType[];
  dateIso: string;
  inMonth: boolean;
};

export type CalendarWeekType = {
  days: CalendarDayType[];
};

export type CalendarWeeklyTotalsType = {
  total: number;
  week: number;
};

export type CalendarMonthType = {
  month: number;
  weeks: CalendarWeekType[];
  weeklyTotals: CalendarWeeklyTotalsType[];
};

export type CalendarYearType = {
  months: CalendarMonthType[];
  yearlyTotals: number;
};
