import { useMemo } from 'react';
import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { useAuth } from 'react-oidc-context';
import { attachBearer } from '@api/client';
import type { BillType } from '@/models/types';

export function useCreateBill(): UseMutationResult<BillType, Error, BillType> {
  const { user } = useAuth();
  const api = useMemo(
    () => attachBearer(user?.access_token),
    [user?.access_token]
  );

  return useMutation<BillType, Error, BillType>({
    mutationFn: async (body) => {
      const res = await api.post('/bills/create-bill', body);
      return res.data;
    },
  });
}
