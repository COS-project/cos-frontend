import { AxiosResponse } from 'axios';
import useSWRInfinite from 'swr/infinite';

import { swrGetFetcher } from '@/lib/axios';
import { ResponsePostType } from '@/types/community/type';

const getKey = (
  size: number,
  previousPageData: ResponsePostType,
  certificateId: number,
  examYear: number | string,
  round: number | string,
  questionSequence: number,
) => {
  if (examYear === '전체') {
    return `/certificates/${certificateId}/posts?&page=${size}&size=10`;
  }
  if (examYear !== '전체' && round === '전체') {
    return `/certificates/${certificateId}/posts?examYear=${examYear}&page=${size}&size=10`;
  }
  if (examYear !== '전체' && round !== '전체' && questionSequence === undefined && size === 0) {
    return `/certificates/${certificateId}/posts?examYear=${examYear}&round=${round}&page=${size}&size=10`;
  }
  if (examYear !== '전체' && round !== '전체' && questionSequence !== undefined && size === 0) {
    return `/certificates/${certificateId}/posts?examYear=${examYear}&round=${round}&questionSequence=${questionSequence}&page=${size}&size=10`;
  }
  if (
    examYear !== '전체' &&
    round !== '전체' &&
    questionSequence !== undefined &&
    previousPageData &&
    !previousPageData.result.hasNext
  ) {
    return `/certificates/${certificateId}/posts?examYear=${examYear}&round=${round}&questionSequence=${questionSequence}&page=${size}&size=10`;
  }
  if (previousPageData.result.hasNext) {
    return null;
  }
};
const useGetCommentarySearchResults = (
  certificateId: number,
  examYear: number | string,
  round: number | string,
  questionSequence: number,
) => {
  const { data, isLoading, error, size, setSize } = useSWRInfinite<AxiosResponse<ResponsePostType>>(
    (pageIndex, previousPageData) =>
      getKey(pageIndex, previousPageData, certificateId, examYear, round, questionSequence),
    swrGetFetcher,
    {
      revalidateAll: true,
    },
  );

  return {
    commentarySearchResults: data ? data : [],
    isLoading: !error && !data,
    isError: error,
    size,
    setSize,
  };
};
export default useGetCommentarySearchResults;
