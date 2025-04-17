import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { AverageSubjectInfoResponseType, AverageSubjectInfoType } from '@/types/home/type';

const useAverageSubjectInfo = (certificateId: number) => {
  const { data, error } = useSWR<AverageSubjectInfoResponseType>(
    `/api/v2/certificates/${certificateId}/mock-exam-results/average`,
    swrGetFetcher,
    {
      shouldRetryOnError: false, // ❗️에러 발생 시 재요청 방지
      revalidateOnFocus: false, // ❗️탭 전환 시 자동 재요청 방지 (원하는 경우)
    },
  );

  const parseResultList = data?.result.map((item: AverageSubjectInfoType) => item).flat();

  return {
    averageSubjectList: parseResultList,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useAverageSubjectInfo;
