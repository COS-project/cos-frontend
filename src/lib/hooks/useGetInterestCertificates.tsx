import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { FavoriteBoard } from '@/types/global';

const useGetInterestCertificates = () => {
  const { data, error, mutate } = useSWR<AxiosResponse>('/interest-certificates', swrGetFetcher);

  const parseResultList = data?.result.map((item: FavoriteBoard) => item).flat();

  return {
    interestCertificates: parseResultList,
    isLoading: !error && !data,
    isError: error,
    interestCertificateDataMutate: mutate,
  };
};
export default useGetInterestCertificates;
