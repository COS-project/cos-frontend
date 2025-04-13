import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { MockExamsByYearResponseType } from '@/types/community/type';

const useGetMockExams = (certificateId: number, year: number | string | undefined | null) => {
  const { data, error, isLoading } = useSWR<MockExamsByYearResponseType>(
    `/api/v2/certificates/${certificateId}/mock-exams?${year === '전체' ? '' : `examYear=${year}`}`,
    swrGetFetcher,
  );

  return {
    mockExams: data?.result,
    mockExamsIsLoading: !error && !data,
    isError: error,
  };
};
export default useGetMockExams;
