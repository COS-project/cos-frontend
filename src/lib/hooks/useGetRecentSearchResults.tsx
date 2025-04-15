import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { ResponseType } from '@/types/common/type';

const useGetRecentSearchResults = (certificateId: number) => {
  const { data, error, mutate } = useSWR<ResponseType<string[]>>(
    `/api/v2/certificates/${certificateId}/search-logs`, // URL에 직접 keyword 파라미터를 추가
    swrGetFetcher,
  );

  const parseResultList = data?.result.map((item) => item).flat();

  return {
    recentSearchResults: parseResultList,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
export default useGetRecentSearchResults;
