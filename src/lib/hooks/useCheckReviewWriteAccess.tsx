import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { ResponseType } from '@/types/common/type';

const useCheckReviewWriteAccess = (certificateId: number) => {
  const { data, error } = useSWR<ResponseType<boolean>>(
    `/api/v2/certificates/${certificateId}/check-reviews`,
    swrGetFetcher,
  );

  return {
    reviewWriteAccess: data ? data : null,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useCheckReviewWriteAccess;
