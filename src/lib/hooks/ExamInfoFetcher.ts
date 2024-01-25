import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';

const useGetExamInfoData = () => {
  const { data, error } = useSWR<AxiosResponse>('/1/mock-exam-infos', swrGetFetcher);

  return {
    Data: data,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGetExamInfoData;
