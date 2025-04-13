import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { MockExamsYearResponseType } from '@/types/community/type';

const useGetMockExamYears = () => {
  const { data, isLoading, error } = useSWR<MockExamsYearResponseType>(
    '/api/v2/certificates/1/exam-years',
    swrGetFetcher,
  );

  return {
    examYears: data?.result,
    examYearsIsLoading: !error && !data,
    isError: error,
  };
};
export default useGetMockExamYears;
