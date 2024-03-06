import { AxiosResponse } from 'axios';
import useSWRInfinite from 'swr/infinite';

import { swrGetFetcher } from '@/lib/axios';
import { ReviewIncorrectAnswers } from '@/types/global';

const getKey = (size: number, previousPageData: ReviewIncorrectAnswers) => {
  if (size === 0) {
    return `/certificates/1/user-answers/wrong-answers?page=${size}&size=10`;
  }
  if (previousPageData && !previousPageData.result.last) {
    return `/certificates/1/user-answers/wrong-answers?page=${size}&size=10`;
  }
  if (previousPageData.result.last) {
    return null;
  }
};
const useAllIncorrectQuestions = () => {
  const { data, isLoading, error, size, setSize } = useSWRInfinite<AxiosResponse<ReviewIncorrectAnswers>>(
    getKey,
    swrGetFetcher,
    {
      revalidateAll: true,
    },
  );

  const parseResultList = data ? data.map((item) => item).flat() : null;

  return {
    incorrectQuestions: parseResultList ? parseResultList : [],
    isLoading: !error && !data,
    isError: error,
    size,
    setSize,
  };
};
export default useAllIncorrectQuestions;
