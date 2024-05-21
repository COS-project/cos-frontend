import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { FavoriteBoard } from '@/types/global';

const useGetBoardList = () => {
  const { data, error } = useSWR<AxiosResponse<FavoriteBoard[]>>('/boards', swrGetFetcher);

  const parseResultList = data?.result.map((item: FavoriteBoard) => item).flat();

  return {
    boardList: parseResultList,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGetBoardList;
