import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { LikeStatusResponseType } from '@/types/community/type';

const useGetLikeStatus = (likeTargetType: string, targetId: string[] | string) => {
  const { data, error, mutate } = useSWR<LikeStatusResponseType>(
    `/api/v2/likes?likeTargetType=${likeTargetType}&targetId=${targetId}`,
    swrGetFetcher,
    {
      shouldRetryOnError: false, // ❗️에러 발생 시 재요청 방지
      revalidateOnFocus: false, // ❗️탭 전환 시 자동 재요청 방지 (원하는 경우)
    },
  );

  return {
    likeStatus: data?.result,
    isLoading: !error && !data,
    isError: error,
    likeStatusMutate: mutate,
  };
};
export default useGetLikeStatus;
