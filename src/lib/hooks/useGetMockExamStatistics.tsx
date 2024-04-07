import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';

const useGetMockExamStatistics = (reportType: string, year: number, month: number, weekOfMonth: number) => {
  const { data, error } = useSWR<AxiosResponse>(
    `/certificates/1/mock-exam-results/${reportType}/statistics?year=${year}&month=${month}&weekOfMonth=${weekOfMonth}`,
    swrGetFetcher,
  );

  return {
    statisticsData: data?.result,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGetMockExamStatistics;
