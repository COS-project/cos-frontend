import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';

const useGetMockExamDetail = (
  dateType: string,
  year: string,
  month: number | undefined,
  weekOfMonth: number | undefined,
  date: string | undefined,
) => {
  const { data, error } = useSWR<AxiosResponse>(
    `/certificates/1/mock-exam-results/${dateType}?${year ? `year=${year}` : ''}${month ? `&month=${month}` : ''}${weekOfMonth ? `&weekOfMonth=${weekOfMonth}` : ''}${date ? `&date=${date}` : ''}&page=0&size=10`,
    swrGetFetcher,
  );

  return {
    statisticsDetailData: data?.result,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGetMockExamDetail;
