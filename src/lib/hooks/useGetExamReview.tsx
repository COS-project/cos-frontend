import { AxiosResponse } from 'axios';
import useSWRInfinite from 'swr/infinite';

import { swrGetFetcher } from '@/lib/axios';
import { BoardType, ResponsePostType, ResponseReviewPost } from '@/types/community/type';

const getKey = (size: number, previousPageData: ResponsePostType, certificateId: number) => {
  if (size === 0) {
    return `/certificates/${certificateId}/exam-reviews?page=${size}&size=10`;
  }
  if (previousPageData && !previousPageData.result.hasNext) {
    return `/certificates/${certificateId}/exam-reviews?page=${size}&size=10`;
  }
  if (previousPageData.result.hasNext) {
    return null;
  }
};
const useGetExamReview = (certificateId: number) => {
  const { data, isLoading, error, size, setSize, mutate } = useSWRInfinite<AxiosResponse<ResponseReviewPost>>(
    (pageIndex, previousPageData) => getKey(pageIndex, previousPageData, certificateId),
    swrGetFetcher,
    {
      revalidateAll: true,
    },
  );

  return {
    examReviews: data ? data : [],
    isLoading: !error && !data,
    isError: error,
    size,
    setSize,
    mutate,
  };
};
export default useGetExamReview;
