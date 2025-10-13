import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from 'react-oidc-context';
import { attachBearer } from '@api/client';
import type { BillType } from '@/models/types';

export const useGetAllBills = () => {
  const { user } = useAuth();
  const token = user?.access_token;
  const api = useMemo(() => attachBearer(token), [token]);

  return useQuery<BillType[], Error>({
    queryKey: ['bills', 'all'],
    enabled: !!token,
    queryFn: async () => (await api.get('/bills/all-bills')).data,
    staleTime: 0,
  });
};
