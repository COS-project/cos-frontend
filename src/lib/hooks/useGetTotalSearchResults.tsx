import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { Certificate } from '@/types/global';

const useGetRecentSearchResults = (postType: string, keyword: string) => {
  const { data, error } = useSWR<AxiosResponse>(
    `/certificates/1/search?postType=${postType}&keyword=${keyword}&page=0&size=5`, // URL에 직접 keyword 파라미터를 추가
    swrGetFetcher,
  );

  const parseResultList = data?.result.content.map((item: Certificate) => item).flat();

  return {
    totalSearchResults: parseResultList,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGetRecentSearchResults;
