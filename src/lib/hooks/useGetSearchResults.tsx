import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { Certificate } from '@/types/global';

const useGetSearchResults = (keyword: string | null) => {
  const { data, error } = useSWR<AxiosResponse>(
    `/certificates/1/search?keyword=${keyword}&page=0&size=2`, // URL에 직접 keyword 파라미터를 추가
    swrGetFetcher,
  );

  const parseResultList = data?.result.content.map((item: Certificate) => item).flat();

  return {
    searchResults: parseResultList,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGetSearchResults;
