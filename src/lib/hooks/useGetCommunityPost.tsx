import { AxiosResponse } from 'axios';
import useSWR from 'swr';
import { swrGetFetcher } from '@/lib/axios';
import { Post } from '@/types/global';

//게시글 데이터 가져오는 함수
const useGetCommunityPost = () => {
  const { data, error } = useSWR<AxiosResponse<Post>>('/posts/14', swrGetFetcher);
  //주소부분 나중에 형겸오빠꺼랑 연계해서 바꾸기
  console.log(data);

  return {
    communityPostData: data ? data.result : null,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGetCommunityPost;
