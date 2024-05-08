import { AxiosResponse } from 'axios';
import useSWRInfinite from 'swr/infinite';

import { swrGetFetcher } from '@/lib/axios';
import { BoardType, ResponsePostType } from '@/types/community/type';

const getKey = (size: number, previousPageData: ResponsePostType, postType: BoardType, certificateId: number) => {
  if (size === 0) {
    return `/certificates/${certificateId}/search?postType=${postType}&page=${size}&size=10&sortKey=id`;
  }
  if (previousPageData && !previousPageData.result.hasNext) {
    return `/certificates/${certificateId}/search?postType=${postType}&page=${size}&size=10&sortKey=id`;
  }
  if (previousPageData.result.hasNext) {
    return null;
  }
};
const useGetTotalSearchResults = (postType: BoardType, certificateId: number) => {
  const { data, isLoading, error, size, setSize } = useSWRInfinite<AxiosResponse<ResponsePostType>>(
    (pageIndex, previousPageData) => getKey(pageIndex, previousPageData, postType, certificateId),
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
  };
};
export default useGetTotalSearchResults;
