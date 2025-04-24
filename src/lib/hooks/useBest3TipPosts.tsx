import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { ResponseType } from '@/types/common/type';
import { PostType } from '@/types/community/type';

const useBest3TipPosts = (certificateId: number | null) => {
  const shouldFetch = certificateId !== null;
  const { data, error } = useSWR<ResponseType<PostType[]>>(
    shouldFetch ? `/api/v2/certificates/${certificateId}/tip-posts/best` : null,
    swrGetFetcher,
    {
      shouldRetryOnError: false, // ❗️에러 발생 시 재요청 방지
      revalidateOnFocus: false, // ❗️탭 전환 시 자동 재요청 방지 (원하는 경우)
    },
  );

  const parseResultList = data?.result.map((item: PostType) => item).flat();

  return {
    bestTipPosts: parseResultList,
    isLoading: shouldFetch && !error && !data,
    isError: error,
  };
};
export default useBest3TipPosts;
