import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const Title = () => {
  return (
    <Typography
      component={Link}
      data-testid="app-header-title"
      variant="h6"
      to="/"
      sx={{
        color: 'inherit',
        textDecoration: 'none',
      }}
    >
      Ledger Lines
    </Typography>
  );
};
