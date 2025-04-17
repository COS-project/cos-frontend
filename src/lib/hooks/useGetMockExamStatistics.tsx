import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { ExamStaticsDataResponseType } from '@/types/home/type';

const useGetMockExamStatistics = (
  certificateId: number,
  reportType: string,
  year: string | number,
  month: number,
  weekOfMonth: number,
) => {
  const { data, error, mutate } = useSWR<ExamStaticsDataResponseType>(
    `/api/v2/certificates/${certificateId}/mock-exam-result/${reportType}/statistics?year=${year}&month=${month}&weekOfMonth=${weekOfMonth}`,
    swrGetFetcher,
    {
      shouldRetryOnError: false, // ❗️에러 발생 시 재요청 방지
      revalidateOnFocus: false, // ❗️탭 전환 시 자동 재요청 방지 (원하는 경우)
    },
  );

  return {
    statisticsData: data?.result,
    mutate: mutate,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGetMockExamStatistics;
