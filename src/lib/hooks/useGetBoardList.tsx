import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { FavoriteBoard } from '@/types/global';
import { BoardListResponseType } from '@/types/community/type';

const useGetBoardList = () => {
  const { data, error } = useSWR<BoardListResponseType>('/boards', swrGetFetcher);

  const parseResultList = data?.result.map((item: FavoriteBoard) => item).flat();

  return {
    boardList: parseResultList,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGetBoardList;
