import { AxiosResponse } from 'axios';
import { useEffect } from 'react';
import useSWR from 'swr';

import { swrGetFetcher } from '@/lib/axios';

const useGetMockExamYears = (usage: string) => {
  const { data, error } = useSWR<AxiosResponse>('/certificates/1/exam-years', swrGetFetcher);

  /**
   * 사용된 컴포넌트에 따라 초기화 값을 다르게 하도록 하는 트릭
   * CommentaryBoardList 일 때만 전체가 초기화 되도록 구현
   */
  useEffect(() => {
    if (usage == 'CommentaryBoardList' && data && Array.isArray(data?.result) && !data?.result.includes('전체')) {
      data.result.unshift('전체');
    }
  }, [data]);

  return {
    examYears: data?.result,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useGetMockExamYears;
