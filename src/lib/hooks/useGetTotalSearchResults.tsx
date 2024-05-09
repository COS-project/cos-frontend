import { AxiosResponse } from 'axios';
import useSWRInfinite from 'swr/infinite';

import { swrGetFetcher } from '@/lib/axios';
import { BoardType, ResponsePostType } from '@/types/community/type';

const getKey = (
  size: number,
  previousPageData: ResponsePostType,
  postType: BoardType,
  certificateId: number,
  sortField: string,
) => {
  if (sortField === 'createdAt' && size === 0 && postType !== 'REVIEW') {
    return `/certificates/${certificateId}/search?postType=${postType}&page=${size}&size=10`;
  }
  if (sortField === 'likeCount' && size === 0 && postType !== 'REVIEW') {
    return `/certificates/${certificateId}/search?postType=${postType}&page=${size}&size=10&sortFields=${sortField}`;
  }
  if (sortField === 'createdAt' && previousPageData && !previousPageData.result.hasNext && postType !== 'REVIEW') {
    return `/certificates/${certificateId}/search?postType=${postType}&page=${size}&size=10`;
  }
  if (sortField === 'likeCount' && previousPageData && !previousPageData.result.hasNext && postType !== 'REVIEW') {
    return `/certificates/${certificateId}/search?postType=${postType}&page=${size}&size=10&sortFields=${sortField}`;
  }
  if (previousPageData.result.hasNext && postType !== 'REVIEW') {
    return null;
  }
};
const useGetTotalSearchResults = (postType: BoardType, certificateId: number, sortField: string) => {
  const { data, isLoading, error, size, setSize, mutate } = useSWRInfinite<AxiosResponse<ResponsePostType>>(
    (pageIndex, previousPageData) => getKey(pageIndex, previousPageData, postType, certificateId, sortField),
    swrGetFetcher,
    {
      revalidateAll: true,
    },
  );
  
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
