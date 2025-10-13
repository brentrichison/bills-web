export const OidcConfig = {
  authority: import.meta.env.VITE_OIDC_AUTHORITY,
  client_id: import.meta.env.VITE_OIDC_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_OIDC_REDIRECT_URI,
  silent_redirect_uri: import.meta.env.VITE_OIDC_SILENT_REDIRECT_URI,
  post_logout_redirect_uri: import.meta.env.VITE_OIDC_POST_LOGOUT_REDIRECT_URI,
  scope: import.meta.env.VITE_OIDC_SCOPES,
  response_type: 'code',
  automaticSilentRenew: true,
  loadUserInfo: false,
  extraQueryParams: { audience: import.meta.env.VITE_OIDC_AUDIENCE },
};
