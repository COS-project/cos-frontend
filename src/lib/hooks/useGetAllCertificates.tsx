import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { Certificate } from '@/types/global';

const useGetAllCertificates = () => {
  const { data, error } = useSWR<AxiosResponse<Certificate[]>>('/certificates', swrGetFetcher);

  const parseResultList = data?.result.map((item: Certificate) => item).flat();

  return {
    certificationsList: parseResultList,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGetAllCertificates;
