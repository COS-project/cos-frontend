import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { GoalAchievementResponseType } from '@/types/home/type';

const useGoalAchievement = (certificateId: number) => {
  const { data, error } = useSWR<GoalAchievementResponseType>(
    `/api/v2/certificates/${certificateId}/goals/achievement`,
    swrGetFetcher,
    {
      shouldRetryOnError: false, // ❗️에러 발생 시 재요청 방지
      revalidateOnFocus: false, // ❗️탭 전환 시 자동 재요청 방지 (원하는 경우)
    },
  );

  return {
    goalAchievementData: data,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGoalAchievement;
