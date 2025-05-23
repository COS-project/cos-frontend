import useSWRInfinite from 'swr/infinite';

import { swrGetFetcher } from '@/lib/axios';
import { ResponseType } from '@/types/common/type';
import { ExamDifficulty, ResponseReviewPost } from '@/types/community/type';

const getKey = (
  pageIndex: number,
  previousPageData: ResponseType<ResponseReviewPost> | null,
  certificateId: number,
  examDifficulty: ExamDifficulty | undefined,
  startMonths: number | undefined,
  endPreMonths: number | undefined,
) => {
  if (pageIndex === 0) {
    return `/api/v2/certificates/${certificateId}/exam-reviews?page=${pageIndex}&size=10${
      startMonths ? `&startMonths=${startMonths}` : ''
    }${endPreMonths ? `&endPreMonths=${endPreMonths}` : ''}${
      examDifficulty ? `&examDifficulty=${examDifficulty}` : ''
    }`;
  }

  if (!previousPageData) return null;

  if (previousPageData?.result.hasNext) {
    return `/api/v2/certificates/${certificateId}/exam-reviews?page=${pageIndex}&size=10${
      startMonths ? `&startMonths=${startMonths}` : ''
    }${endPreMonths ? `&endPreMonths=${endPreMonths}` : ''}${
      examDifficulty ? `&examDifficulty=${examDifficulty}` : ''
    }`;
  }

  return null;
};
const useGetExamReview = (
  certificateId: number,
  examDifficulty: ExamDifficulty | undefined,
  startMonths: number | undefined,
  endPreMonths: number | undefined,
) => {
  const { data, isLoading, error, size, setSize, mutate } = useSWRInfinite<ResponseType<ResponseReviewPost>>(
    (pageIndex, previousPageData) =>
      getKey(pageIndex, previousPageData, certificateId, examDifficulty, startMonths, endPreMonths),
    swrGetFetcher,
    {
      revalidateAll: true,
      shouldRetryOnError: false, // ❗️에러 발생 시 재요청 방지
      revalidateOnFocus: false, // ❗️탭 전환 시 자동 재요청 방지 (원하는 경우)
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
