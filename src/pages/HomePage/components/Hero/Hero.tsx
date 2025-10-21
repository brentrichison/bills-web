import { Box, Button, Grid, Typography } from '@mui/material';
import { HomePageText } from '../../utils/constants';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <Box
      alignItems="center"
      data-testid="hero-section"
      display="flex"
      flexDirection="column"
      textAlign="center"
    >
      <Typography
        component="h1"
        data-testid="hero-title"
        mt="4rem"
        variant="h4"
      >
        {HomePageText.title}
      </Typography>

      <Typography
        data-testid="hero-subtitle"
        mb="3rem"
        mt=".5rem"
        variant="subtitle1"
      >
        {HomePageText.subtitle}
      </Typography>

      <Grid container mb="1rem" spacing=".5rem">
        <Grid size={{ xs: 12, sm: 'auto' }}>
          <Button fullWidth type="button" variant="contained">
            <Link
              data-testid="hero-accounts-link"
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
              data-testid="hero-bills-link"
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
