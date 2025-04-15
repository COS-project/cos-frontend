import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { BoardListResponseType } from '@/types/community/type';
import { FavoriteBoard } from '@/types/global';

const useGetBoardList = () => {
  const { data, error, mutate } = useSWR<BoardListResponseType>('/api/v2/boards', swrGetFetcher);

  const parseResultList = data?.result.map((item: FavoriteBoard) => item).flat();

  return {
    boardList: parseResultList,
    isLoading: !error && !data,
    isError: error,
    mutate: mutate,
  };
};
export default useGetBoardList;
