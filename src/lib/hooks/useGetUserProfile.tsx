import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { UserProfileResponseType } from '@/types/global';

const useGetUserProfile = () => {
  const { data, error, mutate } = useSWR<UserProfileResponseType>('/api/v2/users/me', swrGetFetcher, {
    shouldRetryOnError: false, // ❗️에러 발생 시 재요청 방지
    revalidateOnFocus: false, // ❗️탭 전환 시 자동 재요청 방지 (원하는 경우)
  });
  return {
    userProfile: data ? data.result : null,
    isLoading: !error && !data,
    isError: error,
    userProfileMutate: mutate,
  };
};
export default useGetUserProfile;
