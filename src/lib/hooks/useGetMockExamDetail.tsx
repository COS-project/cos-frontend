import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';

const useGetMockExamDetail = (dateType: string, year: number, month: number, weekOfMonth: number, date: string) => {
  const { data, error } = useSWR<AxiosResponse>(
    `/certificates/1/mock-exam-results/${dateType}?year=${year}&month=${month}&weekOfMonth=${weekOfMonth}&date=${date}?page=0&size=4`,
    swrGetFetcher,
  );

  return {
    statisticsDetailData: data?.result,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGetMockExamDetail;
