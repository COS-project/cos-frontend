import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';

const useGetMockExams = (certificateId: number, year: number) => {
  const { data, error } = useSWR<AxiosResponse>(
    `/certificates/${certificateId}/mock-exams?examYear=${year}`,
    swrGetFetcher,
  );

  return {
    mockExams: data?.result,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGetMockExams
