import { useMemo } from 'react';
import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query';
import { useAuth } from 'react-oidc-context';
import { attachBearer } from '@api/client';
import type { BillType } from '@/models/types';

export function useUpdateBill(): UseMutationResult<BillType, Error, BillType> {
  const { user } = useAuth();
  const qc = useQueryClient();

  const api = useMemo(
    () => attachBearer(user?.access_token),
    [user?.access_token]
  );

  return useMutation<BillType, Error, BillType>({
    mutationFn: async (body) => {
      const { id, ...rest } = body;
      const res = await api.put(`/bills/update-bill/${id}`, rest);
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['bills'] });
    },
  });
}
