import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { MockExamsByYearResponseType } from '@/types/community/type';

const useGetMockExams = (certificateId: number, year: number | string | undefined | null) => {
  const { data, error, isLoading } = useSWR<MockExamsByYearResponseType>(
    `/api/v2/certificates/${certificateId}/mock-exams?${year === '전체' ? '' : `examYear=${year}`}`,
    swrGetFetcher,
    {
      shouldRetryOnError: false, // ❗️에러 발생 시 재요청 방지
      revalidateOnFocus: false, // ❗️탭 전환 시 자동 재요청 방지 (원하는 경우)
    },
  );

  return {
    mockExams: data?.result,
    mockExamsIsLoading: !error && !data,
    isError: error,
  };
};
export default useGetMockExams;
