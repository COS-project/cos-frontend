import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { MockExamResultsResponseType, MockExamResultType } from '@/types/exam/type';

const useGetExamResults = (mockExamId: number) => {
  const { data, error } = useSWR<MockExamResultsResponseType>(`/mock-exams/${mockExamId}`, swrGetFetcher);

  const parseResultList = data?.result.map((item: MockExamResultType) => item).flat();

  return {
    examResults: data ? parseResultList : null,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGetExamResults;
