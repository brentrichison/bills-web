import { useMemo, useState } from 'react';
import { Box, CircularProgress, IconButton, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { MonthGrid } from '@components/MonthGrid/MonthGrid';
import { useAppContext } from '@/context/AppContext';
import type { AccountType, CalendarWeeklyTotalsType } from '@/models/types';

export function CalendarPage() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [monthIndex, setMonthIndex] = useState(now.getMonth());
  const { accounts, calendarYear, calendarIsLoading } = useAppContext();

  const AmountText = {
    accountBalances: 'Account Balances',
    deposits: 'Deposits',
    due: 'Due',
    total: 'Total',
    totalBalance: 'Total Balance',
  };

  const monthName = (y: number, m0: number) =>
    new Date(y, m0, 1).toLocaleString('default', {
      month: 'long',
      year: 'numeric',
    });

  const current = useMemo(
    () => calendarYear?.months?.find((m) => m.month === monthIndex),
    [calendarYear, monthIndex]
  );

  const goPrev = () => {
    if (monthIndex === 0) {
      setYear((y) => y - 1);
      setMonthIndex(11);
    } else setMonthIndex((m) => m - 1);
  };

  const goNext = () => {
    if (monthIndex === 11) {
      setYear((y) => y + 1);
      setMonthIndex(0);
    } else setMonthIndex((m) => m + 1);
  };

  const getMonthlyTotalDue = (weeklyTotals: CalendarWeeklyTotalsType[]) =>
    weeklyTotals.reduce((acc, curr) => acc + Number(curr.total), 0);

  const getMonthlyDeposits = (accounts: AccountType[]) =>
    Number(
      accounts
        .reduce((acc, curr) => acc + Number(curr.depositAmount), 0)
        .toFixed(2)
    );

  const getAccountTotals = (accounts: AccountType[]) =>
    Number(accounts.reduce((acc, curr) => acc + Number(curr.amount), 0));

  const getMonthlyTotals = (weeklyTotals: CalendarWeeklyTotalsType[]) =>
    Number(getAccountTotals(accounts)) +
    Number(getMonthlyDeposits(accounts)) -
    Number(getMonthlyTotalDue(weeklyTotals));

  const renderAmounts = (title: string, amount: number) => (
    <Typography align="right" component="p" variant="caption">
      <strong>{title}:</strong> ${amount.toFixed(2)}
    </Typography>
  );

  const renderTotals = (weeklyTotals: CalendarWeeklyTotalsType[]) => (
    <Box padding=".5rem">
      {renderAmounts(AmountText.accountBalances, getAccountTotals(accounts))}
      {renderAmounts(AmountText.deposits, getMonthlyDeposits(accounts))}

      {renderAmounts(
        AmountText.totalBalance,
        getAccountTotals(accounts) + getMonthlyDeposits(accounts)
      )}

      {renderAmounts(
        AmountText.due,
        Number(getMonthlyTotalDue(weeklyTotals).toFixed(2))
      )}
      {renderAmounts(
        AmountText.total,
        Number(getMonthlyTotals(weeklyTotals).toFixed(2))
      )}
    </Box>
  );

  if (calendarIsLoading) return <CircularProgress />;

  if (!current)
    return <Typography>No data for {monthName(year, monthIndex)}</Typography>;

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box />
        <Box alignItems="center" display="flex" gap={1}>
          <IconButton aria-label="Previous month" onClick={goPrev} size="small">
            <ChevronLeftIcon />
          </IconButton>

          <Typography variant="h4">{monthName(year, monthIndex)}</Typography>

          <IconButton aria-label="Next month" onClick={goNext} size="small">
            <ChevronRightIcon />
          </IconButton>
        </Box>

        {renderTotals(current.weeklyTotals)}
      </Box>

      <MonthGrid weeks={current.weeks} weeklyTotals={current.weeklyTotals} />
    </Box>
  );
}
