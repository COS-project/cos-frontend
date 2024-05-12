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
  keyword?: string,
) => {
  //검색 키워드가 있고, boardType 이 REVIEW 가 아니면, 첫페이지
  if (size === 0 && postType !== 'REVIEW') {
    return `/certificates/${certificateId}/search?postType=${postType}&keyword=${keyword}&page=${size}&size=10&sortFields=${sortField}`;
  }
  //검색 키워드가 있고, boardType 이 REVIEW 가 아니면, 첫 페이지가 아닐 때
  if (previousPageData && !previousPageData.result.hasNext && postType !== 'REVIEW') {
    return `/certificates/${certificateId}/search?postType=${postType}&keyword=${keyword}&page=${size}&size=10&sortFields=${sortField}`;
  }
  //검색 키워드가 없고, boardType 이 REVIEW 가 아니면, 첫페이지
  if (size === 0 && postType !== 'REVIEW') {
    return `/certificates/${certificateId}/search?postType=${postType}&page=${size}&size=10&sortFields=${sortField}`;
  }
  //검색 키워드가 없고, boardType 이 REVIEW 가 아니면, 첫 페이지가 아닐 때
  if (previousPageData && !previousPageData.result.hasNext && postType !== 'REVIEW') {
    return `/certificates/${certificateId}/search?postType=${postType}&page=${size}&size=10&sortFields=${sortField}`;
  }
  if (previousPageData.result.hasNext && postType !== 'REVIEW') {
    return null;
  }
};
const useGetTotalSearchResults = (
  postType: BoardType,
  certificateId: number,
  sortField: string,
  keyword?: string,
) => {
  const { data, isLoading, error, size, setSize, mutate } = useSWRInfinite<AxiosResponse<ResponsePostType>>(
    (pageIndex, previousPageData) => getKey(pageIndex, previousPageData, postType, certificateId, sortField, keyword, isOnKeyDown),
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
