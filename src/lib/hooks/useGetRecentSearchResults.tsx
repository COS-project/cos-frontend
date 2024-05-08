import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { Certificate } from '@/types/global';

const useGetRecentSearchResults = () => {
  const { data, error, mutate } = useSWR<AxiosResponse>(
    '/users/search-logs', // URL에 직접 keyword 파라미터를 추가
    swrGetFetcher,
  );

  const parseResultList = data?.result.map((item: Certificate) => item).flat();

  return {
    recentSearchResults: parseResultList,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
export default useGetRecentSearchResults;
