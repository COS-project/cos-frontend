import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';

const useGetMockExamStatistics = (
  certificateId: number,
  reportType: string,
  year: string,
  month: number,
  weekOfMonth: number,
) => {
  const { data, error } = useSWR<AxiosResponse>(
    `/certificates/${certificateId}/mock-exam-result/${reportType}/statistics?year=${year}&month=${month}&weekOfMonth=${weekOfMonth}`,
    swrGetFetcher,
  );

  return {
    statisticsData: data?.result,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGetMockExamStatistics;
