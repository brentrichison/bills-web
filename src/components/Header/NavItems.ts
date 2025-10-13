import type { NavItemType } from '@/models/types';

export const NavItems: NavItemType[] = [
  {
    dataTestId: 'app-header-nav-item-calendar',
    label: 'Calendar',
    to: '/calendar',
  },
  {
    dataTestId: 'app-header-nav-item-accounts',
    label: 'Accounts',
    to: '/accounts',
  },
  { dataTestId: 'app-header-nav-item-bills', label: 'Bills', to: '/bills' },
];
