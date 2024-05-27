import { AxiosResponse } from 'axios';
import useSWRInfinite from 'swr/infinite';

import { swrGetFetcher } from '@/lib/axios';
import { BoardType, ResponsePostType } from '@/types/community/type';

const getKey = (size: number, previousPageData: ResponsePostType, postType: BoardType) => {
  if (size === 0) {
    return `/${postType}/posts/my-posts?page=${size}&size=10&sortKey=id`;
  }
  if (previousPageData && !previousPageData.result.hasNext) {
    return `/${postType}/posts/my-posts?page=${size}&size=10&sortKey=id`;
  }
  if (previousPageData.result.hasNext) {
    return null;
  }
};
const useGetUserPosts = (postType: BoardType) => {
  const { data, isLoading, error, size, setSize, mutate } = useSWRInfinite<AxiosResponse<ResponsePostType>>(
    (pageIndex, previousPageData) => getKey(pageIndex, previousPageData, postType),
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
    mutate,
    size,
    setSize,
  };
};
export default useGetUserPosts;
