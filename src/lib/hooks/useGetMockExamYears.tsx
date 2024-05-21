import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { useEffect } from 'react';

const useGetMockExamYears = () => {
  const { data, error } = useSWR<AxiosResponse>('/certificates/1/exam-years', swrGetFetcher);

  useEffect(() => {
    if (data && Array.isArray(data?.result) && !data?.result.includes('전체')) {
      data.result.unshift('전체');
    }
  }, [data]);

  return {
    examYears: data?.result,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGetMockExamYears;
