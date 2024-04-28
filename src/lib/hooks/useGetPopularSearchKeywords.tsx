import { AxiosResponse } from 'axios';
import { useState } from 'react';
import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { Certificate } from '@/types/global';

const useGetPopularSearchKeywords = () => {
  const [lastFetchedTime, setLastFetchedTime] = useState<Date | null>(null);
  const { data, error } = useSWR<AxiosResponse>('/certificates/1/recent-top5-keywords', swrGetFetcher, {
    refreshInterval: 1_800_000, // 1_800_000 30분을 밀리초로 변환
    onSuccess: () => {
      // 데이터가 성공적으로 불러와질 때마다 현재 시간 기록
      setLastFetchedTime(new Date());
    },
  });

  const parseResultList = data?.result.map((item: Certificate) => item).flat();

  return {
    popularSearchKeywords: parseResultList,
    lastFetchedTime,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGetPopularSearchKeywords;
