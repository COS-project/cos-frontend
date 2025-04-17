import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { ResponseType } from '@/types/common/type';
import { ResponsePostDetailType, ResponsePostType } from '@/types/community/type';

const useGetPost = (postId: number | string | string[]) => {
  //66: 자유, 61: 해설, 55: 꿀팁
  const { data, error, mutate } = useSWR<ResponseType<ResponsePostDetailType>>(
    `/api/v2/posts/${postId}`,
    swrGetFetcher,
    {
      shouldRetryOnError: false, // ❗️에러 발생 시 재요청 방지
      revalidateOnFocus: false, // ❗️탭 전환 시 자동 재요청 방지 (원하는 경우)
    },
  );
  return {
    postDetailData: data ? data.result : null,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
export default useGetPost;
