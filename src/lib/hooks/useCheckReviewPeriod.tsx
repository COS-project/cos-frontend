import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { ResponseType } from '@/types/common/type';

const useCheckReviewPeriod = (certificateId: number) => {
  const { data, error } = useSWR<ResponseType<boolean>>(
    `/api/v2/certificates/${certificateId}/check-review-period`,
    swrGetFetcher,
    {
      shouldRetryOnError: false, // ❗️에러 발생 시 재요청 방지
      revalidateOnFocus: false, // ❗️탭 전환 시 자동 재요청 방지 (원하는 경우)
    },
  );

  return {
    checkReviewPeriod: data,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useCheckReviewPeriod;
