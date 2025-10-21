import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { BillPage } from './BillPage';
import { useAppContext } from '@/context/AppContext';
import type { AccountType, BillType } from '@/models/types';

vi.mock('react-oidc-context', () => ({
  useAuth: () => ({
    isAuthenticated: true,
    user: { profile: { sub: 'test-user' } },
  }),
}));

vi.mock('@/context/AppContext', () => ({
  useAppContext: vi.fn(),
}));

vi.mock('@/hooks/useCreateBill', () => ({
  useCreateBill: () => ({
    mutateAsync: vi.fn(),
    isPending: false,
    error: null,
    reset: vi.fn(),
  }),
}));

vi.mock('@/hooks/useUpdateBill', () => ({
  useUpdateBill: () => ({ mutateAsync: vi.fn() }),
}));

vi.mock('@/hooks/useDeleteBill', () => ({
  useDeleteBill: () => ({ mutate: vi.fn() }),
}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

const baseCtx = () => ({
  calendarYear: { months: [], yearlyTotals: 0 },
  calendarIsLoading: false,
  setAccounts: vi.fn(),
  setBills: vi.fn(),
  setCalendarYear: vi.fn(),
});

describe('BillPage', () => {
  test('renders with one bill and shows action buttons', () => {
    const accounts: AccountType[] = [
      { id: 1, name: 'Checking Account', amount: 1000, depositAmount: 500 },
    ];

    const bills: BillType[] = [
      {
        id: 1,
        name: 'Electricity Bill',
        amount: 150,
        accountId: 1,
        occurrence: { day: 5, week: undefined, month: undefined },
      },
    ];

    vi.mocked(useAppContext).mockReturnValue({ ...baseCtx(), accounts, bills });

    render(
      <MemoryRouter>
        <BillPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('bill-page')).toBeInTheDocument();
    expect(screen.getByTestId('edit-bill-button')).toBeInTheDocument();
    expect(screen.getByTestId('delete-bill-button')).toBeInTheDocument();
    expect(screen.queryByTestId('bill-form')).not.toBeInTheDocument();
    expect(screen.queryByTestId('no-accounts-error')).not.toBeInTheDocument();
    expect(screen.queryByTestId('no-bills-error')).not.toBeInTheDocument();
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
  });

  test('renders without bills and hides action buttons', () => {
    vi.mocked(useAppContext).mockReturnValue({
      ...baseCtx(),
      accounts: [],
      bills: [],
    });

    render(
      <MemoryRouter>
        <BillPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('bill-page')).toBeInTheDocument();
    expect(screen.getByTestId('no-accounts-error')).toBeInTheDocument();
    expect(screen.getByTestId('no-bills-error')).toBeInTheDocument();
    expect(screen.queryByTestId('edit-bill-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('delete-bill-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
    expect(screen.queryByTestId('bill-form')).not.toBeInTheDocument();
  });

  test('when clicking button, drawer opens', async () => {
    const accounts: AccountType[] = [
      { id: 1, name: 'Checking Account', amount: 1000, depositAmount: 500 },
    ];

    const bills: BillType[] = [
      {
        id: 1,
        name: 'Electricity Bill',
        amount: 150,
        accountId: 1,
        occurrence: { day: 5, week: undefined, month: undefined },
      },
    ];

    vi.mocked(useAppContext).mockReturnValue({ ...baseCtx(), accounts, bills });

    render(
      <MemoryRouter>
        <BillPage />
      </MemoryRouter>
    );

    const addButton = screen.getByTestId('add-bill-button');
    expect(addButton).toBeInTheDocument();

    addButton.click();

    await waitFor(() => {
      expect(screen.getByTestId('bill-form')).toBeInTheDocument();
      expect(screen.getByTestId('save-bill-button')).toBeInTheDocument();
      expect(screen.getByTestId('cancel-bill-button')).toBeInTheDocument();
    });
  });

  test('when clicking cancel, drawer closes', () => {
    const accounts: AccountType[] = [
      { id: 1, name: 'Checking Account', amount: 1000, depositAmount: 500 },
    ];

    const bills: BillType[] = [
      {
        id: 1,
        name: 'Electricity Bill',
        amount: 150,
        accountId: 1,
        occurrence: { day: 5, week: undefined, month: undefined },
      },
    ];

    vi.mocked(useAppContext).mockReturnValue({ ...baseCtx(), accounts, bills });

    render(
      <MemoryRouter>
        <BillPage />
      </MemoryRouter>
    );

    const addButton = screen.getByTestId('add-bill-button');
    expect(addButton).toBeInTheDocument();

    addButton.click();

    waitFor(() => {
      const btn = screen.getByTestId('cancel-bill-button');
      expect(btn).toBeInTheDocument();
      btn.click();
      expect(screen.queryByTestId('bill-form')).not.toBeInTheDocument();
    });
  });

  test('when clicking save, save is called and drawer closes', () => {
    const accounts: AccountType[] = [
      { id: 1, name: 'Checking Account', amount: 1000, depositAmount: 500 },
    ];

    const bills: BillType[] = [
      {
        id: 1,
        name: 'Electricity Bill',
        amount: 150,
        accountId: 1,
        occurrence: { day: 5, week: undefined, month: undefined },
      },
    ];

    vi.mocked(useAppContext).mockReturnValue({ ...baseCtx(), accounts, bills });

    render(
      <MemoryRouter>
        <BillPage />
      </MemoryRouter>
    );

    const addButton = screen.getByTestId('add-bill-button');
    expect(addButton).toBeInTheDocument();
    addButton.click();

    waitFor(() => {
      const btn = screen.getByTestId('save-bill-button');
      expect(btn).toBeInTheDocument();
      btn.click();
      expect(screen.queryByTestId('bill-form')).not.toBeInTheDocument();
    });
  });
});
