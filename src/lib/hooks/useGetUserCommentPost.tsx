import { AxiosResponse } from 'axios';
import useSWRInfinite from 'swr/infinite';

import { swrGetFetcher } from '@/lib/axios';
import { BoardType, ResponsePostType, SortDirections } from '@/types/community/type';

const getKey = (size: number, previousPageData: ResponsePostType, sortDirections: SortDirections) => {
  if (size === 0) {
    return `/comment-posts/my-comment-posts?page=${size}&size=10&sortKey=createdAt, id&$sortDirections=${sortDirections}`;
  }
  if (previousPageData && !previousPageData.result.hasNext) {
    return `/comment-posts/my-comment-posts?page=${size}&size=10&sortFields=createdAt, id&$sortDirections=${sortDirections}`;
  }
  if (previousPageData.result.hasNext) {
    return null;
  }
};
const useGetUserCommentPost = (sortDirections: '최신순' | '작성순') => {
  const { data, isLoading, error, size, setSize, mutate } = useSWRInfinite<ResponsePostType>(
    (pageIndex, previousPageData) => getKey(pageIndex, previousPageData, postType, sortDirections),
    swrGetFetcher,
    {
      revalidateAll: true,
    },
  );

  const parseResultList = data ? data.map((item) => item).flat() : [];

  return {
    userCommentPostsList: data ? data : [],
    isLoading: !error && !data,
    isError: error,
    mutate,
    size,
    setSize,
  };
};
export default useGetUserCommentPost;
