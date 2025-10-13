import { useMemo } from 'react';
import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { useAuth } from 'react-oidc-context';
import { attachBearer } from '@api/client';
import type { AccountType } from '@/models/types';

export function useCreateAccount(): UseMutationResult<
  AccountType,
  Error,
  AccountType
> {
  const { user } = useAuth();
  const api = useMemo(
    () => attachBearer(user?.access_token),
    [user?.access_token]
  );

  return useMutation<AccountType, Error, AccountType>({
    mutationFn: async (body) => {
      const res = await api.post('/accounts/create-account', body);
      return res.data;
    },
  });
}
