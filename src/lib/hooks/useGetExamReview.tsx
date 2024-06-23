import useSWRInfinite from 'swr/infinite';

import { swrGetFetcher } from '@/lib/axios';
import { ExamDifficulty, ResponseReviewPost } from '@/types/community/type';

const getKey = (
  size: number,
  previousPageData: ResponseReviewPost | null,
  certificateId: number,
  examDifficulty: ExamDifficulty | undefined,
  startMonths: number | undefined,
  endPreMonths: number | undefined,
) => {
  if (size === 0) {
    return `/certificates/${certificateId}/exam-reviews?page=${size}&size=10${
      startMonths ? `&startMonths=${startMonths}` : ''
    }${endPreMonths ? `&endPreMonths=${endPreMonths}` : ''}${
      examDifficulty ? `&examDifficulty=${examDifficulty}` : ''
    }`;
  }
  if (previousPageData && !previousPageData.result.hasNext) {
    return `/certificates/${certificateId}/exam-reviews?page=${size}&size=10${
      startMonths ? `&startMonths=${startMonths}` : ''
    }${endPreMonths ? `&endPreMonths=${endPreMonths}` : ''}${
      examDifficulty ? `&examDifficulty=${examDifficulty}` : ''
    }`;
  }
  if (previousPageData?.result.hasNext) {
    return null;
  }
};
const useGetExamReview = (
  certificateId: number,
  examDifficulty: ExamDifficulty | undefined,
  startMonths: number | undefined,
  endPreMonths: number | undefined,
) => {
  const { data, isLoading, error, size, setSize, mutate } = useSWRInfinite<ResponseReviewPost>(
    (pageIndex, previousPageData) =>
      getKey(pageIndex, previousPageData, certificateId, examDifficulty, startMonths, endPreMonths),
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
