import type { AccountType } from '@/models/types';

export const twoDecimals = (s: string) => {
  const regex = s.replace(',', '.').replace(/[^\d.]/g, '');
  const match = regex.match(/^(\d+)(?:\.(\d{0,2}))?/);
  return match ? (match[2] ? `${match[1]}.${match[2]}` : match[1]) : '';
};

export const slotsProps = {
  htmlInput: {
    inputMode: 'decimal',
    step: '0.01',
  },
};

export type AccountFormProps = {
  id?: number;
  name?: string;
  amount?: number;
  depositAmount?: number;
  toggleOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  setAccounts: React.Dispatch<React.SetStateAction<AccountType[]>>;
  setEditTarget?: React.Dispatch<React.SetStateAction<AccountType | null>>;
};

export const GridSize = { xs: 12 };

export const Text = {
  createAccount: 'Creating account...',
  updateAccount: 'Updating account...',
};
