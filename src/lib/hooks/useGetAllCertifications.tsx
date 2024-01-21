import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { Certificate } from '@/types/global';

const useGetAllCertifications = () => {
  const { data, error } = useSWR<AxiosResponse<Certificate[]>>('/certificates', swrGetFetcher);

  const parseResultList = data?.result.map((item: Certificate) => item).flat();

  return {
    certificationsList: {
      result: parseResultList ? parseResultList : [],
    },
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGetAllCertifications;