import useSWRInfinite from 'swr/infinite';

import { swrGetFetcher } from '@/lib/axios';
import { ResponseType } from '@/types/common/type';
import { BoardType, ResponsePostType, SortFieldType } from '@/types/community/type';

const getKey = (
  pageIndex: number,
  previousPageData: ResponseType<ResponsePostType> | null,
  postType: BoardType,
  certificateId: number,
  sortField: SortFieldType,
) => {
  // 초기 요청 또는 이전 페이지 데이터가 없을 때
  if (pageIndex === 0) {
    return sortField === 'createdAt'
      ? `/api/v2/certificates/${certificateId}/posts?postType=${postType}&page=${pageIndex}&size=10`
      : `/api/v2/certificates/${certificateId}/posts?postType=${postType}&page=${pageIndex}&size=10&sortFields=${sortField}, id`;
  }

  // 이전 페이지 데이터가 없으면 종료
  if (!previousPageData) return null;

  // 이전 페이지에 더 많은 데이터가 있으면 다음 페이지 요청
  if (previousPageData?.result.hasNext) {
    return sortField === 'createdAt'
      ? `/api/v2/certificates/${certificateId}/posts?postType=${postType}&page=${pageIndex}&size=10`
      : `/api/v2/certificates/${certificateId}/posts?postType=${postType}&page=${pageIndex}&size=10&sortFields=${sortField}, id`;
  }

  // 이전 페이지에 더 이상 데이터가 없으면 null 반환
  return null;
};
const useGetTotalSearchResults = (postType: BoardType, certificateId: number, sortField: SortFieldType) => {
  const { data, isLoading, error, size, setSize, mutate } = useSWRInfinite<ResponseType<ResponsePostType>>(
    (pageIndex, previousPageData) => getKey(pageIndex, previousPageData, postType, certificateId, sortField),
    swrGetFetcher,
    {
      revalidateAll: true,
    },
  );

  return {
    userPosts: data ? data : [],
    isLoading: !error && !data,
    isError: error,
    size,
    setSize,
    mutate,
  };
};
export default useGetTotalSearchResults;
