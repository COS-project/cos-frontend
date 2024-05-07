import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { Certificate } from '@/types/global';

const useGetAutoCompleteSearchKeywords = (keyword: string | null) => {
  const { data, error } = useSWR<AxiosResponse>(
    `/certificates/1/auto-complete-keywords?searchText=${keyword}`, // URL에 직접 keyword 파라미터를 추가
    swrGetFetcher,
  );

  const parseResultList = data?.result.map((item: Certificate) => item).flat();

  return {
    autoCompleteKeywords: parseResultList,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGetAutoCompleteSearchKeywords;
