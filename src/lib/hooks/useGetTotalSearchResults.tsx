import { AxiosResponse } from 'axios';
import useSWRInfinite from 'swr/infinite';

import { swrGetFetcher } from '@/lib/axios';
import { BoardType, ResponsePostType } from '@/types/community/type';

const getKey = (
  size: number,
  previousPageData: ResponsePostType,
  postType: BoardType,
  certificateId: number,
  sortKey: string,
) => {
  if (size === 0 && postType !== 'REVIEW') {
    return `/certificates/${certificateId}/search?postType=${postType}&page=${size}&size=10&sortKey=${sortKey}`;
  }
  if (previousPageData && !previousPageData.result.hasNext && postType !== 'REVIEW') {
    return `/certificates/${certificateId}/search?postType=${postType}&page=${size}&size=10&sortKey=${sortKey}`;
  }
  if (previousPageData.result.hasNext && postType !== 'REVIEW') {
    return null;
  }
};
const useGetTotalSearchResults = (postType: BoardType, certificateId: number, sortKey: string) => {
  const { data, isLoading, error, size, setSize, mutate } = useSWRInfinite<AxiosResponse<ResponsePostType>>(
    (pageIndex, previousPageData) => getKey(pageIndex, previousPageData, postType, certificateId, sortKey),
    swrGetFetcher,
    {
      revalidateAll: true,
    },
  );

  const parseResultList = data ? data.map((item) => item).flat() : [];

  return {
    userPostsList: data ? data : [],
    isLoading: !error && !data,
    isError: error,
    size,
    setSize,
    mutate,
  };
};
export default useGetTotalSearchResults;
