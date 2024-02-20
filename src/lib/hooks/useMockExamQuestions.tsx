import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { Certificate, QuestionsResponse } from '@/types/global';

const useGetGoalSettingData = () => {
  const { data, error } = useSWR<AxiosResponse>('/mock-exams/1/questions', swrGetFetcher);

  const parseResultList: QuestionsResponse[] = data?.result.questionsResponse.map((item: Certificate) => item).flat();

  return {
    questions: parseResultList,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGetGoalSettingData;
