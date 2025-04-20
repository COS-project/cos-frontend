import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { ResponseType } from '@/types/common/type';
import { ResponsePostDetailType } from '@/types/community/type';

//게시글 데이터 가져오는 함수
const useGetCommunityPost = (postId: string[] | string) => {
  const { data, error, mutate } = useSWR<ResponseType<ResponsePostDetailType>>(
    `/api/v2/posts/${postId}`,
    swrGetFetcher,
    {
      shouldRetryOnError: false, // ❗️에러 발생 시 재요청 방지
      revalidateOnFocus: true, // ❗️탭 전환 시 자동 재요청 방지 (원하는 경우)
    },
  );

  return {
    communityPostData: data ? data.result : null,
    isLoading: !error && !data,
    isError: error,
    communityPostDataMutate: mutate,
  };
};
export default useGetCommunityPost;
