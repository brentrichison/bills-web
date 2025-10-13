import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { NavItems } from '../NavItems';

export const Navigation = () => (
  <Box
    data-testid="app-header-navigation"
    sx={{ display: { xs: 'none', md: 'flex' }, ml: 2, gap: 1 }}
  >
    {NavItems.map((n) => (
      <Button key={n.to} color="inherit" component={Link} to={n.to}>
        {n.label}
      </Button>
    ))}
  </Box>
);
