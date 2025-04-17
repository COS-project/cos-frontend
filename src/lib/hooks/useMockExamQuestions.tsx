import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { QuestionsResponseType } from '@/types/global';

const useGetGoalSettingData = (mockExamId: number | undefined) => {
  const { data, error } = useSWR<QuestionsResponseType>(`/api/v2/mock-exams/${mockExamId}/questions`, swrGetFetcher, {
    shouldRetryOnError: false, // ❗️에러 발생 시 재요청 방지
    revalidateOnFocus: false, // ❗️탭 전환 시 자동 재요청 방지 (원하는 경우)
  });

  const parseResultList = data?.result.map((item) => item).flat();

  return {
    questions: parseResultList,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGetGoalSettingData;
