import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext';
import { dueThisWeek } from './helpers';
import { DueList } from './DueList/DueList';
import { HomePageText } from './constants';

export const HomePage = () => {
  const { accounts, bills } = useAppContext();
  const { bills: dueBills, count, total } = dueThisWeek(bills);

  const Hero = () => {
    return (
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        textAlign="center"
      >
        <Typography component="h1" variant="h4" mt="4rem">
          {HomePageText.title}
        </Typography>

        <Typography mb="3rem" mt=".5rem" variant="subtitle1">
          {HomePageText.subtitle}
        </Typography>

        <Grid container mb="1rem" spacing=".5rem">
          <Grid size={{ xs: 12, sm: 'auto' }}>
            <Button fullWidth type="button" variant="contained">
              <Link
                to="/accounts"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                {HomePageText.accounts}
              </Link>
            </Button>
          </Grid>

          <Grid size={{ xs: 12, sm: 'auto' }}>
            <Button fullWidth type="button" variant="contained">
              <Link
                to="/bills/"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                {HomePageText.bills}
              </Link>
            </Button>
          </Grid>
        </Grid>
      </Box>
    );
  };

  const StatCard = ({
    label,
    value,
    sub,
  }: {
    label: string;
    value: string;
    sub: string;
  }) => {
    return (
      <Card>
        <CardContent>
          <Typography color="text.secondary" gutterBottom variant="h6">
            {label}
          </Typography>

          <Typography gutterBottom variant="h5">
            {value}
          </Typography>

          <Typography color="text.secondary" variant="body2">
            {sub}
          </Typography>
        </CardContent>
      </Card>
    );
  };

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
    <>
      <Hero />
      <Snapshot />
    </>
  );
};
