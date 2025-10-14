import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import type { NavItemType } from '@/models/types';
import { AuthButton } from '@/components/AuthButton/AuthButton';

type MobileNavProps = {
  anchorEl: null | HTMLElement;
  nav: NavItemType[];
  open: boolean;
  setAnchorEl: (el: null | HTMLElement) => void;
};

export const MobileNav = ({
  anchorEl,
  open,
  nav,
  setAnchorEl,
}: MobileNavProps) => (
  <Box data-testid="mobile-nav">
    <IconButton
      aria-controls={open ? 'main-nav-menu' : undefined}
      aria-expanded={open ? 'true' : undefined}
      aria-haspopup="menu"
      aria-label="open navigation"
      color="inherit"
      edge="end"
      onClick={(e) => setAnchorEl(e.currentTarget)}
      sx={{ display: { xs: 'inline-flex', md: 'none' } }}
    >
      <MenuIcon data-testid="mobile-nav-icon" />
    </IconButton>

    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      id="main-nav-menu"
      onClose={() => setAnchorEl(null)}
      open={open}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
      {nav.map((n) => (
        <MenuItem
          component={Link}
          data-testid={n.dataTestId}
          key={n.to}
          to={n.to}
          onClick={() => setAnchorEl(null)}
        >
          {n.label}
        </MenuItem>
      ))}

      <MenuItem>
        <AuthButton />
      </MenuItem>
    </Menu>
  </Box>
);
