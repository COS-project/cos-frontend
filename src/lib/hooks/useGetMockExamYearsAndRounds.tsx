import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';

const useGetMockExamYearsAndRounds = () => {
  const { data, error } = useSWR<AxiosResponse>('/certificates/1/mock-exam-infos', swrGetFetcher);

  return {
    examYearWithRounds: data?.result,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGetMockExamYearsAndRounds;
