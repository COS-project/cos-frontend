import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { AverageSubjectInfoResponseType, AverageSubjectInfoType } from '@/types/home/type';

const useAverageSubjectInfo = (certificateId: number | null) => {
  const shouldFetch = certificateId !== null;
  const { data, error } = useSWR<AverageSubjectInfoResponseType>(
    shouldFetch ? `/api/v2/certificates/${certificateId}/mock-exam-results/average` : null,
    swrGetFetcher,
    {
      shouldRetryOnError: false, // ❗️에러 발생 시 재요청 방지
      revalidateOnFocus: false, // ❗️탭 전환 시 자동 재요청 방지 (원하는 경우)
    },
  );

  const parseResultList = data?.result.map((item: AverageSubjectInfoType) => item).flat();

  return {
    averageSubjectList: parseResultList,
    isLoading: shouldFetch && !error && !data,
    isError: error,
  };
};
export default useAverageSubjectInfo;
