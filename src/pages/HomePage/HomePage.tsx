import { Box, Grid } from '@mui/material';
import { useAppContext } from '@/context/AppContext';
import { dueThisWeek } from './utils/helpers';
import { DueList } from './components/DueList/DueList';
import { HomePageText } from './utils/constants';
import { Hero } from './components/Hero/Hero';
import { StatCard } from './components/StatCard/StatCard';

export const HomePage = () => {
  const { accounts, bills } = useAppContext();
  const { bills: dueBills, count, total } = dueThisWeek(bills);

  const accountTotals = () => {
    const accountTotals = accounts.reduce((s, a) => s + a.amount, 0).toFixed(2);
    const depositTotals = accounts
      .reduce((s, a) => s + a.depositAmount, 0)
      .toFixed(2);
    return (Number(accountTotals) + Number(depositTotals)).toFixed(2);
  };

  const Snapshot = () => {
    return (
      <Grid container mt="2rem" justifyContent="center" spacing=".5rem">
        <Grid size={{ xs: 12, sm: 4 }}>
          <StatCard
            label={HomePageText.accountsMonthlyTotal}
            value={`$${accountTotals()}`}
            sub={HomePageText.accountsDepositsExpected}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <StatCard
            label={HomePageText.scheduledThisWeek}
            value={total ? `$${total.toFixed(2)}` : '$0.00'}
            sub={`${count} ${HomePageText.billsDue}`}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 8 }}>
          <DueList bills={dueBills} />
        </Grid>
      </Grid>
    );
  };

  return (
    <Box data-testid="home-page">
      <Hero />
      <Snapshot />
    </Box>
  );
};
