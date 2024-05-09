import { AxiosResponse } from 'axios';
import useSWRInfinite from 'swr/infinite';

import { swrGetFetcher } from '@/lib/axios';
import { ResponsePostType } from '@/types/community/type';

const getKey = (
  size: number,
  previousPageData: ResponsePostType,
  certificateId: number,
  examYear: number,
  round: number,
  questionSequence: number,
) => {
  if (size === 0) {
    return `/certificates/${certificateId}/posts?examYear=${examYear}&round=${round}&questionSequence=${questionSequence}&page=${size}&size=10&sortKey=id`;
  }
  if (previousPageData && !previousPageData.result.hasNext) {
    return `/certificates/${certificateId}/posts?examYear=${examYear}&round=${round}&questionSequence=${questionSequence}&page=${size}&size=10&sortKey=id`;
  }
  if (previousPageData.result.hasNext) {
    return null;
  }
};
const useGetCommentarySearchResults = (
  certificateId: number,
  examYear: number,
  round: number,
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

  const parseResultList = data ? data.map((item) => item).flat() : [];

  return {
    commentarySearchResults: data ? data : [],
    isLoading: !error && !data,
    isError: error,
    size,
    setSize,
  };
};
export default useGetCommentarySearchResults;
