import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';

const useGetCertificationInfo = () => {
  const { data, error } = useSWR<AxiosResponse>('certificates/1/exam-infos', swrGetFetcher);

  return {
    certificationInfo: data,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGetCertificationInfo;
