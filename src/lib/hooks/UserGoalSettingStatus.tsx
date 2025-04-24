import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { GoalSettingStatusResponseType } from '@/types/home/type';

const useGoalSettingStatus = (certificateId: number | null) => {
  const shouldFetch = certificateId !== null;
  const { data, error } = useSWR<GoalSettingStatusResponseType>(
    shouldFetch ? `/api/v2/certificates/${certificateId}/goal-status` : null,
    swrGetFetcher,
    {
      shouldRetryOnError: false, // ❗️에러 발생 시 재요청 방지
      revalidateOnFocus: false, // ❗️탭 전환 시 자동 재요청 방지 (원하는 경우)
    },
  );

  return {
    goalSettingStatus: data,
    isLoading: shouldFetch && !error && !data,
    isError: error,
  };
};
export default useGoalSettingStatus;
