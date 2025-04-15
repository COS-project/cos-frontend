import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { RecentMockExamResultResponseType } from '@/types/exam/type';

const useGetExamResultRecent = (mockExamId: number) => {
  const { data, error, isLoading } = useSWR<RecentMockExamResultResponseType>(
    `/api/v2/mock-exams/${mockExamId}/mock-exam-results/recent`,
    swrGetFetcher,
  );

  return {
    examResultRecent: data ? data.result : undefined,
    examResultRecentIsLoading: !error && !data,
    isError: error,
  };
};
export default useGetExamResultRecent;
