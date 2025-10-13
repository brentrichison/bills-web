import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from 'react-oidc-context';
import { attachBearer } from '@api/client';
import type { AccountType } from '@/models/types';

export const useGetAllAccounts = () => {
  const { user } = useAuth();
  const token = user?.access_token;
  const api = useMemo(() => attachBearer(token), [token]);

  return useQuery<AccountType[], Error>({
    queryKey: ['all-accounts'],
    enabled: !!token,
    queryFn: async () => (await api.get('/accounts/all-accounts')).data,
    staleTime: 0,
  });
};
