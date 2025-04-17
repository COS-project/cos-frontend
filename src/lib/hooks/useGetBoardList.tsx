import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { BoardListResponseType } from '@/types/community/type';
import { FavoriteBoard } from '@/types/global';

const useGetBoardList = () => {
  const { data, error, mutate } = useSWR<BoardListResponseType>('/api/v2/boards', swrGetFetcher, {
    shouldRetryOnError: false, // ❗️에러 발생 시 재요청 방지
    revalidateOnFocus: false, // ❗️탭 전환 시 자동 재요청 방지 (원하는 경우)
  });

  const parseResultList = data?.result.map((item: FavoriteBoard) => item).flat();

  return {
    boardList: parseResultList,
    isLoading: !error && !data,
    isError: error,
    mutate: mutate,
  };
};
export default useGetBoardList;
