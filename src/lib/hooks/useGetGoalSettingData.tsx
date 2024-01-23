import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { GoalSettingInfo } from '@/types/global';

const useGetGoalSettingData = () => {
  const { data, error } = useSWR<AxiosResponse>('/1/goals', swrGetFetcher);

  return {
    goalSettingData: data,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGetGoalSettingData;
