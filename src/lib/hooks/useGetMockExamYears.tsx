import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { MockExamsYearResponseType } from '@/types/community/type';

const useGetMockExamYears = (certificationId: number) => {
  const { data, isLoading, error } = useSWR<MockExamsYearResponseType>(
    `/api/v2/certificates/${certificationId}/exam-years`,
    swrGetFetcher,
    {
      shouldRetryOnError: false, // ❗️에러 발생 시 재요청 방지
      revalidateOnFocus: false, // ❗️탭 전환 시 자동 재요청 방지 (원하는 경우)
    },
  );

  return {
    examYears: data?.result,
    examYearsIsLoading: !error && !data,
    isError: error,
  };
};
export default useGetMockExamYears;
