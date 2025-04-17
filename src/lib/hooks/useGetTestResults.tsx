import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { MockExamResultsResponseType, MockExamResultType } from '@/types/exam/type';

const useGetTestResults = (mockExamId: number) => {
  const { data, error, mutate } = useSWR<MockExamResultsResponseType>(
    `/api/v2/mock-exams/${mockExamId}`,
    swrGetFetcher,
    {
      shouldRetryOnError: false, // ❗️에러 발생 시 재요청 방지
      revalidateOnFocus: false, // ❗️탭 전환 시 자동 재요청 방지 (원하는 경우)
    },
  );

  const parseResultList = data?.result.map((item: MockExamResultType) => item).flat();

  return {
    examResults: data ? parseResultList : null,
    isLoading: !error && !data,
    isError: error,
    examResultMutate: mutate,
  };
};
export default useGetTestResults;
