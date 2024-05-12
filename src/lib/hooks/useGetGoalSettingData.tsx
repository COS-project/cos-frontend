import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { GoalSettingInfo } from '@/types/global';

const useGetGoalSettingData = (goalId: number) => {
  const { data, error } = useSWR<AxiosResponse>(`/goals/${goalId}`, swrGetFetcher);

  return {
    goalSettingData: data,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGetGoalSettingData;
