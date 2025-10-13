import { useEffect } from 'react';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';

export const OidcCallback = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      const url =
        (auth.user as unknown as { state?: { returnTo?: string } })?.state
          ?.returnTo || '/calendar';
      navigate(url, { replace: true });
    }
  }, [auth.isAuthenticated, auth.user, navigate]);

  return <p>Completing sign-in…</p>;
};
