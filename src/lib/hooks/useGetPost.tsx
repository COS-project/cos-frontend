import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';
import { userProfile } from '@/types/global';

const useGetPost = () => {
  //66: 자유, 61: 해설, 55: 꿀팁
  const { data, error } = useSWR<AxiosResponse<userProfile>>('/posts/55', swrGetFetcher);
  return {
    postDetailData: data ? data.result : null,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGetPost;
