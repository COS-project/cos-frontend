import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { ResponseType } from '@/types/common/type';
import { PostType } from '@/types/community/type';

const useBest3TipPosts = (certificateId: number) => {
  const { data, error } = useSWR<ResponseType<PostType[]>>(
    `/api/v2/certificates/${certificateId}/tip-posts/best`,
    swrGetFetcher,
  );

  const parseResultList = data?.result.map((item: PostType) => item).flat();

  return {
    bestTipPosts: parseResultList,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useBest3TipPosts;
