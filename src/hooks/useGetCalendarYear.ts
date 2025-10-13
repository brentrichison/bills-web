import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from 'react-oidc-context';
import { attachBearer } from '@api/client';
import type { CalendarYearType } from '@/models/types';

export const useGetCalendarYear = (year: number) => {
  const { user } = useAuth();
  const token = user?.access_token;
  const api = useMemo(() => attachBearer(token), [token]);

  return useQuery<CalendarYearType, Error>({
    queryKey: ['calendar', 'year', year],
    enabled: !!token,
    queryFn: async () => (await api.get(`/calendar/year/${year}`)).data,
    staleTime: 0,
  });
};
