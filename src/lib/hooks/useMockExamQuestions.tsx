import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { Certificate, QuestionsResponse } from '@/types/global';

const useGetGoalSettingData = (mockExamId: number) => {
  const { data, error } = useSWR<AxiosResponse>(`/mock-exams/${mockExamId}/questions`, swrGetFetcher);

  const parseResultList: QuestionsResponse[] = data?.result.map((item) => item).flat();

  return {
    questions: parseResultList,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGetGoalSettingData;
