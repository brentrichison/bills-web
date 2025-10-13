import { useEffect, useRef } from 'react';
import { useAuth } from 'react-oidc-context';
import { useLocation } from 'react-router-dom';
import type { JSX } from 'react';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();
  const loc = useLocation();
  const started = useRef(false);
  const isOidcRoute = loc.pathname.startsWith('/oidc-');

  useEffect(() => {
    if (
      isOidcRoute ||
      auth.isAuthenticated ||
      auth.isLoading ||
      auth.activeNavigator ||
      auth.error ||
      started.current
    )
      return;

    started.current = true;
    const returnTo = loc.pathname + loc.search + loc.hash;
    auth.signinRedirect({ state: { returnTo } }).catch(() => {
      started.current = false;
    });
  }, [
    isOidcRoute,
    auth,
    auth.isAuthenticated,
    auth.isLoading,
    auth.activeNavigator,
    auth.error,
    loc.pathname,
    loc.search,
    loc.hash,
  ]);

  if (auth.isLoading || auth.activeNavigator) return <p>Loading…</p>;
  if (auth.error) {
    return (
      <div>
        <p>Auth error: {String(auth.error)}</p>
        <button
          onClick={() => {
            started.current = false;
            auth
              .signinRedirect({
                state: { returnTo: loc.pathname + loc.search + loc.hash },
              })
              .catch(console.error);
          }}
        >
          Try sign-in again
        </button>
      </div>
    );
  }
  if (!auth.isAuthenticated) return <p>Redirecting…</p>;

  return children;
};
