import { useMemo } from 'react';
import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { useAuth } from 'react-oidc-context';
import { attachBearer } from '@api/client';

export function useDeleteAccount(): UseMutationResult<number, Error, number> {
  const { user } = useAuth();
  const api = useMemo(
    () => attachBearer(user?.access_token),
    [user?.access_token]
  );

  return useMutation<number, Error, number>({
    mutationFn: async (id) => {
      const res = await api.delete('/accounts/delete-account', {
        params: { accountId: id },
      });

      return res.data;
    },
  });
}
