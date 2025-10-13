import { AppBar, Toolbar, Box, useTheme, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { MobileNav } from './MobileNav/MobileNav';
import { AuthButton } from '@/components/AuthButton/AuthButton';
import { Title } from './Title/Title';
import { NavItems } from './NavItems';
import { Navigation } from './Navigation/Navigation';

export function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true });

  return (
    <AppBar
      color="primary"
      data-testid="app-header"
      position="sticky"
      sx={{ mb: 1 }}
    >
      <Toolbar data-testid="app-header-toolbar">
        <Title />
        <Navigation />
        <Box sx={{ flexGrow: 1 }} />

        {mdUp ? (
          <AuthButton />
        ) : (
          <MobileNav
            data-testid="mobile-nav"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            nav={NavItems}
            setAnchorEl={setAnchorEl}
          />
        )}
      </Toolbar>
    </AppBar>
  );
}
