import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { FavoriteBoard } from '@/types/global';

const useGetInterestCertificates = () => {
  const { data, error } = useSWR<AxiosResponse<FavoriteBoard[]>>('/interest-certificates', swrGetFetcher);

  const parseResultList = data?.result.map((item: FavoriteBoard) => item).flat();

  return {
    interestCertificates: parseResultList,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGetInterestCertificates;
