import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, test, vi } from 'vitest';
import { HomePage } from './HomePage';

const { mockUseAppContext, mockDueThisWeek } = vi.hoisted(() => ({
  mockUseAppContext: vi.fn(),
  mockDueThisWeek: vi.fn(),
}));

vi.mock('@/context/AppContext', () => ({
  useAppContext: mockUseAppContext,
}));

vi.mock('./utils/helpers', () => ({
  dueThisWeek: mockDueThisWeek,
}));

describe('HomePage', () => {
  test('renders with empty state', () => {
    mockUseAppContext.mockReturnValue({ accounts: [], bills: [] });
    mockDueThisWeek.mockReturnValue({ bills: [], count: 0, total: 0 });

    render(
      <MemoryRouter initialEntries={['/']}>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('hero-title')).toBeInTheDocument();
    expect(screen.getByTestId('hero-subtitle')).toBeInTheDocument();
    expect(screen.getByTestId('hero-accounts-link')).toBeInTheDocument();
    expect(screen.getByTestId('hero-bills-link')).toBeInTheDocument();
    expect(screen.getAllByTestId('stat-card')).toHaveLength(2);
    expect(screen.getAllByText('$0.00')[0]).toBeInTheDocument();
  });

  test('shows computed totals and due bills', () => {
    mockUseAppContext.mockReturnValue({
      accounts: [
        { amount: 100, depositAmount: 25 },
        { amount: 50.1, depositAmount: 4.9 },
      ],
      bills: [{ id: 1 }, { id: 2 }],
    });

    mockDueThisWeek.mockReturnValue({
      bills: [{ id: 2, name: 'Internet' }],
      count: 1,
      total: 49.99,
    });

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByText('$180.00')).toBeInTheDocument();
    expect(screen.getByText('$49.99')).toBeInTheDocument();
  });
});
