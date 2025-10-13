import { useMemo } from 'react';
import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query';
import { useAuth } from 'react-oidc-context';
import { attachBearer } from '@api/client';
import type { AccountType } from '@/models/types';

export function useUpdateAccount(): UseMutationResult<
  AccountType,
  Error,
  AccountType
> {
  const { user } = useAuth();
  const qc = useQueryClient();

  const api = useMemo(
    () => attachBearer(user?.access_token),
    [user?.access_token]
  );

  return useMutation<AccountType, Error, AccountType>({
    mutationFn: async (body) => {
      const { id, ...rest } = body;
      const res = await api.put(`/accounts/update-account/${id}`, rest);
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['accounts'] });
    },
  });
}
