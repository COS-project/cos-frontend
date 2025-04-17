import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { RecentMockExamResultResponseType } from '@/types/exam/type';

const useGetExamResultRecent = (mockExamId: number) => {
  const { data, error, isLoading } = useSWR<RecentMockExamResultResponseType>(
    `/api/v2/mock-exams/${mockExamId}/mock-exam-results/recent`,
    swrGetFetcher,
    {
      shouldRetryOnError: false, // ❗️에러 발생 시 재요청 방지
      revalidateOnFocus: false, // ❗️탭 전환 시 자동 재요청 방지 (원하는 경우)
    },
  );

  return {
    examResultRecent: data ? data.result : undefined,
    examResultRecentIsLoading: !error && !data,
    isError: error,
  };
};
export default useGetExamResultRecent;
