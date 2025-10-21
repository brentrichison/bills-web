import type { BillOccurrenceType } from '@/models/types';

export const WeekDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const getSuffix = (dateStr: string) => {
  const dateNum = parseInt(dateStr, 10);
  let suffix = 'th';
  if (isNaN(dateNum)) return '';
  if (dateNum >= 11 && dateNum <= 13) return `${dateStr}${suffix}`;

  switch (dateNum % 10) {
    case 1:
      suffix = 'st';
      break;
    case 2:
      suffix = 'nd';
      break;
    case 3:
      suffix = 'rd';
      break;
    default:
      suffix = 'th';
  }

  return `${dateStr}${suffix}`;
};

export const getDayName = (dayStr: string) => {
  const dayNum = parseInt(dayStr, 10);
  if (isNaN(dayNum) || dayNum < 0 || dayNum > 6) return '';
  return WeekDays[dayNum];
};

export const ButtonText = {
  addAccount: 'Add account',
  addBill: 'Add bill',
  cancel: 'Cancel',
  createAccount: 'Create account',
  saveBill: 'Save bill',
  updateAccount: 'Update account',
};

export const ChangeText = {
  accountId: 'accountId',
  amount: 'amount',
  name: 'name',
  day: 'day',
  week: 'week',
  month: 'month',
  depositAmount: 'depositAmount',
} as const;

export type FieldErrors = Partial<
  Record<
    'name' | 'amount' | 'occurrence' | 'accountId' | 'depositAmount',
    string
  >
>;

export type BaseBillProps = {
  updateBill: (field: keyof typeof ChangeText, value: string) => void;
  value?: string | number | BillOccurrenceType;
};
