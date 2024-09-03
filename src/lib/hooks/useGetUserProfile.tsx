import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { userProfile } from '@/types/global';

const useGetUserProfile = () => {
  const { data, error, mutate } = useSWR<AxiosResponse<userProfile>>('/users/me', swrGetFetcher);
  return {
    userProfile: data ? data.result : null,
    isLoading: !error && !data,
    isError: error,
    userProfileMutate: mutate,
  };
};
export default useGetUserProfile;
