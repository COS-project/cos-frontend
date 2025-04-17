import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { ResponseType } from '@/types/common/type';

const useCheckReviewPeriod = (certificateId: number) => {
  const { data, error } = useSWR<ResponseType<boolean>>(
    `/api/v2/certificates/${certificateId}/check-review-period`,
    swrGetFetcher,
  );

  return {
    checkReviewPeriod: data,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useCheckReviewPeriod;
