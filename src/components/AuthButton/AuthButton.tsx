import { DEFAULT_RETURN_TO } from '@/auth/helpers';
import { Button } from '@mui/material';
import { useAuth } from 'react-oidc-context';

export const AuthButton = () => {
  const auth = useAuth();

  const handleClick = async () => {
    if (auth.isAuthenticated) {
      await auth.removeUser();

      const domain = import.meta.env.VITE_OIDC_AUTHORITY!;
      const clientId = import.meta.env.VITE_OIDC_CLIENT_ID!;
      const returnTo = window.location.origin;

      window.location.assign(
        `https://${domain}/v2/logout?client_id=${clientId}&returnTo=${encodeURIComponent(
          returnTo
        )}`
      );
    } else
      await auth.signinRedirect({ state: { returnTo: DEFAULT_RETURN_TO } });
  };

  return (
    <Button
      color="inherit"
      data-testid="auth-button"
      disabled={auth?.isLoading}
      name="auth-button"
      variant="outlined"
      sx={{ display: { xs: 'none', md: 'inline-flex' } }}
      onClick={handleClick}
    >
      {auth?.isAuthenticated ? 'Logout' : 'Login'}
    </Button>
  );
};
