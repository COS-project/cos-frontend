import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { GoalSettingStatusResponseType } from '@/types/home/type';

const useGoalSettingStatus = (certificateId: number) => {
  const { data, error } = useSWR<GoalSettingStatusResponseType>(
    `/api/v2/certificates/${certificateId}/goal-status`,
    swrGetFetcher,
    {
      shouldRetryOnError: false, // ❗️에러 발생 시 재요청 방지
      revalidateOnFocus: false, // ❗️탭 전환 시 자동 재요청 방지 (원하는 경우)
    },
  );

  return {
    goalSettingStatus: data,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGoalSettingStatus;
