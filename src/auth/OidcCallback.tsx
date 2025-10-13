import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_RETURN_TO } from './helpers';

export const OidcCallback = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isLoading || !auth.isAuthenticated) return;
    const url =
      (auth.user as unknown as { state?: { returnTo?: string } })?.state
        ?.returnTo ?? DEFAULT_RETURN_TO;
    navigate(url, { replace: true });
  }, [auth.isLoading, auth.isAuthenticated, auth.user, navigate]);

  return <Typography>Completing sign-in…</Typography>;
};
