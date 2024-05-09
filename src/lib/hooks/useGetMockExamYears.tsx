import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';

const useGetMockExamYears = () => {
  const { data, error } = useSWR<AxiosResponse>('/certificates/1/exam-years', swrGetFetcher);

  return {
    examYears: data?.result,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGetMockExamYears;
