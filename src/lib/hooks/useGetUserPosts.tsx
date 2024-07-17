import useSWRInfinite from 'swr/infinite';

import { swrGetFetcher } from '@/lib/axios';
import { BoardType, SortDirections } from '@/types/community/type';
import { MyPostsResponseType } from '@/types/mypage/type';

const getKey = (
  size: number,
  previousPageData: MyPostsResponseType,
  postType: BoardType,
  sortDirections: SortDirections,
) => {
  if (size === 0) {
    return `/${postType}/posts/my-posts?page=${size}&size=10&sortKey=createdAt, id&$sortDirections=${sortDirections}`;
  }
  if (previousPageData && !previousPageData.result.hasNext) {
    return `/${postType}/posts/my-posts?page=${size}&size=10&sortFields=createdAt, id&$sortDirections=${sortDirections}`;
  }
  if (previousPageData.result.hasNext) {
    return null;
  }
};
const useGetUserPosts = (postType: BoardType, sortDirections: SortDirections) => {
  const { data, isLoading, error, size, setSize, mutate } = useSWRInfinite<MyPostsResponseType>(
    (pageIndex, previousPageData) => getKey(pageIndex, previousPageData, postType, sortDirections),
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
